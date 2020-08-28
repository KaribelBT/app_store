class Categories{
    list(sql) {
        let resp = sql.query(
            'SELECT * FROM categories', {
            type: sql.QueryTypes.SELECT,
        })
        return resp;
    };
};

module.exports = { Categories }
