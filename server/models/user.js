const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

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
    },
    theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'light'
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

userSchema.pre('save', function (next) {
    let user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});

/**
 * TODO: validate if we can use findbyidandupdate
 * this same method doesn't recognize that mongo query
 */
userSchema.pre('findOneAndUpdate', async function (next) {
    this._update.password = bcrypt.hashSync(this._update.password, SALT_WORK_FACTOR);
    next();
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }

        callback(null, isMatch);
    });
}

module.exports = mongoose.model('User', userSchema);
