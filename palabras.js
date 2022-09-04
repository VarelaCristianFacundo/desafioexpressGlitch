const express = require("express");

const {
    Router
} = express;
let palabras = ['Frase', 'inicial'];

const router = Router();

router.get("/palabras/:pos", (req, res) => {   
    res.send({ buscada: "hola get" });
});
// 3)
router.post('/palabras', (req, res) => {
    const {
        palabra
    } = req.body;
    palabras.push(palabra);
    res.send({
        agregada: palabra,
        pos: palabras.length
    })
})

// REEMPLAZO PALABRA SEGUN POS
router.put('/palabras/:pos', (req, res) => {
    const {
        pos
    } = req.params;
    const {
        palabra
    } = req.body;
    const anterior = palabras[pos - 1];
    palabras[pos - 1] = palabra;
    res.send({
        actualizada: palabra,
        anterior
    })
})

router.delete('/palabras/:pos', (req, res) => {
    const {
        pos
    } = req.params;
    const palabra = palabras[pos - 1];

    palabras = palabras.filter((palabra) => palabra !== palabras[pos - 1])

    res.send({
        eliminada: palabra
    })
})

module.exports = router;