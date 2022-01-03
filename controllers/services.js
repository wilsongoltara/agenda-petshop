const Sevice = require('../models/services');

module.exports = (app) => {
    app.get('/atendimentos', (_, res) => {
        Sevice.list(res);
    });

    app.get('/atendimentos/:id', (req , res) => {
        const id = parseInt(req.params.id);

        Sevice.searchId(id, res);
    });

    app.post('/atendimentos',(req, res) => {
        const service = req.body;
        
        Sevice.add (service, res);
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