const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-fs-backend');

i18next.use(Backend).init({
    lng: 'en',
    fallbackLng: 'en',
    backend: {
        loadPath: './locales/{{lng}}/translation.json'
    }
});

module.exports = i18nextMiddleware.handle(i18next);