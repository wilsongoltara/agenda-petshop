const customExpress = require('./config/customExpress');
const connection = require('./infrastructure/connection');
const Tabelas = require('./infrastructure/tables');

connection.connect((erro) => {
    if(erro) {
        console.log(erro);
    } else {
        console.log('Conectado com o banco de dados"');
        Tabelas.init(connection);
        const app = customExpress();

        app.listen(3000, () => {
            console.log("Servidor rodando em http://localhost:3000");
        });
    }
});
