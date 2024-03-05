
const note = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/utilsfs');



note.get('/', (req,res) => {
    readFromFile('./db/db.json')
    .then((data) => {
        if (!data){
            return res.json([]);
        }
        const jsonData = JSON.parse(data);
        res.json(jsonData);
        })
        .catch((err) => {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
        });
});

note.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const results = json.filter((note) => note.id === noteId);
        return results.length > 0
        ? res.json(results)
        : res.json('no note with that ID');
    });
});

note.delete('/:note_id', (req,res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.id !== noteId);

        writeToFile('./db/db.json', result);

        res.json(`Item ${noteId} has been deleted`);
    });
});

note.post('/', (req, res) => {
    const { title, text } = req.body;

    if(req.body) {
        const newNote = {
            id: uuidv4(),
            title,
            text
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully');
    } else {
        res.status(400).send('Error in adding note');
    }
});

module.exports = note;