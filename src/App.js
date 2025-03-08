import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WorkflowBuilder from './components/WorkflowBuilder/WorkflowBuilder';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>AI Agent Platform</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/workflow-builder">Workflow Builder</Link>
            <Link to="/agent-training">Agent Training</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<div>Welcome to the AI Agent Platform</div>} />
            <Route path="/workflow-builder" element={<WorkflowBuilder />} />
            <Route path="/agent-training" element={<div>Agent Training Module (Coming Soon)</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 