import React, {useState} from "react";
import { Form, Button,  } from "react-bootstrap";

import './TaskInput.css';

const TaskInput = ({handleSubmitTask, handleUpdateTask, editingTask}) => {
   const [newTask, setNewTask] = useState({
      title: "",
      description: "",
      dueDate: "",
    });


  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedDueDate, setUpdatedDueDate] = useState("");
  const [updatedCompleted, setUpdatedCompleted] = useState(false);


  return (
    <div className="taskInputStyle" >
      <h3 className="h3">Add Task</h3>
      <Form onSubmit={handleSubmitTask}>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <Form.Label>Description:</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          required
        />
        <Form.Label>Due Date:</Form.Label>
        <Form.Control
          type="datetime-local"
          name="dueDate"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          required
        />
        <Button type="submit" className="mt-3 w-100 Btn">Add Task</Button>
      </Form>
      {/**
      <div>
        <Form.Label>Filter Completed:</Form.Label>
        <Form.Check
          type="checkbox"
          checked={filterCompleted}
          onChange={() => setFilterCompleted(!filterCompleted)}
        />
      </div>
       Task editing */}
      {editingTask && (
        <div>
         <Form>
          {/* Render an edit form or modal here */}
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <Form.Label>Due Date:</Form.Label>
          <Form.Control
            type="datetime-local"
            value={updatedDueDate}
            onChange={(e) => setUpdatedDueDate(e.target.value)}
          />
          <Form.Label>Completed:</Form.Label>
          <Form.Check
            type="checkbox"
            checked={updatedCompleted}
            onChange={() => setUpdatedCompleted(!updatedCompleted)}
          />
          <Button onClick={handleUpdateTask}>Update Task </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default TaskInput;
