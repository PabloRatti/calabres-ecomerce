
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

    // Delete products from ticket
    app.delete('/notes/deleteProductsFromTicket/:ticketId', notes.deleteProductsFromTicket);

    // Delete Ticket
    app.delete('/notes/deleteTicket/:ticketId', notes.deleteTicket);

    //Delete a picture
    app.post('/notes/deletePicture/:notePath', notes.deletePicture);
    
    //Login
    app.post('/notes/adminLogin', notes.logAdmin);

    //Save sells to send product to client
    app.post('/notes/guardarVenta', notes.saveVenta);

    //Get sold tickets to delivery
    app.get('/notes/getTickets/getAll', notes.getTickets);

    //Get products for one ticket
    app.get('/notes/getTicketsProducts/getAll', notes.getProductsFromTicket);
}
