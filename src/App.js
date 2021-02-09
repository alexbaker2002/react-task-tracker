import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
//import { router } from 'json-server';


function App() {
const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([])

// on page load get tasks from backend
  useEffect(() => {
   const getTasks = async () => {
     const tasksFromServer = await fetchTasks();
     setTasks(tasksFromServer)
   }
    getTasks()
  }, [])  


// fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json();
    //console.log(data)
    return data
}

// fetch single task
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json();
  return data
}



// delete tasks
const deleteTask = async (id) => {
//console.log('delete ', id)
await fetch(`http://localhost:5000/tasks/${id}`, {
  method: 'DELETE'
})

setTasks(tasks.filter((task) => task.id !== id))
}

// toggle reminder
const toggleReminder = async (id) => {

const taskToToggle = await fetchTask(id)
const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
const res = await fetch(`http://localhost:5000/tasks/${id}`, {
  method: 'PUT',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify(updTask)
})

const data = await res.json()

  setTasks(tasks.map((task) => 
    task.id === id ? {...task, reminder: data.reminder} : task
  )
  )
}

//add task
const addTask = async (task) => {

const res = await fetch('http://localhost:5000/tasks', {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify(task)
})

const data = await res.json()
setTasks([...tasks, data])



  //for development without back end... adds to state only
//  // console.log(task)
//  const id = Math.floor(Math.random() * 10000) + 1
// const newTask = {id, ...task}
// setTasks([...tasks, newTask])

}

  return (
    <Router>
    <div className="container">
      
      <Header onAdd={() => {setShowAddTask(!showAddTask)}} showAdd={showAddTask}/>
      
      <Route path='/' exact render={(props) => (
          <>
          {showAddTask && <AddTask onAdd=
            {addTask}/>}
          {tasks.length > 0 ? (
            <Tasks 
            tasks={tasks} 
            onDelete={deleteTask} 
            onToggle={toggleReminder} 
            />) : ('Nothing to Do')}

          </>
      )} />
      <Route path='/about' component={About}/>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
