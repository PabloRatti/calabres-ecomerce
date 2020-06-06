const Note = require('../models/note.model.js');
const mysql = require('mysql');



// Create and Save a new Note
exports.create = (req, res) => {
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'calabresdb'
    });
    
    con.connect();
    let query = 'INSERT INTO product (title,img,price,company,info,inCart,count,total,type,width,profile) values("' + req.body.title + '","img/' + req.file.filename + '",' + req.body.price + ',"' + req.body.company + '","' + req.body.info + '",' + false + ',' + 0 + ',' + 0 + ',"' + req.body.type + '","' + req.body.width + '","' + req.body.profile + '");';
    console.log(query);
    con.query(query, 
    (err, response, campos) => {
            if (err) {
                console.log('ERROR EN QUERY' + err);
            } else {
                res.status(200).redirect('http://localhost:3000/adminHome');
            }
        });
    con.end();

    /*
    console.log(req.file);
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: 'Error , peticion vacia!'
        });
    }

    console.log('Original path : ' + req.file.filename);
    // Create a Note
    const note = new Note({
        title: req.body.title || "Untitled Note",
        img: 'img/' + req.file.filename,
        price: req.body.price,
        company: req.body.company,
        info: req.body.info,
        inCart: false,
        count: 0,
        total: 0,
        width: req.body.width,
        type: req.body.type
    });

    // Save Note in the database

    note.save()
        .then(data => {
            //res.send(data);
            res.status(200).redirect('http://localhost:3000/adminHome');
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
*/
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'calabresdb'
    });

    con.connect();
    con.query("SELECT * FROM product", (err, response, campos) => {
        if (err) {
            console.log('ERROR EN QUERY');
        } else {
            return res.send(response);
        }
    });
    con.end();


    /*
       console.log('Find all ')
       return res.send(misProductos);
      
       console.log('Finding all records');
       Note.find()
           .then(notes => {
               res.send(notes);
           }).catch(err => {
               res.status(500).send({
                   message: err.message || "Some error occurred while retrieving notes."
               });
           });*/
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'calabresdb'
    });

    console.log('Finding one record')
    con.connect();
    con.query("SELECT * FROM product WHERE id = " + req.params.noteId, (err, response, campos) => {
        if (err) {
            console.log('ERROR EN QUERY');
        } else {
            return res.send(response);
        }
    });
    con.end();
    /*
    Note.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });
        */
};


// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    // Find note and update it with the request body
    console.log('Update in progress');
    Note.findByIdAndUpdate(req.params.noteId, {
        price: req.body.price
    }, { new: true })
        .then(note => {
            if (!note) {
                console.log('Error 404');
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                console.log('Error 404');
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        });

};

//Function to delete de picture of a publication
//Find img path and delete before delete product from database

exports.deletePicture = (req, res) => {

    let fileName = req.params.notePath;
    console.log('Path a borrar img/' + fileName);
    var deleteRoute = '../../public/img/' + fileName;
    var fs = require('fs');
    fs.unlinkSync(deleteRoute);

    return res.send('Picture deleted');

}

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    //deletePictureFile(pictureId);
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'calabresdb'
    });
try{
 con.connect();
    con.query("DELETE FROM product WHERE id = " + req.params.noteId, (err, response, campos) => {
        if (err) {
            console.log('Error en query')
        } else {
             res.redirect('http://localhost:3000/adminHome');
        }
    });
    con.end();   
}catch(e){
    console.log('Error catched : '+e);
}
    
    /*
    Note.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        });*/
};

