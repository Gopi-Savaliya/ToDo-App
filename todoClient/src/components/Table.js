import React, { useState, Fragment } from 'react'
import TableScrollbar from 'react-table-scrollbar';

function Table({tasks, row, taskComplete, deleteTask, editTask}) {

  const [editTaskID, seteditTaskID] = useState(null);
  const [taskName, settaskName] = useState('');

  const handleEditClick = (taskRow) => {
    seteditTaskID(taskRow.taskID);
    settaskName(taskRow.task);
  }

  const handleSaveClick = (taskID) => {
    editTask(taskName, taskID);
    seteditTaskID(null);
  }

  const handleCancelClick = () => {
    seteditTaskID(null);
  }

  return (
    <TableScrollbar rows={row}>
    <table className="table">
        <thead style={{ backgroundColor: 'white' }}>
          <tr>
            <th scope="col" style={{ width: '50%' }}>Task</th>
            {taskComplete==='' && <th scope="col" style={{ width: '50%' }}>Delete</th>}
            {taskComplete!=='' && <>
                <th scope="col" style={{ width: '20%' }}>Actions</th>
                <th scope="col" style={{ width: '15%' }}></th>
                <th scope="col" style={{ width: '15%' }}></th>
            </>}
          </tr>
        </thead>
        <tbody>
            {tasks && tasks.map((row) => {
              return <Fragment key={row.taskID}>
                {row.taskID===editTaskID ? (
                  taskComplete!=='' && <tr >
                  <td><input type="text" value={taskName} onChange={ (e) => settaskName(e.target.value) }/></td>
                  <td><button type="button" className="btn btn-success" onClick={ ()=>{handleSaveClick(row.taskID)} } >Save</button></td>
                  <td><button type="button" className="btn btn-danger" onClick={ ()=>{handleCancelClick()} }>Cancel</button></td>
                  <td></td>
                </tr>
                ):(
                <tr >
                  <td>{row.task}</td>
                  {taskComplete!=='' && <>
                    <td><button type="button" className="btn btn-success" onClick={ ()=>{taskComplete(row.taskID)} } >Task Complete</button></td>
                    <td><button type="button" className="btn btn-secondary" onClick={ ()=>{handleEditClick(row)} } >Edit</button></td>
                  </>}
                  <td><button type="button" className="btn btn-danger" onClick={ ()=>{deleteTask(row.taskID)} }>Delete</button></td>
                </tr>
                )}
              </Fragment>
            })}
        </tbody>
      </table>
    </TableScrollbar>
  )
}

export default Table