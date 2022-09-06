const express = require("express");
const app = express();
const productosRouter = require('./productos')

// MIDDLEWARES
/*ESTAS DOS LINEAS SIEMPRE TIENEN QUE ESTAR, YA QUE SON TRADUCCIONES A JSON*/

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
/*ESTAS DOS LINEAS SIEMPRE TIENEN QUE ESTAR*/

app.use('/api/productos', productosRouter)

app.use ('/', express.static(__dirname + "/assets"))


const server = app.listen(8080, () => {
    console.log("Servidor iniciado");
});

server.on("error", (error) => {
    console.error(`Error: ${error}`);
});