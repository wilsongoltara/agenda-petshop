const moment = require('moment');
const axios = require('axios');
const connection = require('../infrastructure/connection');

class Sevice {
    add(service, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(service.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        
        const validDate = moment(data).isSameOrAfter(dataCriacao);
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
            const datedService = {...service, dataCriacao, data};
            const query = 'INSERT INTO atendimentos SET ?';

            connection.query(query, datedService, (error) => {
                if(error) {
                    res.status(400).json(error);
                } else {
                    res.status(200).json(service);
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

    searchId(id, res) {
        const query = `SELECT * FROM atendimentos WHERE id=${id};`;

        connection.query(query, async (error, results) => {
            const service = results[0];
            const cpf = service.cliente;

            if(error) {
                res.status(400).json(error);
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`);
                console.log(data);
                service.cliente = data;
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