const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "El nombre de usuario del usuario es requerido."],
        unique: [true, "El valor del nombre de usuario debe ser único."],
        maxLength: [36, "El nombre de usuario no puede ser mayor que 36 carácteres."]
    },
    email: {
        type: String,
        required: [true, "El correo del usuario es requerido."],
        maxLength: [254, "El nombre de usuario no puede ser mayor que 254 carácteres."]
    },
    password: {
        type: String,
        required: [true, "La contraseña del usuario es requerida."],
        minLength: [8, "La contraseña del usuario no puede ser menor que 8 carácteres."]
    },
    profilePicture: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    },
    bio: {
       type: String,
       default: '' 
    }
});

module.exports = mongoose.model('User', userSchema);
