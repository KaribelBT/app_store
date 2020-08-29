class Apps{
    create(sql, id_category, name, price, img_url,id_dev) {
        let resp = sql.query(
            `INSERT INTO apps (id_category, name, price, img_url, id_dev) 
             VALUES (:id_category, :name, :price, :img_url, :id_dev)`,
            {
                replacements: {
                    id_category,
                    name,
                    price,
                    img_url,
                    id_dev
                }
            });
        return resp
    };
    get(sql, id) {
        let resp = sql.query(
            `SELECT * FROM apps 
            WHERE id = :id`, {
            replacements: {
                id
            },
            type: sql.QueryTypes.SELECT,
        });
        return resp;
    };
    listDev(sql, id_dev){
        let resp = sql.query(
            `SELECT * FROM apps 
            WHERE id_dev = :id_dev`, {
            replacements: {
                id_dev
            },
            type: sql.QueryTypes.SELECT,
        })
        return resp;
    }
    update(sql, id, price, img_url) {
        let resp = sql.query(
            `UPDATE apps
            SET price = :price, img_url = :img_url          
            WHERE id = :id`, {
            replacements: {
                id,
                price,
                img_url
            },
            type: sql.QueryTypes.UPDATE
        });
        return resp
    };
    delete(sql, id) {
        let resp = sql.query(
            `DELETE FROM apps
             WHERE id = :id`, {
            replacements: {
                id
            },
            type: sql.QueryTypes.DELETE
        });
        return resp
    };
    //middlewares
    appExist(sql) {
        return function (req, res, next) {
            const { name } = req.body
            sql.query(
                `SELECT name FROM apps 
                WHERE name = :name`, {
                replacements: {
                    name,
                },
                type: sql.QueryTypes.SELECT
            }).then(resp => {
                if (resp.length > 0) {
                    return res
                        .status(409)
                        .json({ error: `Conflict, app already exists` });
                } else { next() };
            });
        };
    };
    appNotFound(sql) {
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

module.exports = { Apps }