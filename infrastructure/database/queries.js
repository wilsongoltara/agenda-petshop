const connection = require('./connection');

const executeQuery = (query, parameters = '') => {
    return new Promise((resolve, reject) => {
        connection.query(query, parameters, (erros, resultados, campos) => {
            if(erros) {
                reject(erros);
            } else {
                resolve(resultados);
            }
        });
    });
};

module.exports = executeQuery;