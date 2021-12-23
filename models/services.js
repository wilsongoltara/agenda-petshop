const moment = require('moment');
const connection = require('../infrastructure/connection');

class Sevice {
    add(service, res) {
        const dateCreation = moment().format('YYYY-MM-DD HH:mm:ss');
        const date = moment(service.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        
        const validDate = moment(date).isSameOrAfter(dateCreation);
        const validClient = (service.cliente.length >= 5);
        
        const validations = [
            {
                nome: 'data',
                valido: validDate,
                msg: 'Data deve ser maior ou igual a data atual.'
            },
            {
                nome: 'cliente',
                valido: validClient,
                msg: 'Nome do cliente deve ter mais de 5 caractéres.'
            }
        ];

        const errors = validations.filter(field => !field.valido);
        const thereAreErrors = errors.length;

        if(thereAreErrors) {
            res.status(400).json(erros);
        } else {
            const datedService = {...service, dateCreation, date};
            const sql = 'INSERT INTO atendimentos SET ?';

            connection.query(sql, datedService, (error) => {
                if(error) {
                    res.status(400).json(error);
                } else {
                    res.status(201).json(service);
                }
            });
        }
    }

    list(res) {
        const sql = 'SELECT * FROM atendimentos;';

        connection.query(sql, (error, results) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(results);
            }
        });
    }

    searchID(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id=${id};`;
        
        connection.query(sql, (error, results) => {
            const service = results[0];
            
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(service);
            }
        });
    }

    alter(id, values, res) {
        if(values.data) {
            values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }
        
        const sql = 'UPDATE atendimentos SET ? WHERE id= ?';

        connection.query(sql, [values, id], (error) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({...values, id});
            }
        });
    }

    delete(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id=?';

        connection.query(sql, id, (error) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({id});
            }
        });
    }
}
 
module.exports = new Sevice;