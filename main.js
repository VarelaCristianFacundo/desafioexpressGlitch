const express = require("express");
const Productos = require("./Productos");
const listaDeProductos = new Productos("./productos.txt");
const app = express();


// FUNCIÓN PARA TRAER TODOS LOS PRODUCTOS
const getProducts = async () => {
    const allCurrentObjects = await listaDeProductos.getAll();
    return allCurrentObjects;
};

// FUNCIÓN PARA TRAER UN SOLO PRODUCTO POR ID
const getProductsByID = async (idProductoRandom) => {
    const producto = await listaDeProductos.getById(idProductoRandom);
    return producto;
};

// VISTA DE PÁGINA PRINCIPAL
app.get("/", (req, res) => {
    res.send(`
    <h1 style="color: gray; text-align:center;">Bienvenidos al servidor Express De Facu</h1>
    <a href="/productos">Mirar todos los productos</a>
    <br>
    <a href="/productoRandom">Mirar un producto al azar</a>
    `);
});

// VISTA DE TODOS LOS PRODUCTOS
app.get("/productos", (req, res) => {
    try {
        getProducts()
            .then((info) => {
                const infoJSON = JSON.stringify(info);
                const arrayProductos = []
                // res.send(`res: ${infoJSON}`)
                console.log(`res: ${infoJSON}`)
                info.forEach(element => {
                    arrayProductos.push(`
                    <div>
                        <span>${element.id}: ${element.title} - Precio: $${element.price}</span>
                    </div>
                `)                 
                });
                arrayProductos.push(`<a href="/">Home</a>`)                 
                res.send(arrayProductos.toLocaleString())
            })
            .catch((error) => console.log(error))
            .finally(() => console.log("Terminado"))
    } catch (e) {
        res.send({
            error: true
        });
    }
});

// VISTA DE UN PRODUCTO AL AZAR
app.get("/productoRandom", (req, res) => {
    const random = Math.random() * 5 + 1;
    idProductoRandom = parseInt(random);
    try {
        getProductsByID(idProductoRandom)
            .then((info) => {
                const infoJSON = JSON.stringify(info);
                console.log(`res: ${infoJSON}`)
                res.send(`
                <table>
                    <caption>Producto Random</caption>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                    </tr>
                    <tr>
                        <td>${info.id}</td>
                        <td>${info.title}</td>
                        <td>${info.price}</td>
                    </tr>
                </table>
                <a href="/">Home</a>
                `)
                
            })
            .catch((error) => console.log(error))
            .finally(() => console.log("Terminado"))
    } catch (e) {
        res.send({
            error: true
        })
    }

});

const server = app.listen(8080, () => {
    console.log("Servidor iniciado");
});

server.on("error", (error) => {
    console.error(`Error: ${error}`);
});