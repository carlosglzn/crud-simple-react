import React, { useState } from 'react'
import shortid from 'shortid'


function App() {

  const [tarea, setTarea] = useState('')

  const [tareas, setTareas] = useState([])

  const [modoEdicion, setModoEdicion] = useState(false)

  const [id, setId] = useState('')

  const [error, setError] = useState(null)

  const agregarTarea = (event) => {
    event.preventDefault()
    
    if (!tarea.trim()) {
      console.log('Elemento Vacío')
      setError('Escriba algo por favor...')
      return
    }
    console.log(tarea)

    setTareas([
      ...tareas,
      {id: shortid.generate(), tarea: tarea}
    ])

    setTarea('')
    setError(null)
  }

  const eliminarTarea = (id) => {
    
    const arrayFiltrado = tareas.filter(element => element.id !== id)

    setTareas(arrayFiltrado)

  }

  const editar = element => {
    console.log(element)
    setModoEdicion(true)
    setTarea(element.tarea)
    setId(element.id)
  }

  const editarTarea = (event) => {
    event.preventDefault()
    if (!tarea.trim()) {
      console.log('Elemento Vacío')
      setError('Escriba algo por favor...')
      return
    }

    const arrayEditado = tareas.map(element => element.id === id ? {id, tarea} : element)

    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD Simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {

              tareas.length === 0 ? (
                <li className="list-group-item">
                  No hay Tareas
                </li>
              ) : (
                tareas.map((element) => (
                <li className="list-group-item" key={element.id}>
                  <span className="lead">{element.tarea}</span>
                  <button 
                    className="btn btn-danger btn-sm float-end mx-2"
                    onClick={() => eliminarTarea(element.id)}
                    >
                    Eliminar
                  </button>
                  <button 
                    className="btn btn-warning btn-sm float-end"
                    onClick={() => editar(element)}
                    >
                    Editar
                  </button>
                </li>
              ))
              ) 
            }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            
            {
              error ? <span className="text-danger">{error}</span> : null
            }

            <input 
              type="text" 
              className="form-control mb-2" 
              placeholder="Ingrese Tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />

            {
              modoEdicion ? (
                <div className="d-grid">
                  <button className="btn btn-warning" type="submit">Editar</button>
                </div>
              ) : (
                <div className="d-grid">
                  <button className="btn btn-dark" type="submit">Agregar</button>
                </div>
              )
            }

            
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
