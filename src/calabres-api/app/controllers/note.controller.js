
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
    let query = 'INSERT INTO product (title,img,price,company,info,inCart,count,total,type,width,profile,rodado) values("' + req.body.title + '","img/' + req.file.filename + '",' + req.body.price + ',"' + req.body.company + '","' + req.body.info + '",' + false + ',' + 0 + ',' + 0 + ',"' + req.body.type + '","' + req.body.width + '","' + req.body.profile + '","'+req.body.rodado+'");';
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


};

exports.logAdmin = (req, res) => {
    console.log('Intentando logear');
    console.log('User : ' + req.body.user);
    console.log('Password : ' + req.body.password);
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'calabresdb'
    });

    con.connect();
    let query = 'SELECT username,password from admin where username ="' + req.body.user + '" AND password="' + req.body.password + '"';
    console.log(query);
    con.query(query,
        (err, response, campos) => {
            if (err) {
                console.log('ERROR EN QUERY' + err);
            } else {
                if (response[0]) {
                    console.log('USERNAME : ' + response[0].username);
                    console.log('Password : ' + response[0].password);
                    if (response[0].username && response[0].password) res.send(200);
                } else res.redirect('http://localhost:3000/login');


            }
        });
    con.end();
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

};


// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'calabresdb'
    });

    con.connect();
    let query = "UPDATE product SET price = " + req.body.price + " WHERE id = " + req.params.noteId;
    console.log(query);
    con.query(query, (err, response, campos) => {
        if (err) {
            console.log('ERROR EN QUERY');
        } else {
            return res.send(response);
        }
    });
    con.end();



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
    try {
        con.connect();
        con.query("DELETE FROM product WHERE id = " + req.params.noteId, (err, response, campos) => {
            if (err) {
                console.log('Error en query')
            } else {
                res.redirect('http://localhost:3000/adminHome');
            }
        });
        con.end();
    } catch (e) {
        console.log('Error catched : ' + e);
    }


};

saveSoldProducts = (products, sellId) => {
    console.log('Saving products');
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'calabresdb'
    });
    con.connect();
    products.map((item) => {
        try {
            let productCant = item.count;
            if (productCant < 1) productCant = 1;
            let query = 'INSERT INTO productSold (company,title,width,profile,cant,sellId,rodado) values("' + item.company + '","' + item.title + '","' + item.width + '","' + item.profile + '",' + productCant + ',' + sellId + ',"'+item.rodado+'");';
            console.log(query);

            con.query(query, (err, response, campos) => {
                if (err) {
                    console.log('Error en query products')
                    console.log(err);
                } else {
                    console.log('Item Inserted !')

                }
            });

        } catch (e) {
            console.log('Error catched : ' + e);
            con.end();
        }

    });
    con.end();

}

exports.saveVenta = (req, res) => {

    let products = req.body.products;

    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'calabresdb'
    });

    try {
        let query = 'INSERT INTO shipingTicket (name,identity_number,userEmail,dir_Remitente,localidad,postalCode,total,phone) values("' + req.body.name + '","' + req.body.identity_number + '","' + req.body.userEmail + '","' + req.body.dir_Remitente + '","' + req.body.localidad + '","' + req.body.postalCode + '","' + req.body.total + '","' + req.body.phone + '");';

        con.connect();
        con.query(query, (err, response, campos) => {
            if (err) {
                console.log('Error en query shippingTicket')
                res.send(500);
            } else {
                console.log('Ticket insertado! ID : ' + response.insertId);
                saveSoldProducts(products, response.insertId);
                res.send(200);
            }
        });
        con.end();
    } catch (e) {
        console.log('Error catched : ' + e);
        res.send(500);
    }

}

exports.getTickets = (req, res) => {

    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'calabresdb'
    });

    con.connect();
    con.query("SELECT * FROM shipingTicket", (err, response, campos) => {
        if (err) {
            console.log('ERROR EN QUERY shipping tickets');
        } else {
            res.send(response);
        }
    });
    con.end();

}

exports.getProductsFromTicket = (req, res) => {

    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'calabresdb'
    });

    con.connect();
    let ticketId = req.params.ticketId;
    console.log('Ticket id  : ' + ticketId);
    con.query("SELECT * FROM productSold", (err, response, campos) => {
        if (err) {
            console.log('ERROR EN QUERY products from ticket');
        } else {
            //Funciona 
            console.log(response);
            res.send(response);
        }
    });

    con.end();


}

exports.deleteProductsFromTicket = (req, res) => {
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'calabresdb'
    });

    con.connect();
    let ticketId = req.params.ticketId;
    console.log('Ticket id  : ' + ticketId);
    con.query("DELETE FROM productSold WHERE sellId = " + ticketId, (err, response, campos) => {
        if (err) {
            console.log('ERROR EN QUERY products from ticket');
        } else {
            res.send(200);
        }
    });

    con.end();
}

exports.deleteTicket = (req, res) => {
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'calabresdb'
    });

    con.connect();
    let ticketId = req.params.ticketId;
    console.log('Ticket id  : ' + ticketId);
    con.query("DELETE FROM shipingTicket WHERE id = " + ticketId, (err, response, campos) => {
        if (err) {
            console.log('ERROR EN QUERY products from ticket');
        } else {
            res.send(200);
        }
    });

    con.end();
}