const { register } = require("../controllers/userControllers");
const { login } = require("../controllers/userControllers");
const { getAllUsers } = require("../controllers/userControllers");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allusers/:id", getAllUsers);

module.exports = router;