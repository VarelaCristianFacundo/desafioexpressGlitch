const express = require("express");
const app = express();
const multer = require("multer");
const { Router } = express;

const router = Router();
let Productos = [];
let id = Productos.length;
let archivo = "";


// MIDDLEWARES
/*ESTAS DOS LINEAS SIEMPRE TIENEN QUE ESTAR, YA QUE SON TRADUCCIONES A JSON*/

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
/*ESTAS DOS LINEAS SIEMPRE TIENEN QUE ESTAR*/


// CONFIGURADO MULTER
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.fieldname)
    },
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
})

// EJECUCION PARA TABAJAR LOCALMENTE EL MULTER
const upload = multer({storage})


// GET PARA TRAER TODOS LOS PRODUCTOS
router.get('/', (req, res) => {
    res.send({ Productos })
})

// GET PARA TRAER UN SOLO PRODUCTO POR ID
router.get('/:id', (req, res) => {
    const {id} = req.params;
    
    if(Productos.length<id){
        res.status(403).send({error: true, msg: "Producto no encontrado"})
    }else{
        res.send(Productos[id-1]);
    }
})

// POST PARA AGREGAR UN PRODUCTO Y MOSTRARLO
router.post('/', (req, res) => {
    const contador = Productos.length;
    const { title, price, file } = req.body;
    Productos.push({
        id : contador,
        title,
        price,
        file
    })
    res.send({
        Agregado: {
            contador,
            title,
            price,
            file
        }
    })
})

// REEMPLAZO PRODUCTO SEGUN ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, price, file } = req.body;
    const anterior = Productos[id - 1];   


    Productos[id-1] = {
        id : id - 1,
        title,
        price,
        file
    }
    const actualizado = Productos[id - 1]
    res.send({
        actualizado,
        nuevo: {
            anterior
        }
    })
})


// ELIMINO PRODUCTO SEGUN ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const producto = Productos[id - 1];

    Productos = Productos.filter((producto) => producto !== Productos[id - 1])

    res.send({
        eliminado: producto
    })
})

module.exports = router;