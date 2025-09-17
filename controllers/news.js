const { News } = require("../models");
const cloudinary = require("../middleware/cloudinary");
const fs = require("fs");
const { Op } = require("sequelize");

const getAllNews = async (req, res) => {
    try {
        const news = await News.findAll();
        res.json(news);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getNewsById = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if (news) {
            res.json(news);
        } else {
            res.status(404).json({ error: 'News not found' });
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createNews = async (req, res) => {
    try {
        const { title, type, text } = req.body;
        let img = null;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            img = result.secure_url;
            fs.unlinkSync(req.file.path);
        }
        const news = await News.create({ title, type, text, img });
        res.status(201).json(news);
    } catch (error) {
        console.error('Error creating news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateNews = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if (news) {
            const { title, type, text } = req.body;
            let img = news.img;
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                img = result.secure_url;
                fs.unlinkSync(req.file.path);
            }
            const updatedNews = await news.update({ title, type, text, img });
            res.json(updatedNews);
        } else {
            res.status(404).json({ error: 'News not found' });
        }
    } catch (error) {
        console.error('Error updating news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteNews = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if (news) {
            await news.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'News not found' });
        }
    } catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
  getAllNews,
  getNewsById,
    createNews,
  updateNews,
  deleteNews
};