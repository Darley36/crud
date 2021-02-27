import React, {useState} from 'react'
import {isEmpty, size} from 'lodash'
import shortid from 'shortid'


function App() {
  const[task, setTask]= useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

  const validForm = () => {
    let isValid = true
    setError(null)
    if(isEmpty(task)){
      setError("Debes ingresar una tarea.")
      isValid = false
    }
    return isValid
  }


  const addTask = (e) =>{
    e.preventDefault() //Para que no recargue la pagina con el submit

    if(!validForm()) {
      return
    }
    const newTask = {//creamos un tipo objeto
      id: shortid.generate(),
      name: task
  }

    setTasks([ ...tasks, newTask])
    setTask("")
  }

  const saveTask = (e) =>{
    e.preventDefault() //Para que no recargue la pagina con el submit
    if(!validForm()) {
      return
    }
    const editedTasks = tasks.map(item => item.id === id ? {id, name: task} : item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setId("")
  }

  //funcion tipo flecha, la cual dice que me pinte en pantalla las tareas excepto la que se borró recientemente
  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)//enviamos todo lo filtrado al arreglo setTasks
  }

  const editTask = (theTask) => {//se recibe el objeto y se crea una varianle que se inicializa
    setTask(theTask.name)
    setEditMode(true)
    setId(theTask.id)
  }

  return (
    <div className="container mt-5">
      <h1>Tasks</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Task List</h4>
          {
            size(tasks) == 0 ? (
              <li className="list-group-item">Aun no hay tareas programadas.</li>
            ) : (
                  <ul className="list-group">
                    {
                      tasks.map((task) => (
                        <li className="list-group-item" key ={task.id}>
                          <span className="lead">
                            {task.name}
                          </span>
                          <button className="btn btn-danger btn-sm float-right mx-2"
                          onClick = {() => deleteTask(task.id)}//dentro de parentecis el delete task es un tipo metodo
                          >
                            Delete
                          </button>
                          <button className="btn btn-warning btn-sm float-right"
                          onClick = {() => editTask(task)}//Cuando se de click se pasa todo el onjeto completo al metodo
                          >
                            Update
                          </button>
                        </li>
                      ))             
                    }
                  </ul>
                )
            
          }
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {editMode ? "Modificar Tarea" : "Agregar Tarea"}
          </h4>
          <form onSubmit={editMode ? saveTask : addTask}>
            {
              error && <span className="text-danger">{error}</span>
            }
            <input
              type="text"
              className="form-control mb2"
              placeholder="Enter task..."
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />
            <button className={editMode ? "btn btn-warning btn-block" :"btn btn-dark btn-block"} 
            type="submit">
              {editMode ? "Save" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
