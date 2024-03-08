const mongoose = require("mongoose");
require(dotenv).config();

mongoose.connect(process.env.MONGODB_URL);

const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

exports.todo = mongoose.model('Todo',TodoSchema);