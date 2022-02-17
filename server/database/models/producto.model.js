const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ProductoFinal = new Schema([{
            cliente:{
                type:Schema.Types.ObjectId,
                ref: 'cliente'
            },
            grupo:{
                type:Schema.Types.ObjectId,
                ref: 'grupo'
            },
            producto :{
                type:String
            },
            materiales: [{
                producto:{
                    type:Schema.Types.ObjectId,
                    ref: 'material'
                },
                cantidad:{type:String}
            }],
            ejemplares:{
                type:String
            },
            post: {
                type:Array
            },
            sustrato: {
                type:Array
            },
            codigo: {
                type:String
            },
            version: {
                type:String
            },
            edicion: {
                type:String
            }
}]);


module.exports = mongoose.model('producto', ProductoFinal)