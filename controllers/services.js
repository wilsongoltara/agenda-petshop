const Sevice = require('../models/services');

module.exports = (app) => {
    app.get('/atendimentos', (_, res) => {
        Sevice.list()
            .then((results) => res.json(results))
            .catch((errors) => res.status(400).json(errors));
    });

    app.get('/atendimentos/:id', (req , res) => {
        const id = parseInt(req.params.id);
        Sevice.searchId(id)
            .then((results) => res.json(results))
            .catch((errors) => res.status(400).json(errors));
    });

    //Completed
    app.post('/atendimentos',(req, res) => {
        const service = req.body;
        Sevice.add(service)
            .then((registeredService) => res.status(201).json(registeredService))
            .catch((errors) => res.status(400).json(errors));
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const values = req.body;
        
        Sevice.alter(id, values, res);
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Sevice.delete(id, res);
    });
}