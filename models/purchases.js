class Purchases {
    create(sql, price, id_user) {
        let resp = sql.query(
            `INSERT INTO purchases (price, id_user) 
            VALUES (:price, :id_user)`,
            {
                replacements: {
                    id_user,
                    price                    
                }
            });
        return resp
    };
    insertPurchasesApps(sql, id_purchase, id_app) {
        let resp = sql.query(
            `INSERT INTO purchases_apps(id_purchase, id_app) 
             VALUES (:id_purchase,  :id_app)`,
            {
                replacements: {
                    id_purchase,
                    id_app
                }
            });
        return resp 
    }
    get(sql, id_user, id_purchase) {
        let resp = sql.query(
            `SELECT DISTINCT p.id, p.price purchase_price, a.name app_name, c.name app_category, a.price app_price, a.img_url 
            FROM purchases p
            JOIN purchases_apps pa ON p.id = pa.id_purchase
            JOIN apps a ON a.id = pa.id_app
            JOIN categories c ON c.id = a.id_category
            WHERE p.id_user = :id_user
            AND p.id = :id_purchase`, {
                replacements: {
                    id_user,
                    id_purchase
                },
                type: sql.QueryTypes.SELECT
            })
        return resp;
    }
};
module.exports = { Purchases };