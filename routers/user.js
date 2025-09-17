const router = require("express").Router();
const { getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/user");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
