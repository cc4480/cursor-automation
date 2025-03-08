import React, { useState } from 'react';
import './WorkflowBuilder.css';

const WorkflowBuilder = () => {
  const [workflow, setWorkflow] = useState({
    name: '',
    trigger: null,
    actions: [],
    conditions: []
  });

  const handleTriggerSelect = (trigger) => {
    setWorkflow(prev => ({ ...prev, trigger }));
  };

  const handleAddAction = (action) => {
    setWorkflow(prev => ({ ...prev, actions: [...prev.actions, action] }));
  };

  const handleAddCondition = (condition) => {
    setWorkflow(prev => ({ ...prev, conditions: [...prev.conditions, condition] }));
  };

  return (
    <div className="workflow-builder">
      <h2>Workflow Builder</h2>
      
      <div className="workflow-section">
        <h3>Workflow Name</h3>
        <input
          type="text"
          value={workflow.name}
          onChange={(e) => setWorkflow(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter workflow name"
        />
      </div>

      <div className="workflow-section">
        <h3>Trigger</h3>
        <div className="trigger-options">
          <button onClick={() => handleTriggerSelect('schedule')}>Schedule</button>
          <button onClick={() => handleTriggerSelect('event')}>Event</button>
          <button onClick={() => handleTriggerSelect('api')}>API Call</button>
        </div>
      </div>

      <div className="workflow-section">
        <h3>Actions</h3>
        <div className="action-options">
          <button onClick={() => handleAddAction({ type: 'send_email' })}>Send Email</button>
          <button onClick={() => handleAddAction({ type: 'api_call' })}>API Call</button>
          <button onClick={() => handleAddAction({ type: 'data_process' })}>Process Data</button>
        </div>
      </div>

      <div className="workflow-section">
        <h3>Conditions</h3>
        <div className="condition-options">
          <button onClick={() => handleAddCondition({ type: 'if' })}>If</button>
          <button onClick={() => handleAddCondition({ type: 'else' })}>Else</button>
          <button onClick={() => handleAddCondition({ type: 'loop' })}>Loop</button>
        </div>
      </div>

      <div className="workflow-preview">
        <h3>Workflow Preview</h3>
        <pre>{JSON.stringify(workflow, null, 2)}</pre>
      </div>
    </div>
  );
};

export default WorkflowBuilder; 