const { Router } = require("express");
const TicTacToeController = require("../controllers/game.js");
const authenticate = require("../middlewares/checkAuth");
const authorize = require("../middlewares/checkRole");
const router = new Router();

// Collection route : GET : list games
router.get("", authenticate, authorize(["admin", "user"]), TicTacToeController.cget);
// Collection route : POST : create a game
router.post("", authenticate, authorize(["admin", "user"]), TicTacToeController.post);
// Item route : GET : fetch a game
router.get("/:id", authenticate, authorize(["admin", "user"]), TicTacToeController.iget);
// Item route : PATCH : make a move in a game
router.patch("/:id", authenticate, authorize(["admin", "user"]), TicTacToeController.patch);
// Item route : PUT : replace a game
router.put("/:id", authenticate, authorize(["admin"]), TicTacToeController.put);
// Item route : DELETE : delete a game
router.delete("/:id", authenticate, authorize(["admin"]), TicTacToeController.delete);

module.exports = router;