const query = require('../infrastructure/database/queries');

class Service {
    add(service) {
        const sql = 'INSERT INTO atendimentos SET ?';
        return query(sql, service);
    }
    
    list() {
        const sql = 'SELECT * FROM atendimentos;';
        return query(sql);
    }

    searchId(id) {
        const sql = `SELECT * FROM atendimentos WHERE id=${id};`;
        return query(sql);
    }

    alter(values, id) {
        const sql = `UPDATE atendimentos SET ? WHERE id=${id}`;
        return query(sql, values);
    }

    delete(id) {
        const sql = `DELETE FROM atendimentos WHERE id=${id}`;
        return query(sql);
    }
}

module.exports = new Service;
