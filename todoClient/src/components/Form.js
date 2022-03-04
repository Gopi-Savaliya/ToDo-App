import React from 'react'
import { useState } from 'react'

function Form(props) {

  const [taskName, settaskName] = useState('');

  const onSubmitHandler = () => {
      props.addTask(taskName);
      settaskName('');
  }

  return (
    <form>
        <div className="mb-3">
            <label htmlFor="task" className="form-label">Task</label>
            <input type="text" className="form-control" value={ taskName } onChange={ (e) => settaskName(e.target.value)}/>
        </div>
        <button type="button" className="btn btn-primary" value="Submit" onClick={ onSubmitHandler }>Submit</button>
    </form>
  )
}

export default Form