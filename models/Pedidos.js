const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedidosSchema = new Schema({
    cliente : {
        type: Schema.Types.ObjectId,
        ref: 'Clientes'
    },
    productos : [{
        producto: {
            type: Schema.Types.ObjectId,
            ref: 'Productos'
        },
        cantidad: Number
    }],
    total : {
        type: Number,
    }
});
module.exports = mongoose.model('Pedidos', pedidosSchema);
    
