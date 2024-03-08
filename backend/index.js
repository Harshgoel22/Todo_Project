const express = require("express");
const {createTodoMiddleware, updateTodoMiddleware} = require("./middlewares/types");
const {todo} = require("./config/db");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/todos', async (req,res)=>{
    try{
        const todoList = await todo.find({});
        console.log(todoList);
        return res.status(200).json({
            success: true,
            data: todoList,
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

//create todo
app.post('/todo', createTodoMiddleware, async (req,res)=>{
    try{
        const {title, description} = req.body;
        const todoList = await todo.create({title,description,completed: false});
        return res.status(200).json({
            success: true,
            message: 'todo created successfully',
        })
    }catch(err){
        return res.status(404).json({
            success: false,
            message: 'something went wrong while creating todo',
        })
    }
})

//update todo
app.put('/completed', updateTodoMiddleware, async (req,res)=>{
    try{
        const {id} = req.body;
        const updatedToDoList = await todo.findByIdAndUpdate(
            {_id:id},
            {completed: true},
            {new: true}
        )
        console.log(updatedToDoList);
        return res.status(200).json({
            success: true,
            data: updatedToDoList,
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})

app.listen(PORT, ()=>{
    console.log("Server is running on port: ",PORT);
})