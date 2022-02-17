const express = require('express');

const Orden = require('../database/models/orden.model');
const { SolicitudMateria } = require('../middlewares/emails/nuevo.email');

const app = express();

app.post('/api/orden', (req, res)=>{

    const body = req.body;

    let NewOrden = new Orden({
        cantidad:body.cantidad,
        cliente:body.cliente,
        orden:body.orden_compra,
        paginas:body.paginas,
        producto:body.producto,
        demasia:body.demasia,
        fecha_s:body.fecha_s
    })


    NewOrden.save((err, resp)=>{
        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        SolicitudMateria(resp.sort,'test')

        res.json(resp._id)
    })

});

app.get('/api/orden', (req, res)=>{

    const id = req.params.id;

    Orden.find()
        .populate('cliente producto producto.grupo')
        .exec((err, orden)=>{
        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json(orden)
    });

});

app.get('/api/orden_material', (req, res)=>{

    const id = req.params.id;

    Orden.find({estado:'Espera'})
        .populate('cliente producto')
        .populate({path:'producto', populate:{path:'grupo materiales.producto'}})
        .exec((err, orden)=>{
        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json(orden)
    });

});

app.get('/api/orden/:id', (req, res)=>{

    const id = req.params.id;

    Orden.findOne({_id:id})
        .populate('cliente')
        .populate({path:'producto', populate:{path:'grupo materiales.producto', populate:{path:'grupo'}}})
        .exec((err, orden)=>{
        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json(orden)
    });

});


module.exports = app;