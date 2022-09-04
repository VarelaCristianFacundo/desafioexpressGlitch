const express = require("express");
const app = express();


// MIDDLEWARES
/*ESTAS DOS LINEAS SIEMPRE TIENEN QUE ESTAR, YA QUE SON TRADUCCIONES A JSON*/
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
/*ESTAS DOS LINEAS SIEMPRE TIENEN QUE ESTAR*/

const frase = 'Hola mundo como estan';
// 1)
app.get ('/api/getFrase', (req, res) =>{
    res.send({frase});
});
// 2)
app.get ('/api/getLetra/:num', (req, res) =>{
    const {num} = req.params;
    res.send(frase[num-1]);
});
// 3)
app.get ('/api/getPalabra/:num', (req, res) =>{
    const {num} = req.params;
    if(isNaN(parseInt(num))){
        res.status(403).send({error: true, msg: "no numerico"})
    }else{

        const palabras = frase.split(" ");
        
        res.send (palabras[num - 1])
    }

});



app.listen(8080, () => {
    console.log('Server inciado');
})