// CONSTANTE FS PARA LEER EL ARCHIVO TXT
const fs = require("fs");

class Productos {

    // CONSTRUCTOR
    constructor(fileName) {
        this._filename = fileName;
        this._readFileOrCreateNewOne();
    }

    async _readFileOrCreateNewOne() {
        try {
            // LEO EL ARCHIVO DE LA BD (PRODUCTOS.TXT)
            await fs.promises.readFile(this._filename, "utf-8");
        } catch (error) {
            error.code === "ENOENT" ?
                this._createEmptyFile() :
                console.log(
                    `Error Code: ${error.code} | There was an unexpected error when trying to read ${this._filename}`
                );
        }
    }

    // FUNCIÓN PARA TRAER UN PRODUCTO POR ID
    async getById(id) {
        try {
            const data = await this.getData();
            const parsedData = JSON.parse(data);

            return parsedData.find((producto) => producto.id === id);
        } catch (error) {
            console.log(
                `Error Code: ${error.code} | There was an error when trying to get an element by its ID (${id})`
            );
        }
    }

    // FUNCIÓN PARA DEVOLVER LA INFO DEL ARCHIVO
    async getData() {
        const data = await fs.promises.readFile(this._filename, "utf-8");
        return data;
    }

    // FUNCIÓN PARA DEVOLVER LA INFO DEL ARCHIVO EN JSON
    async getAll() {
        const data = await this.getData();
        return JSON.parse(data);

    }
}

module.exports = Productos;