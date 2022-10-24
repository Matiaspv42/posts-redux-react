const express = require('express')
const app = express()

const {getPosts, createPost, deletePost} = require('./consultas')

const cors = require('cors')
app.use(cors())


app.use(express.json())

const port = 3001

app.listen(port, ()=>{
    console.log('Servidor andando en puerto '+port)
})


app.get('/posts', async(req,res)=>{
    try {
        const posts = await getPosts()
        res.status(200).send(posts)
    } catch (error) {
        
    }
})

app.post('/posts', async(req,res)=>{
    try{
        const {nombre, descripcion} = req.body
        const respuesta = await createPost(nombre, descripcion)
        if(respuesta) res.status(200).send(respuesta[0])
    } catch (error) {

    }
})

app.delete('/posts/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const respuesta = await deletePost(id)
        console.log(respuesta)
        if(respuesta) res.status(200).send(respuesta[0])

    } catch (error) {
        
    }
})