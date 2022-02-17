const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../database/models/usuarios.model');


const app = express();

app.post('/api/usuario', (req,res)=>{

    let body = req.body;

    console.log(body)

    let usuario = new Usuario({
        Nombre: body.Nombre,
        Apellido: body.Apellido,
        Correo: body.Correo,
        Password: bcrypt.hashSync(body.Password, 10),
        Role: body.Role,
        Departamento:body.Departamento
    });

    usuario.save((err, UsuarioDB) => {
        if ( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            usuario:UsuarioDB
        });

    });

});

module.exports = app;