// Importar Módulos
const http = require('http');
const url = require('url');
const fs = require('fs');

// Crear Servidor
http
    .createServer((req,res) =>{

        // Constantes para obtener datos desde los formularios
        const params = url.parse(req.url,true).query;
        const archivo = params.archivo;
        const contenido = params.contenido;
        const nombre = params.nombre;
        const nuevoNombre = params.nuevoNombre;

        // Variable para almacenar la fecha de hoy
        let hoy = new Date();
        let fechaHoy = `${hoy.getDate()}/0${hoy.getMonth()+1}/${hoy.getFullYear()}`;

        // Ruta para crear archivo
        if (req.url.includes('/crear')) {
            fs.writeFile(archivo,`${fechaHoy}\n${contenido}`,'utf8',() => {
                res.write(`Archivo ${archivo} creado con exito!`);
                res.end();
            })
        }

        // Ruta para leer archivo
        if (req.url.includes('/leer')) {
            fs.readFile(archivo,'utf8',(err,data) => {
                res.write(`El archivo ${archivo} fue leido con exito, su contenido es:\n\n${data}`);
                res.end();
            })
        }

        // Ruta para renombrar archivo
        if (req.url.includes('/renombrar')) {
            fs.rename(nombre,nuevoNombre,(err,data) => {
                res.write(`El archivo con nombre: ${nombre}, fue renombrado como: ${nuevoNombre}`);
                res.end();
            })
        }

        // Ruta para eliminar archivo
        if (req.url.includes('/eliminar')) {
            fs.unlink(archivo,(err,data) => {
                res.write(`El archivo ${archivo} fue eliminado con exito.`);
                res.end();
            })
        }

    })
    .listen(8080, () => {console.log('Escuchando en el puerto 8080')});