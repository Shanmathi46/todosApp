import { useState } from "react";
import { useReducer } from "react";
import './app.scss'
const ACTIONS={
ADD_TODO:'add-todo',
DELETE_TODO:'delete-todo',
TOGGLE_TODO:'toggle-todo'
};

function reducer(todos,action){
switch(action.type){
  case ACTIONS.ADD_TODO:
    return [...todos,newTodo(action.payload.name)]
  case ACTIONS.DELETE_TODO:
    return todos.filter((todo)=>{return todo.id!==action.payload.id})
  case ACTIONS.TOGGLE_TODO:
    return todos.map((todo)=>{
      if(todo.id===action.payload.id){
        return {...todo,isCompleted:!todo.isCompleted}
      }
      return todo
    }) 
    
  default:
    return todos
}
}

function newTodo(name){
  return {
      id:new Date(),
      name:name,
      isCompleted:false

  }
}

function App() {
  const [todos,dispatch]=useReducer(reducer,[])
  const [name,setName]=useState('')

  return (
    <div className="app">
       <form onSubmit={(e)=>{
        e.preventDefault()
        dispatch({type:ACTIONS.ADD_TODO,payload:{name:name}})
        setName('')
       }}>
        <h2>What is on your Mind?</h2>
        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
       </form>
       <ul>
       {todos.map((todo)=>{
        return(
          <li>
           <span style={{color:todo.isCompleted?'#AAA':'#000'}}>{todo.name}</span>
           <div className="left">
              <button onClick={()=>{dispatch({type:ACTIONS.TOGGLE_TODO,payload:{id:todo.id}})}}>Toggle</button>
              <button onClick={()=>{dispatch({type:ACTIONS.DELETE_TODO,payload:{id:todo.id}})}}>Delete</button>
            </div> 
          </li>
        )
       })}
       </ul>
    </div>
  );
}

export default App;
