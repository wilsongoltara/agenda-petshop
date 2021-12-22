const customExpress = require('./config/customExpress');
const connection = require('./infrastructure/connection');
const Tabelas = require('./infrastructure/tables');

connection.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log('Conectado com o banco de dados');
        Tabelas.init(connection);
        const app = customExpress();

        app.listen(3000, () => {
            console.log("Servidor rodando em http://localhost:3000");
        });
    }
});
