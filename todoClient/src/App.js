import './App.css';
import Form from './components/Form';
import Table from './components/Table';
import Nav from './components/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios';

function App() {
  const [taskList, settaskList] = useState([]);
  const [notCompletedTasks, setnotCompletedTasks] = useState([]);
  const [completedTasks, setcompletedTasks] = useState([]);

  const addTask = (taskName) => {
    axios.post(`${process.env.REACT_APP_BASIC_URL}/add`, {
      task: taskName
    }).then(() => {
      settaskList('');
      displayTask();
    }).catch(err => console.log(err));
  };

  const displayTask = () => {
    axios.get(`${process.env.REACT_APP_BASIC_URL}/tasks`).then((res) => {
        settaskList(res.data);
        setnotCompletedTasks(res.data.filter(item=>item.status==='not complete'));
        setcompletedTasks(res.data.filter(item=>item.status==='complete'));
      })
      .catch(err => console.log(err));
  }

  const taskComplete = (id) => {
    axios.post(`${process.env.REACT_APP_BASIC_URL}/taskComplete`, {
      taskID: id
    }).then(() => {
      settaskList('');
      displayTask();
    }).catch(err => console.log(err));
  }
  
  const deleteTask = (id) => {
    axios.post(`${process.env.REACT_APP_BASIC_URL}/deleteTask`, {
      taskID: id
    }).then(() => {
      settaskList('');
      displayTask();
    }).catch(err => console.log(err));
  }

  const editTask = (taskName, taskID) => {
    axios.post(`${process.env.REACT_APP_BASIC_URL}/editTask`, {
      task: taskName,
      taskID: taskID
    }).then(() => {
      settaskList('');
      displayTask();
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    displayTask();
  }, []);

  useEffect(() => {
  }, [taskList]);

  return (
    <Router>
        <div className="container">
          <Nav />
          <Routes>
            <Route path="/" element={
                <div className="mt-5">
                  <Form addTask={ addTask }  />
                  <hr className="my-5" />
                  {taskList.length!==0?<Table tasks={notCompletedTasks} row={7} taskComplete={taskComplete} deleteTask={deleteTask} editTask={editTask} />:<p className='App mt-5'>No Tasks Added</p>}
                </div>
              }/>
            <Route path="/tasks" element={notCompletedTasks.length!==0?<Table tasks={notCompletedTasks} row={15} taskComplete={taskComplete} deleteTask={deleteTask} editTask={editTask} />:<p className='App mt-5'>No Tasks</p>} />
            <Route path="/completedTasks" element={completedTasks.length!==0?<Table tasks={completedTasks} row={15} taskComplete={ '' } deleteTask={deleteTask} editTask={''} />:<p className='App mt-5'>No Completed Tasks</p>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
