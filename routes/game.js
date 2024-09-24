const express = require('express');
const router = express.Router();

let games = [];

router.post('/start', (req, res) => {
    const game = {
        id: games.length + 1,
        board: Array(9).fill(null),
        currentPlayer: 'X'
    };
    games.push(game);
    res.locals.data = game;
    res.status(201).end();
});

router.post('/move', (req, res) => {
    const { gameId, index } = req.body;
    const game = games.find(g => g.id === gameId);
    if (game && game.board[index] === null) {
        game.board[index] = game.currentPlayer;
        game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';
        res.locals.data = game;
        res.status(200).end();
    } else {
        res.status(400).json({ message: 'Invalid move' });
    }
});

module.exports = router;