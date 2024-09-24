const { Router } = require("express");
const SecurityController = require("../controllers/security");
const checkRole = require("../middlewares/checkRole");
const router = new Router();

// Route pour la connexion
router.post("/login",checkRole,SecurityController.login);

module.exports = router;