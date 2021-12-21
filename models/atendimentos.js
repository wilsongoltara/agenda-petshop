const connection = require('../infrastructure/connection');

class Atendimento {
    adiciona(atendimento) {
        const sql = 'INSERT INTO atendimentos SET ?';

        connection.query(sql, atendimento, (error, result) => {
            if(error) {
                console.log(error);
            } else {
                console.log(result);
            }
        });
    }
}

module.exports = new Atendimento;