const formatOutput = (req, res, next) => {
    if (res.locals.data) {
        res.format({
            'application/json': () => {
                res.json(res.locals.data);
            },
            'text/html': () => {
                res.send(`<pre>${JSON.stringify(res.locals.data, null, 2)}</pre>`);
            }
        });
    } else {
        next();
    }
};

module.exports = formatOutput;