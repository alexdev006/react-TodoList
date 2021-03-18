import React, { useState, useEffect } from 'react'
import './App.css'
import Form from './components/Form'
import TodoList from './components/TodoList'

const App = () => {

    const [inputText, setInputText] = useState("")
    const [todos, setTodos] = useState([])
    const [status, setStatus] = useState('all')
    const [filteredTodos, setFilteredTodos] = useState([])

    const filterHandler = () => {
        switch(status){
            case 'completed':
                setFilteredTodos(todos.filter((todo) => todo.completed === true ))
                break;
            case 'uncompleted':
                setFilteredTodos(todos.filter((todo) => todo.completed === false))
                break
            default :
            setFilteredTodos(todos)
                break
            }
    }

    useEffect(() => {
       getLocalTodos()
    }, [])

    useEffect(() => {
      filterHandler()
      saveLocalTodos()
      
    }, [todos, status])

    //save in local storage
    const saveLocalTodos = () => {
        if(localStorage.getItem('todos') === null){
            localStorage.setItem('todos', JSON.stringify([]))
        } else {
            localStorage.setItem('todos', JSON.stringify(todos))
        }
    }
    const getLocalTodos = () => {
        if(localStorage.getItem('todos') === null){
            localStorage.setItem('todos',  JSON.stringify([]))
        } else {
          let todoLocal = JSON.parse(localStorage.getItem('todos'))
          setTodos(todoLocal)
        }
    }

    return (
        <div>
            <h1>React Todo List</h1>
            <Form 
            setStatus={setStatus} 
            inputText={inputText} 
            todos={todos} 
            setTodos={setTodos} 
            setInputText={setInputText}
            />
            <TodoList 
            todos={todos} 
            setTodos={setTodos} 
            filteredTodos={filteredTodos}

            />
        </div>
    )
}

export default App
