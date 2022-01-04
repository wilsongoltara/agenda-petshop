const connection = require('../infrastructure/database/connection');
const uploadOfArquives = require('../infrastructure/arquives/uploadOfArquives');

class Pet {
    addPet(pet, res) {
        const query = 'INSERT INTO pets SET ?';

        uploadOfArquives(pet.imagem, pet.name, (error, newPath) => {
            if(error) {
                res.status(400).json({ error });
            } else {
                const newPet = { name: pet.name, imagem: newPath }
            
                connection.query(query, newPet, (error) => {
                    if(error) {
                        res.status(400).json(error);
                    } else {
                        res.status(200).json(newPet);
                    }
                });
            }
        });
    }
}

module.exports = new Pet