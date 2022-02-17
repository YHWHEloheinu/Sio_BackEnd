const express = require('express');
const Bobina = require('../database/models/bobinas.model');
const Sustrato = require('../database/models/sustrato.model');
const Conversion = require('../database/models/conversiones.model');


const app = express();


app.post('/api/bobina', (req, res)=>{

    const body = req.body;

    const NewBobina = new Bobina({
        Nbobina:body.Nbobina,
        material:body.material,
        gramaje:body.gramaje,
        ancho:body.ancho,
        peso:body.peso
    })

    NewBobina.save((err, bobina)=>{
        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        // --MOSTRAR NUEVA MAQUINA AÑADIDA--
        res.json(bobina);
    });

});

app.get('/api/bobina', (req, res)=>{

    Bobina.find((err, bobina)=>{
        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        // --MOSTRAR NUEVA MAQUINA AÑADIDA--
        res.json(bobina);
    });

});

app.get('/api/sustrato', (req, res)=>{

    Sustrato.find((err, sustrato)=>{
        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        // --MOSTRAR NUEVA MAQUINA AÑADIDA--
        res.json(sustrato);
    });

});

app.post('/api/sustrato', (req, res)=>{
    const body = req.body;
    let num_Conv;

    console.log(body)

    let NewConv = new Conversion({
        bobina:body.bobina,
        peso:body.peso
    })

    console.log('new', NewConv)
    
    NewConv.save((err, conv)=>{
        // if( err ){
        //     return res.status(400).json({
        //         ok:false,
        //         err
        //     });
        // }


        console.log('que pasa aqui', conv)
        num_Conv = conv.sort;
    })


    Bobina.findOne({_id:body.bobina}, (err, bobinaDB)=>{
        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        let resta = bobinaDB.peso - body.peso

        const newSustrato = new Sustrato({
            material:bobinaDB.material,
            cantidad:body.hojas
        })

        newSustrato.save((err, sustratoDB)=>{
            if( err ){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }

            Bobina.findByIdAndUpdate(body.bobina, {peso:resta}, (err, sustratoDB)=>{
                if( err ){
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }
                res.json(num_Conv)
            })

        })

    
    })
});

app.post('/api/sustratos/:id', (req, res)=>{
    const id = req.params.id;
    const body = req.body

    console.log(id)

    Sustrato.findByIdAndRemove(id, (err, eliminado)=>{
        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:'eliminado'
        })
    })
})

module.exports = app;