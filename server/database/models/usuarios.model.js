const mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuariosSchema = new Schema({
    Nombre: {
        type:String,
        required:[true, 'El nombre es obligatorio']
    },
    Apellido: {
        type:String,
        required:[true, 'El apellido es obligatorio']
    },
    Correo: {
        type:String,
        required:[true, 'El correo es obligatorio'],
        unique:true
    },
    Password: {
        type:String,
        required: [true, 'La contraseña es obligatoria']
    },
    Role:{
        type:String,
        default: 'USER_ROLE',
    },
    estado:{
        type:Boolean,
        default:true
    },
    Departamento:{
        type:String,
        default:'soporte'
    }

});

usuariosSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.Password;

    return userObject;
}
usuariosSchema.plugin( UniqueValidator, {message: '{PATH} ya se encuentra registrado'});
module.exports = mongoose.model('usuario', usuariosSchema);