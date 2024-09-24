const { User } = require("../models");

module.exports = {
  // Récupérer tous les utilisateurs
  cget: async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  // Créer un nouvel utilisateur
  post: async (req, res, next) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  // Récupérer un utilisateur par son ID
  iget: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) res.json(user);
      else res.sendStatus(404);
    } catch (error) {
      next(error);
    }
  },

  // Mettre à jour un utilisateur
  patch: async (req, res, next) => {
    try {
      const [nbUpdated, users] = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
      });
      if (nbUpdated) res.json(users[0]);
      else res.sendStatus(404);
    } catch (error) {
      next(error);
    }
  },

  // Supprimer un utilisateur
  delete: async (req, res, next) => {
    try {
      const nbDeleted = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!nbDeleted) res.sendStatus(404);
      else res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },
};