const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "El título del post es requerido."]
    },
    content: {
        type: String,
        required: [true, "El contenido del post es requerido."]
    },
    backgroundImage: {
        type: String,
        default: '#'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "El autor del post es requerido."]
    }
});

module.exports = mongoose.model('Post', postSchema);
