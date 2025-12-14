import { useState, useEffect } from 'react'
import './TodoPage.css'
import { todoApi } from '../services/todoApi'

function TodoPage() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await todoApi.get()
      const data = await response.json()
      setTodos(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Create a new todo
  const createTodo = async (text) => {
    try {
      const response = await todoApi.create({ text, completed: false })
      const newTodo = await response.json()
      setTodos([...todos, newTodo])
      setInputValue('')
    } catch (err) {
      setError(err.message)
    }
  }

  // Update a todo
  const updateTodo = async (id, updates) => {
    try {
      const response = await todoApi.update(id, updates)
      const updatedTodo = await response.json()
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo))
    } catch (err) {
      setError(err.message)
    }
  }

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await todoApi.delete(id)
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  // Toggle todo completion
  const toggleComplete = (id) => {
    const todo = todos.find(t => t.id === id)
    if (todo) {
      updateTodo(id, { completed: !todo.completed })
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      createTodo(inputValue.trim())
    }
  }

  // Handle edit submission
  const handleEditSubmit = (e, id) => {
    e.preventDefault()
    if (editingText.trim()) {
      updateTodo(id, { text: editingText.trim() })
      setEditingId(null)
      setEditingText('')
    }
  }

  // Start editing
  const startEditing = (id, text) => {
    setEditingId(id)
    setEditingText(text)
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null)
    setEditingText('')
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  if (loading) return <div className="page">Loading...</div>
  if (error) return <div className="page">Error: {error}</div>

  return (
    <div className="page todo-page">
      <h1>Todo List</h1>
      
      {/* Add new todo form */}
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button type="submit" className="todo-button">Add Todo</button>
      </form>

      {/* Error display */}
      {error && <div className="error-message">{error}</div>}

      {/* Todo list */}
      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-message">No todos yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              {editingId === todo.id ? (
                <form onSubmit={(e) => handleEditSubmit(e, todo.id)} className="edit-form">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="todo-input edit-input"
                  />
                  <button type="submit" className="todo-button save-button">Save</button>
                  <button type="button" onClick={cancelEditing} className="todo-button cancel-button">Cancel</button>
                </form>
              ) : (
                <>
                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                      className="todo-checkbox"
                    />
                    <span className="todo-text">{todo.text}</span>
                  </div>
                  <div className="todo-actions">
                    <button
                      onClick={() => startEditing(todo.id, todo.text)}
                      className="action-button edit-button"
                      disabled={todo.completed}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="action-button delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Statistics */}
      {todos.length > 0 && (
        <div className="todo-stats">
          <p>
            Total: {todos.length} | 
            Completed: {todos.filter(t => t.completed).length} | 
            Pending: {todos.filter(t => !t.completed).length}
          </p>
        </div>
      )}
    </div>
  )
}

export default TodoPage
