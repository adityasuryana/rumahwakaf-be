const { Rekening } = require("../models");
const fs = require("fs");
const cloudinary = require("../middleware/cloudinary");
const { Op } = require("sequelize");

const getAllRekening = async (req, res) => {
    try {
        const rekening = await Rekening.findAll();
        res.json(rekening);
    } catch (error) {
        console.error('Error fetching rekening:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getRekeningById = async (req, res) => {
    try {
        const rekening = await Rekening.findByPk(req.params.id);
        if (rekening) {
            res.json(rekening);
        } else {
            res.status(404).json({ error: 'Rekening not found' });
        }
    } catch (error) {
        console.error('Error fetching rekening:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createRekening = async (req, res) => {
    try {
        const { bankName, accountNumber } = req.body;
        let logo = null;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            logo = result.secure_url;
            fs.unlinkSync(req.file.path);
        }
        const rekening = await Rekening.create({ bankName, accountNumber, logo });
        res.status(201).json(rekening);
    } catch (error) {
        console.error('Error creating rekening:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateRekening = async (req, res) => {
    try {
        const rekening = await Rekening.findByPk(req.params.id);
        if (rekening) {
            const { bankName, accountNumber } = req.body;
            let logo = rekening.logo;
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                logo = result.secure_url;
                fs.unlinkSync(req.file.path);
            }
            const updatedRekening = await rekening.update({ bankName, accountNumber, logo });
            res.json(updatedRekening);
        } else {
            res.status(404).json({ error: 'Rekening not found' });
        }
    } catch (error) {
        console.error('Error updating rekening:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteRekening = async (req, res) => {
    try {
        const rekening = await Rekening.findByPk(req.params.id);
        if (rekening) {
            await rekening.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Rekening not found' });
        }
    } catch (error) {
        console.error('Error deleting rekening:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllRekening,
    getRekeningById,
    createRekening,
    updateRekening,
    deleteRekening
};