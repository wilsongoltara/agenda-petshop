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
            const query = 'INSERT INTO atendimentos SET ?';

            connection.query(query, datedService, (error) => {
                if(error) {
                    res.status(400).json(error);
                } else {
                    res.status(201).json(service);
                }
            });
        }
    }

    list(res) {
        const query = 'SELECT * FROM atendimentos;';

        connection.query(query, (error, results) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(results);
            }
        });
    }

    searchID(id, res) {
        const query = `SELECT * FROM atendimentos WHERE id=${id};`;
        
        connection.query(query, (error, results) => {
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
        
        const query = 'UPDATE atendimentos SET ? WHERE id= ?';

        connection.query(query, [values, id], (error) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({...values, id});
            }
        });
    }

    delete(id, res) {
        const query = 'DELETE FROM atendimentos WHERE id=?';

        connection.query(query, id, (error) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({id});
            }
        });
    }
}
 
module.exports = new Sevice;