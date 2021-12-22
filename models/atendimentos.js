const moment = require('moment');
const connection = require('../infrastructure/connection');

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        
        const dataValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteValido = (atendimento.cliente.length >= 5);
        
        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                msg: 'Data deve ser maior ou igual a data atual.'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                msg: 'Nome do cliente deve ter mais de 5 caractéres.'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(existemErros) {
            res.status(400).json(erros);
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data};
            const sql = 'INSERT INTO atendimentos SET ?';

            connection.query(sql, atendimentoDatado, (error, result) => {
                if(error) {
                    res.status(400).json(error);
                } else {
                    res.status(201).json(result);
                }
            });
        }
    }

    lista(res) {
        const sql = 'SELECT * FROM atendimentos;';

        connection.query(sql, (error, results) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(results);
            }
        });
    }

    buscaId(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id=${id};`;
        
        connection.query(sql, (error, results) => {
            const atendimento = results[0];
            
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(atendimento);
            }
        });

    }
}
 
module.exports = new Atendimento;