class Categories {
    get(sql, id) {
        let resp = sql.query(
            `SELECT * FROM categories 
            WHERE id = :id`, {
            replacements: {
                id
            },
            type: sql.QueryTypes.SELECT,
        });
        return resp;
    };
    list(sql) {
        let resp = sql.query(
            'SELECT * FROM categories', {
            type: sql.QueryTypes.SELECT,
        })
        return resp;
    };
    listApps(sql, id) {
        let resp = sql.query(
            `SELECT a.id_category , c.name category_name, a.id id_app, a.name app_name, a.price app_price, a.img_url app_img_url
            FROM apps a
            JOIN categories c ON a.id_category = c.id
            WHERE c.id = :id`, {
            replacements: {
                id
            },
            type: sql.QueryTypes.SELECT
        });
        return resp;
    };
    //middlewares
    categoryNotFound(sql) {
        let self = this
        return function (req, res, next) {
            self.get(sql, req.params.id)
                .then(resp => {
                    if (resp.length === 0) return res.status(404).json({ error: 'Not Found' });
                    else { next() };
                })
        };
    };
};

module.exports = { Categories }
