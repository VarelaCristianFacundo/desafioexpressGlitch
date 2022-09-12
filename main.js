const express = require("express");
const handlebars = require('express-handlebars')
const app = express();
const productosRouter = require('./productos')

// MIDDLEWARES
/*ESTAS DOS LINEAS SIEMPRE TIENEN QUE ESTAR, YA QUE SON TRADUCCIONES A JSON*/

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
/*ESTAS DOS LINEAS SIEMPRE TIENEN QUE ESTAR*/

/* HBS */
app.engine("hbs", handlebars.engine({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'index'
}))

app.set ('views', './views');
app.set('view engine', 'hbs')


app.use('/', productosRouter)

app.use ('/', express.static(__dirname + "/assets"))


/* HBS */

const server = app.listen(8080, () => {
    console.log("Servidor iniciado");
});

server.on("error", (error) => {
    console.error(`Error: ${error}`);
});