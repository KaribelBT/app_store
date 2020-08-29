class Users{
    create(sql, email, password, isDev) {
        let resp = sql.query(
            `INSERT INTO users (email, password, isDev) 
             VALUES (:email, :password, :isDev)`,
            {
                replacements: {
                    email,
                    password,
                    isDev
                }
            });
        return resp
    };
    get(sql, id) {
        let resp = sql.query(
            `SELECT * FROM users 
            WHERE id = :id`, {
            replacements: {
                id
            },
            type: sql.QueryTypes.SELECT,
        });
        return resp;
    };
    login(sql, email, password) {
        let resp = sql.query(
            `SELECT * FROM users 
            WHERE email = :email AND password = :password`, {
            replacements: {
                email,
                password
            },
            type: sql.QueryTypes.SELECT
        });
        return resp;
    };
    //middlewares
    userExist(sql) {
        return function (req, res, next) {
            const { email } = req.body
            sql.query(
                `SELECT email FROM users 
                WHERE email = :email`, {
                replacements: {
                    email
                },
                type: sql.QueryTypes.SELECT
            }).then(resp => {
                if (resp.length > 0) {
                    return res
                        .status(409)
                        .json({ error: `Conflict, username or email already exist` });
                } else { next() };
            });
        };
    };
    validToken(jwt) {
        return function (req, res, next) {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                res
                    .status(401)
                    .json({ error: 'Unauthorized, you are not logged in' });
                return;
            }
            const token = authorizationHeader.split(" ").pop();
            const secret = require('../config/config.js');
            const decoded = jwt.verify(token, secret.secret);
            if (decoded) {
                req.user = decoded;
                next();
            } else {
                res
                    .status(401)
                    .json({ error: 'Unauthorized, you are not logged in' });
            };
        };
    };
    isDev(jwt) {
        return function (req, res, next) {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                res
                    .status(401)
                    .json({ error: 'Unauthorized, you are not logged in' });
                return;
            }
            const token = authorizationHeader.split(" ").pop();
            const secret = require('../config/config.js');
            const decoded = jwt.verify(token, secret.secret);
            if (decoded.isDev == true) {
                req.user = decoded;
                next();
            } else {
                res
                    .status(403)
                    .json({ error: 'Forbidden, you are not an developer user' });
            };
        }
    }
};

module.exports = { Users }