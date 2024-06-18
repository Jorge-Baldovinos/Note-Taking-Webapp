const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsFunctions');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req.body);

    const {noteTitle, noteText} = req.body;

    if (req.body) {
        const newNote = {
            noteTitle,
            noteText,
            noteID: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Tip added successfully');
    } else {
        res.error('Error in adding note');
    }
});
module.exports = notes;