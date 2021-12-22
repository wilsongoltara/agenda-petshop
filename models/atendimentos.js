const moment = require('moment');
const connection = require('../infrastructure/connection');

class Atendimento {
    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const atendimentoDatado = {...atendimento, dataCriacao, data};
        const sql = 'INSERT INTO atendimentos SET ?';

        connection.query(sql, atendimentoDatado, (error, result) => {
            if(error) {
                console.log(error);
            } else {
                console.log(result);
            }
        });
    }
}
 
module.exports = new Atendimento;