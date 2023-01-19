const express = require('express');
const bodyparser = require('body-parser');
const pool = require('./db');
const app = express();

app.use(express.json())

app.set('view engine', 'ejs');
var allTodo;
app.get('/todos', async (req, res) => {
    try {
        allTodo = await pool.query("select * from todo order by todo_id");
        res.header("Access-Control-Allow-Origin", "*");
        res.json(allTodo.rows);
    } catch (err) {
        console.log(err.message)
    }
});

app.get('/todos/:id', async (req, res) => {
    try {
        const onetodo = await pool.query("select * from todo where todo_id = ($1)", [req.params.id]);
        res.json(onetodo.rows);
    } catch (err) {
        console.log(err.message)
    }
})

app.post('/todos', async (req, res) => {
    try {        
        const {description} = req.body;
        const {completed} = req.body;
        const newtodo =  await pool.query("INSERT into todo (description, completed) values ($1,$2) returning *", [description,completed]);
        res.json(newtodo.rows[0])
    } catch (err) {
        console.log(err.message)
    }
});

app.put('/todos/:id', async (req, res) => {
    try {
        const {completed} = req.body;
        const updatetodo = await pool.query("update todo set completed = ($1) where todo_id = ($2)", [completed, req.params.id]);
        res.json("todo updated");
    } catch (err) {
        console.log(err.message)
    }
})

app.delete('/todos/:id', async (req, res) => {
   /*var id;
    for (var i = 0; i < allTodo.rowCount; i++) {
        if (allTodo.rows[i].description === req.params.des) {
            id = allTodo.rows[i].todo_id;
            break;
        }
    }*/
    try {
        const deletetodo = await pool.query("delete from todo where todo_id = ($1)", [req.params.id]);
        res.json("todo deleted");
    }
    catch (err) {
        console.log(err.message)
    }
})

app.listen(3000, () => {
    console.log("listening on port 3000");
})
