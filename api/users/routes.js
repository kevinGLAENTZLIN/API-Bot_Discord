const request_sql = require('../DataBase/database.js');
const BodyParser = require('body-parser');
var JsonParser = BodyParser.json();
var express = require('express');
const { json } = require('express');
var router = express.Router()

router.post('/', JsonParser, (req, res) => {
    const newItem = {
        nom: req.body.nom,
        nombres: req.body.nombres,
        reférence: req.body.reférence,
        prix: req.body.prix
    }
    request_sql.query(`INSERT INTO inventaire VALUES ("${newItem.nom}", "${newItem.nombres}", "${newItem.reférence}", "${newItem.prix}")`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log("New item create: ", { newItem });
    });
    res.send(200);
});

router.get('/', (req, res) => {
    request_sql.query('SELECT * FROM inventaire', (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log("Database well displayed");
    });
    res.send(200);
});

router.put('/', JsonParser, (req, res) => {
    const UpdateItem = {
        nom: req.body.nom,
        nombres: req.body.nombres,
        reférence: req.body.reférence,
        prix: req.body.prix
    }
    request_sql.query('UPDATE inventaire SET nom = ?, nombres = ?, reférence = ?, prix = ? WHERE nom = ?',
    [UpdateItem.nom, UpdateItem.nombres, UpdateItem.reférence, UpdateItem.prix, UpdateItem.nom], (err, res) => {
        if (err) {
            console.log("error :", err)
            return;
        }
        console.log("Table updated: ", { UpdateItem });
    });
    res.send(200);
});

router.delete('/', JsonParser, (req, res) => {
    const DeleteItem = {
        nom: req.body.nom,
    }
    request_sql.query('DELETE FROM inventaire WHERE nom = ?', [DeleteItem.nom], (err, res) => {
        if (err) {
            console.log("error :", err)
            return;
        }
        console.log("Line suceffuly delete: ", { DeleteItem })
    });
    res.send(200);
})

module.exports = router;