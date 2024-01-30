import React, { useState, useEffect } from "react";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase"; // Import your Firestore configuration
import { format } from "date-fns";
import AssignTaskButton from "./AssignTaskButton/AssignTaskButton";
import TaskComments from "./TaskComment/TaskComment";
import TaskList from "./TaskList/TaskList";
import TaskInput from "./TaskInput/TaskInput";

import { Container, Row, Col } from "react-bootstrap";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [filterCompleted, setFilterCompleted] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const tasksCollectionRef = collection(db, "tasks");

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedDueDate, setUpdatedDueDate] = useState("");
  const [updatedCompleted, setUpdatedCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksQuery = filterCompleted
        ? query(tasksCollectionRef, where("completed", "==", false))
        : tasksCollectionRef;

      const unsubscribe = onSnapshot(tasksQuery, (querySnapshot) => {
        const tasksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false);
        setTasks(tasksData);
      });

      return unsubscribe;
    };

    fetchTasks();
  }, [tasksCollectionRef, filterCompleted]);

  const handleSubmitTask = async (e) => {
    e.preventDefault();

    try {
      const dueDateTimestamp =
        newTask.dueDate instanceof Timestamp
          ? newTask.dueDate
          : Timestamp.fromDate(new Date(newTask.dueDate));
      // Add the new task to Firestore
      await addDoc(tasksCollectionRef, {
        ...newTask,
        dueDate: dueDateTimestamp,
        completed: false,
      });

      // Clear the form
      setNewTask({ title: "", description: "", dueDate: "" });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setUpdatedDueDate(format(task.dueDate.toDate(), "yyyy-MM-dd'T'HH:mm")); // Assuming dueDate is a Firestore Timestamp
    setUpdatedCompleted(task.completed);
  };

  const handleUpdateTask = async () => {
    if (!editingTask || !editingTask.id) {
      console.error("invalid editingTask", editingTask);
      return;
    }

    try {
      const taskRef = collection(db, "tasks", editingTask.id);
      // Convert the updatedDueDate to a Firestore Timestamp
      const dueDateTimestamp = updatedDueDate
        ? Timestamp.fromDate(new Date(updatedDueDate))
        : null;

      await updateDoc(taskRef, {
        title: updatedTitle,
        description: updatedDescription,
        dueDate: dueDateTimestamp,
        completed: updatedCompleted,
      });

      // Fetch the updated task from Firestore
      const updatedTaskSnapshot = await getDoc(taskRef);
      const updatedTask = {
        id: updatedTaskSnapshot.id,
        ...updatedTaskSnapshot.data(),
      };

      // Update the tasks state with the modified task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );

      // Clear the editing state
      setEditingTask(null);
      // Reset the updated fields
      setUpdatedTitle("");
      setUpdatedDescription("");
      setUpdatedDueDate("");
      setUpdatedCompleted(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      // Delete the task from Firestore
      const taskRef = collection(db, "tasks", taskId);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleCompletion = (taskId, completed) => {
    const updatedTask = { completed: !completed };
    handleUpdateTask(taskId, updatedTask);
  };

  return (
    <div className="container-fluid">
      <div>
      <Container className="pt-5">
        <Row className="align-content-center justify-content-center g-2">
          <Col className="col-lg-6">
            <div>
              <TaskInput
                handleSubmitTask={handleSubmitTask}
                handleUpdateTask={handleUpdateTask}
              />
            </div>
          </Col>
          <Col className="col-lg-6">
            <div>
              <TaskList
                tasks={tasks}
                handleDeleteTask={handleDeleteTask}
                handleToggleCompletion={handleToggleCompletion}
                handleEditTask={handleEditTask}
                loading={loading}
              />
            </div>
          </Col>
        </Row>
      </Container>
      </div>
      
    </div>
  );
};

export default TaskManager;
