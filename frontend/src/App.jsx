import { Routes, Route, Link } from 'react-router-dom'
import './styles/App.css'
import TodoPage from './pages/TodoPage'

// Page components
function Home() {
  return (
    <div className="page">
      <h1>Home Page</h1>
      <p>Welcome to the FWDays homework project!</p>
    </div>
  )
}

function About() {
  return (
    <div className="page">
      <h1>About</h1>
      <p>This is a React application built with Vite and deployed on AWS.</p>
    </div>
  )
}

function Projects() {
  return (
    <div className="page">
      <h1>Projects</h1>
      <p>Check out our latest FWDays homework assignments.</p>
    </div>
  )
}

function Contact() {
  return (
    <div className="page">
      <h1>Contact</h1>
      <p>Get in touch with the FWDays team.</p>
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <Link to="/" className="nav-logo">FWDays</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/todo">Todo</Link>
        </div>
      </nav>
      
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/todo" element={<TodoPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App