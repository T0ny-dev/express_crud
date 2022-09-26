const express = require('express');
const routerProgramacion = express.Router();
const {programacion} = require('../datos/cursos.js').infoCursos;

//Midleware
routerProgramacion.use(express.json())

routerProgramacion.get('/', (req, res) => {
  res.send(JSON.stringify(programacion));
});

routerProgramacion.get('/:lenguaje', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = programacion.filter(curso => curso.lenguaje === lenguaje);
  
  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
  }
  //ordenar vistas con parametro query
  if (req.query.ordenar === 'vistas') {
    return res.send(JSON.stringify(resultados.sort((a, b) => b.vistas - a.vistas)));
  }

  res.send(JSON.stringify(resultados));
})

routerProgramacion.get('/:lenguaje/:nivel',(req, res) => {
  const  lenguaje = req.params.lenguaje
  const nivel = req.params.nivel;

  const resultados = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);

  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron resultados del curso ${lenguaje} y del nivel ${nivel}`)
  }
  res.send(JSON.stringify(resultados));

})

//POST metodo
routerProgramacion.post('/', (req, res) =>{
  let CursoNuevo = req.body;
  programacion.push(CursoNuevo);
  res.send(JSON.stringify(programacion));
});

//PUT metodo
routerProgramacion.put('/:id', (req, res) => {
  const CursoActualizado = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex(curso => curso.id == id);

  if (indice >= 0 ) {
    programacion[indice] = CursoActualizado;
  } else {
    res.status(404)
  }
  res.send(JSON.stringify(programacion));
});

//Metodo Patch

routerProgramacion.patch('/:id',(req,res) => {
  const infoActualizada = req.body;
  const id = req.params.id;
  const indice = programacion.findIndex(curso => curso.id == id);

  if (indice >= 0) {
    const cursoAModificar = programacion[indice];
    Object.assign(cursoAModificar, infoActualizada);
  }
  res.send(JSON.stringify(programacion))
});


//DELETE

routerProgramacion.delete('/:id', (req, res) => {
  const id = req.params.id;
  const indice = programacion.findIndex(curso => curso.id == id);
  if (indice >= 0) {
    programacion.slice(indice, 1);
  }
  res.send(JSON.stringify(programacion));
});

module.exports = routerProgramacion;

