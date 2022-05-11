const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const { Contenedor } = require('./main');

const producto = new Contenedor('./public/productos.txt');

app.set('views', './views')
app.set('views engine', 'ejs')

/* --------------------------------------------- */
app.get('/', async (req, res) => {
    const productos = await producto.getAll()
    return res.render('index.ejs', { productos });
})

app.post("/productos",async (req, res) => {    
    await producto.save(req.body)
    const productos = await producto.getAll()   
    return res.render('productos.ejs', { productos });
});

app.get("/productos",async (req, res) => {
    const productos = await producto.getAll() 
    return res.render('productos.ejs', { productos });
});


/* ---------------------------------------------------*/

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))