const express = require("express");
const app = express();
const palabrasRouter = require('./palabras.js');

// MIDDLEWARES
/*ESTAS DOS LINEAS SIEMPRE TIENEN QUE ESTAR, YA QUE SON TRADUCCIONES A JSON*/
app.use('/api', palabrasRouter)
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
/*ESTAS DOS LINEAS SIEMPRE TIENEN QUE ESTAR*/


let palabras = ['Frase', 'inicial'];

// 1)
app.get ('/api/frase', (req, res) =>{
    res.send({frase: palabras.join(' ')});
});

app.listen(8080, () => {
    console.log('Server inciado');
})