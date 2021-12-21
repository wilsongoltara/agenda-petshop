const customExpress = require('./config/customExpress');
const app = customExpress();

app.listen(3000, () => {
    console.log("Servidor rodando em localhost:3000")
});