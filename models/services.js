const moment = require('moment');
const axios = require('axios');
const connection = require('../infrastructure/database/connection');
const respositories = require('../repositories/service');
const res = require('express/lib/response');

class Sevice {
    constructor() {
        this.validDate = ({ data, dataCriacao }) => moment(data).isSameOrAfter(dataCriacao);
        this.validClient = tamanho => tamanho >= 5;

        this.valided = (parameters) => this.validations.filter((field) => {
            const { nome } = field;
            const parameter = parameters[nome];

            return !field.valido(parameter);
        });
        
        this.validations = [
            {
                nome: 'data',
                valido: this.validDate,
                msg: 'Data deve ser maior ou igual a data atual.'
            },
            {
                nome: 'cliente',
                valido: this.validClient,
                msg: 'Nome do cliente deve ter mais de 5 caractéres.'
            }
        ];
    }

    add(service) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(service.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        
        const parameters = {
            data: { data, dataCriacao },
            cliente: { tamanho: service.cliente.length }
        }
        
        const errors = this.valided(parameters)
        const thereAreErrors = errors.length;

        if(!thereAreErrors) {
            return new Promise((_, reject) => reject(errors));
        } else {
            const datedService = { ...service, dataCriacao, data };

            return respositories.add(datedService)
                .then((results) => {
                    const id = results.insertId;
                    return ({ ...service, id });
                });
        }
    }
    
    list() {
        return respositories.list();
    }
    
    searchId(id) {
        return respositories.searchId(id)
            .then(async(results) => {
                const atendimento = results[0];
                const cpf = atendimento.cliente;
                const { data } = await axios.get(`http://localhost:8082/${cpf}`);
                
                atendimento.cliente = data;
                
                return atendimento;
            })
    }

    alter(id, values) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        if(values.data) {
            values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }

        const parameters = {
            data: { data: values.data, dataCriacao },
            cliente: { tamanho: values.cliente.length }
        }
        const errors = this.valided(parameters);
        const thereAreErrors = errors.length;
        
        if(!thereAreErrors) {
            return new Promise((_, reject) => reject(errors));
        } else {
            return respositories.alter(values, id)
                .then(() => {
                    return { ...values, id };
                }); 
        }
    }

    delete(id) {
        return respositories.delete(id)
            .then(() => {
                return ({ id });
            });
    }
}
 
module.exports = new Sevice;
