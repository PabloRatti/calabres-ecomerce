const express = require('express')
const fileUpload = require('express-fileupload')

const app = express()

app.use(fileUpload())


app.post('/upload', (req, res) => {
    //Los inputs estan en req.body
    let EDFile = req.files.file
    console.log('request , descriptoin value : ' + req.body.descripcion);   
    console.log('request , producto value : ' + req.body.producto);  
    console.log('request , marca value : ' + req.body.marca);  
    console.log('request , perfil value : ' + req.body.perfil);  
    console.log('request , ancho value : ' + req.body.ancho);  
   //Estos console log muestran como acceder a la data , agregar funcion que agregue a base de datos
    EDFile.mv(`images/${EDFile.name}`, err => {
        if (err) return res.status(500).redirect('http://localhost:3000/default');
        return res.status(200).redirect('http://localhost:3000/adminHome');
    })
})

app.get('/a', (req, res) => {
    let mensaje = { mensaje: 'Escuchado desde backend' }
    let json = JSON.stringify(mensaje);
    return res.status(200);
})




app.listen(4000, () => console.log('Corriendo'))