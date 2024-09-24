const hateoas = (req, res, next) => {
    if (res.locals.data) {
        res.locals.data.links = {
            self: `${req.protocol}://${req.get('host')}${req.originalUrl}`
        };
    }
    next();
};

module.exports = hateoas;