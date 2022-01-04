const customExpress = require('./config/customExpress');
const connection = require('./infrastructure/database/connection');
const Tabelas = require('./infrastructure/database/tables');

connection.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log('Conectado com o banco de dados');
        Tabelas.init(connection);
        const app = customExpress();

        const port = 3000;
        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    }
});
