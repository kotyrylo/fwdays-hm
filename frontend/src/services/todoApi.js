class MockTodoApi {
  constructor() {
    this.todos = [
      { id: 1, text: 'Learn React', completed: true },
      { id: 2, text: 'Build Todo App', completed: false },
      { id: 3, text: 'Deploy to production', completed: false }
    ]
    this.nextId = 4
  }

  async getTodos() {
    return [...this.todos]
  }

  async createTodo(todoData) {
    const newTodo = {
      id: this.nextId++,
      ...todoData
    }
    this.todos.push(newTodo)
    return newTodo
  }

  async updateTodo(id, updates) {
    const todoIndex = this.todos.findIndex(todo => todo.id === id)
    if (todoIndex === -1) {
      throw new Error('Todo not found')
    }
    this.todos[todoIndex] = { ...this.todos[todoIndex], ...updates }
    return this.todos[todoIndex]
  }

  async deleteTodo(id) {
    const todoIndex = this.todos.findIndex(todo => todo.id === id)
    if (todoIndex === -1) {
      throw new Error('Todo not found')
    }
    this.todos.splice(todoIndex, 1)
    return { success: true }
  }
}

const API_BASE_URL = 'https://ssmt374mw3.execute-api.eu-west-1.amazonaws.com/prod'

const mockApi = new MockTodoApi()

// Try to use real API first, fallback to mock if it fails
const fetchWithFallback = async (url, options = {}) => {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response
  } catch (error) {
    console.warn('Real API failed, using mock API:', error.message)
    // Return mock response
    return new Response(JSON.stringify(await getMockResponse(url, options)), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

const getMockResponse = async (url, options) => {
  const method = options.method || 'GET'
  const todoId = url.split('/').pop()
  
  switch (method) {
    case 'GET':
      return await mockApi.getTodos()
    case 'POST':
      const newTodo = JSON.parse(options.body)
      return await mockApi.createTodo(newTodo)
    case 'PUT':
      const updates = JSON.parse(options.body)
      return await mockApi.updateTodo(parseInt(todoId), updates)
    case 'DELETE':
      await mockApi.deleteTodo(parseInt(todoId))
      return { success: true }
    default:
      throw new Error('Method not supported')
  }
}

export const todoApi = {
  get: () => fetchWithFallback(`${API_BASE_URL}/todos`),
  create: (todo) => fetchWithFallback(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  }),
  update: (id, updates) => fetchWithFallback(`${API_BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  }),
  delete: (id) => fetchWithFallback(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE'
  })
}
