const db = require('./db');

module.exports = {
    get: async  (req, res) => {
    //   let values = await db.getNoByTableName("Values")
        const data={
            "1":"value1",
            "2":"value2"
        };

        res.json(data);
    }
}