module.exports = async (app) => {
    let c = require('./ctrl');
    app.route('/api/values').get(c.get);
};
