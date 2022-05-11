const express = require('express')
const handlebars = require('express-handlebars');
const { Contenedor } = require('./main');

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const producto = new Contenedor('./public/productos.txt');

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        partialsDir: __dirname + "/views/partials"
    })
)

app.set('views', './views')
app.set('views engine', 'hbs')

/* --------------------------------------------- */

app.get('/',async (req, res) => {
    let productos = await producto.getAll()
    return res.render('index.hbs', {productos})
})

app.post("/productos",async (req, res) => {
    let productos = await producto.getAll()   
     await producto.save(req.body)   
    let boolean = productos.length !==0
    return res.render('productos.hbs', {list: productos, showList: boolean});
});

app.get("/productos", async (req, res) => {
    let productos = await producto.getAll()
    let boolean = productos.length !==0    
    return res.render('productos.hbs', {
        list: productos, showList: boolean});
});

/* ---------------------------------------------------*/
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))