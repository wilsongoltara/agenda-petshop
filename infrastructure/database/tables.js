class Tabelas {
    init(connection) {
        this.connection = connection;
        this.criarAtendimentos();
        this.criarPets();
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(11) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))';
        
        this.connection.query(sql, (error) => {
            if(error) {
                console.log(error);
            } else {
                console.log('Tabela Atendimentos criada com sucesso')
            }
        });
    }

    criarPets() {
        const sql = 
            'CREATE TABLE IF NOT EXISTS pets (id int NOT NULL AUTO_INCREMENT, name varchar(50), imagem varchar(200), PRIMARY KEY(id))';

        this.connection.query(sql, (error) => {
            if(error) {
                console.log(error);
            } else {
                console.log("Tabela pets criada com sucesso.")
            }
        });
    }
}

module.exports = new Tabelas;