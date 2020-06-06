
var multer = require('multer')
//This appends de extension to file
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../public/img/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg') //Appending .jpg
    }
})

var upload = multer({ storage : storage })


module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/notes', upload.single('file'),notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/update/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);

    app.post('/notes/deletePicture/:notePath', notes.deletePicture);
}
