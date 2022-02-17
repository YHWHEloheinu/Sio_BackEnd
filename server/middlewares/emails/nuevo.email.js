const nodemailer = require('nodemailer');
const {header, footer} = require('../templates/template.email')


// ENVIAR EMAIL POR CORREO NUEVO

function emailNuevo(titulo, correo, nombre, apellido, any,sede,departamento){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.CORREO,
            pass: process.env.PASS_CORREO
        }
    });
    let tituloCorreo = 'Nuevo ticket creado!'
    const mensaje = 
        `${header(tituloCorreo)}
        Se ha generado un nuevo ticket <strong>${titulo}</strong>
        <br>
        Tu solicitud sera atendida lo mas pronto posible, el equipo de soporte técnico
        se pondrá en contacto con usted en cualquier momento.
        ${footer}`;

    var mailOptions = {
        from: '"Soporte Técnico" <thermo.soporte.group@gmail.com>',
        to: correo,
        subject: 'Ticket creado exitosamente',
        html:mensaje
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err);
            if(departamento != 'profit'){
                nuevoSoporte(titulo, nombre, apellido, any,sede)
            }else{
                nuevoProfit(titulo, nombre, apellido, any,sede)
            }
        }else{
            if(departamento != 'profit'){
                nuevoSoporte(titulo, nombre, apellido, any,sede)
            }else{
                nuevoProfit(titulo, nombre, apellido, any,sede)
            }
        }
    });


}

function SolicitudMateria(orden, producto){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port:465,
        secure: true,
        auth: {
            user: process.env.CORREO,
            pass: process.env.PASS_CORREO
        }
    });
    let titulo = `<h1>Hola Yraida,</h1>`
    var mailOptions = {
        from: '"SIO - Sistema Integral de Operacion" <sio.poligrafica@gmail.com>',
        to: "calcurianandres@gmail.com, Yraida.Baptista@poligraficaindustrial.com",
        subject: `Solicitud de Materiales`,
        html:`${header(titulo)}
        <br>
               Se ha generado una solicitud de material relacionado con la orden de produccion:
               <br>
               <h1 align="center">Nº ${orden}</h1>
               <br>
               No olvides ingresar el sistema para asignar material haciendo click <a href='http://192.168.0.23:8080/almacen'>Aqui</a>
            ${footer}`
    };
    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    });
}

function nuevoProfit(titulo, nombre, apellido, any,sede){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.CORREO,
            pass: process.env.PASS_CORREO
        }
    });
    let tituloCorreo = 'Nuevo ticket creado!'
    var mailOptions = {
        from: '"Soporte Técnico" <ticket.purissima@gmail.com>',
        to: "ahernandez@purissimagroup.com, ycasares@purissimagroup.com, calcurianandres@gmail.com, jsotin@hotmail.com",
        subject: `Nuevo ticket - ${titulo}`,
        html:`${header(tituloCorreo)}
                Se generó un nuevo ticket por ${nombre} ${apellido}, con el titulo ${titulo}
                <br>
                el AnyDesk del contacto es: <strong>${any}</strong>
            ${footer}`
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    });
}

function nuevoSoporte(titulo, nombre, apellido, any,sede){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.CORREO,
            pass: process.env.PASS_CORREO
        }
    });
    let tituloCorreo = 'Nuevo ticket creado!'
    var mailOptions = {
        from: '"Soporte Técnico (Purissima)" <ticket.purissima@gmail.com>',
        to: "calcurianandres@gmail.com, jsotin@hotmail.com",
        subject: `Nuevo ticket - ${titulo}`,
        html:`${header(tituloCorreo)}
                Se generó un nuevo ticket por ${nombre} ${apellido} (Purissima), con el titulo '${titulo}'
                <br>
                el AnyDesk del contacto es: <strong>${any}</strong>
            ${footer}`
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    });
}

module.exports = {
    emailNuevo,
    SolicitudMateria
}
