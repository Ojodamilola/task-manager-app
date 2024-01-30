import React, { useState } from "react";
import { Form, Button, Card, Alert, Row, Col } from "react-bootstrap";
import TaskComments from "../TaskComment/TaskComment";
import AssignTaskButton from "../AssignTaskButton/AssignTaskButton";
import { Timestamp } from "firebase/firestore";
import "./TaskList.css";
import { ArrowDown, ChevronDown, ChevronUp } from 'react-bootstrap-icons';

const TaskList = ({
  tasks,
  handleDeleteTask,
  handleToggleCompletion,
  handleEditTask,
  loading,
}) => {
  const [taskInfo, setTaskInfo] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const [filterCompleted, setFilterCompleted] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleTaskInfo = (taskId) => {
    setSelectedTaskId((prevId) => (prevId === taskId ? null : taskId));
    setTaskInfo(true);
    setShowComment(false);
  };
  const showCommentsForTask = (taskId) => {
    // Toggle selected task
    setSelectedTaskId((prevId) => (prevId === taskId ? null : taskId));
    setTaskInfo(false);
    setShowComment(true);
    console.log(taskId);
  };

  return (
    <div className="taskListStyle">
      <h1>Tasks to do</h1>
      <div>
        <Form.Label>Filter Completed:</Form.Label>
        <Form.Check
          type="checkbox"
          checked={filterCompleted}
          onChange={() => setFilterCompleted(!filterCompleted)}
        />
      </div>
      {loading ? (
        "Loading Tasks..."
      ) : (
        <div>
          <div class="row justify-content-center align-items-center g-2 taskListDiv">
            {tasks.map((task) => (
              <Col key={task.id} className="col-12">
                <div className="taskDiv  ">
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <p>
                    Due Date:{" "}
                    {task.dueDate instanceof Timestamp
                      ? task.dueDate.toDate().toLocaleString()
                      : new Date(task.dueDate).toLocaleString()}{" "}
                  </p>
                  <span className="d-flex g-3">
                    Completed: {task.completed ? "yes" : "No"}
                    {/**<Form.Check
                    type="checkbox"
                    checked={task.completed ? 'yes' : 'No'}
                    onChange={() =>
                      handleToggleCompletion(task.id, task.completed)
                    }
                  /> */}
                  </span>

                  <div>
                    {showComment && selectedTaskId === task.id && (
                      <TaskComments taskId={task.id} />
                    )}
                    {/* 
                    {showComment ? <TaskComments taskId={task.id} closeComment={closeComment} selectedTaskId={selectedTaskId} /> : <Button onClick={showCommentsForTask}>Comments</Button> } */}

                    <Button
                      onClick={() => showCommentsForTask(task.id)}
                      className="Btn w-100 mt-3"
                    >
                      {" "}
                      {showComment && selectedTaskId === task.id
                        ? "Close"
                        : "Comments"}
                    </Button>
                  </div>

                  {/** Task Info */}
                  <p
                    className="taskInfo"
                    onClick={() => handleTaskInfo(task.id)}
                  >
                    { taskInfo && selectedTaskId === task.id ? <ChevronUp /> : <ChevronDown />}
                  </p>
                  { taskInfo && selectedTaskId === task.id && (
                    <div className="taskInfoDiv">
                      <p onClick={() => handleDeleteTask(task.id)}> Delete </p>
                      <p onClick={() => handleEditTask(task)}>Edit</p>
                      {task.assignedUserId ? (
                        <p>Assigned to: {task.assignedUserId}</p>
                      ) : (
                        <AssignTaskButton taskId={task.id} />
                      )}
                    </div>
                  )}
                </div>
              </Col>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
