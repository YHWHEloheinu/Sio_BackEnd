const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../database/models/usuarios.model');
const { verificarToken } = require('../auth/autenticacion');

const app = express();

app.get('/api/renew', verificarToken, (req,res)=>{

    let token = jwt.sign({
        usuario:req.usuario
    }, process.env.SEED, {expiresIn:process.env.EXP});

    

    res.json({
        ok:true,
        usuario:req.usuario,
        token,
    });
})

app.post('/api/login', (req,res)=>{

    let body = req.body;
    console.log(body)

    Usuario.findOne({Correo:body.Correo}, (err, usuarioDB)=>{
        if ( err ){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        console.log(usuarioDB)

        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Usuario o contraseña incorrectos'
                }
            });
        }

        if( !bcrypt.compareSync( body.Password, usuarioDB.Password )){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Usuario o contraseña incorrectos'
                }
            });
        }
        
        let token = jwt.sign({
            usuario:usuarioDB
        }, process.env.SEED, {expiresIn:process.env.EXP});

        res.json({
            ok:true,
            usuario:usuarioDB,
            token
        });
    });

});

module.exports = app;