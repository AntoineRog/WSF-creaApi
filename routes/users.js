const { Router } = require("express");
const UserController = require("../controllers/users");
const authenticate = require("../middlewares/checkAuth");
const authorize = require("../middlewares/checkRole");
const router = new Router();

// Collection route : GET : list users
router.get("", authenticate, authorize(["admin"]), UserController.cget);
// Collection route : POST : create a user
router.post("", authenticate, authorize(["admin"]), UserController.post);

// Item route : GET : fetch a user
router.get("/:id", authenticate, authorize(["admin", "user"]), UserController.iget);
// Item route : PATCH : modify a user
router.patch("/:id", authenticate, authorize(["admin", "user"]), UserController.patch);
// Item route : DELETE : delete a user
router.delete("/:id", authenticate, authorize(["admin"]), UserController.delete);

module.exports = router;