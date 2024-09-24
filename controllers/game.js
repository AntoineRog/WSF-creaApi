const {Game} = require('../models');
const express = require('express');
const router = express.Router();

let games = [];

module.exports = {
  cget: (req, res) => {
    res.status(200).json(games);
  },
  post: (req, res) => {
    const game = {
      id: games.length + 1,
      board: Array(9).fill(null),
      currentPlayer: 'X'
    };
    games.push(game);
    res.status(201).json(game);
  },
  iget: (req, res) => {
    const game = games.find(g => g.id === parseInt(req.params.id));
    if (game) res.json(game);
    else res.sendStatus(404);
  },
  patch: (req, res) => {
    const { id, index } = req.body;
    const game = games.find(g => g.id === parseInt(id));
    if (game && game.board[index] === null) {
      game.board[index] = game.currentPlayer;
      game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';
      res.status(200).json(game);
    } else {
      res.status(400).json({ message: 'Invalid move' });
    }
  },
  put: (req, res) => {
    const gameIndex = games.findIndex(g => g.id === parseInt(req.params.id));
    if (gameIndex !== -1) {
      games.splice(gameIndex, 1);
    }
    const game = {
      id: parseInt(req.params.id),
      board: Array(9).fill(null),
      currentPlayer: 'X'
    };
    games.push(game);
    res.status(gameIndex === -1 ? 201 : 200).json(game);
  },
  delete: (req, res) => {
    const gameIndex = games.findIndex(g => g.id === parseInt(req.params.id));
    if (gameIndex !== -1) {
      games.splice(gameIndex, 1);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
};