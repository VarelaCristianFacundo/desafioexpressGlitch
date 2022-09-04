const express = require("express");
const app = express();


// MIDDLEWARES
/*ESTAS DOS LINEAS SIEMPRE TIENEN QUE ESTAR, YA QUE SON TRADUCCIONES A JSON*/
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
/*ESTAS DOS LINEAS SIEMPRE TIENEN QUE ESTAR*/


// 1)
app.get ('/api/sumar/:num1/:num2', (req, res) =>{
    const {num1, num2} = req.params
    res.send({val: Number(num1)+ Number(num2)});
});




app.listen(8080, () => {
    console.log('Server inciado');
})