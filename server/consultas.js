const {Pool} = require('pg')

const config = {
    user: 'postgres',
    host:'localhost',
    password:'postgres',
    port:5433,
    database:'tcit',
}

const pool = new Pool(config)

const getPosts = async () =>{
    try {
        const query = {
            text: "SELECT * from posts;"
        }
        const {rows} = await pool.query(query)
        return rows
    } catch (error) {
        console.log(error)
    }
}

const createPost = async (nombre, descripcion) =>{
    try {
        const query = {
            text: "INSERT into posts(nombre, descripcion) values ($1, $2) RETURNING id, nombre, descripcion", 
            values: [nombre, descripcion]
        }
        const {rows} = await pool.query(query)
        return rows
    } catch (error) {
        console.log(error)
    }
}

const deletePost = async (id) =>{
    try {
        const query = {
            text: "DELETE FROM posts where id = $1 RETURNING id", 
            values: [id]
        }
        const {rows} = await pool.query(query)
        return rows
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getPosts,
    createPost,
    deletePost
}