import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { Form, Button, Card, Container } from "react-bootstrap";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import "./NewTaskForm.css";
import TaskList from "../TaskList/TaskList";

const NewTaskForm = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [completion, setCompletion] = useState(false);

  const [tasks, setTasks] = useState([]);
  const tasksCollectionRef = collection(db, "tasks");

  

  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await getDocs(tasksCollectionRef);
        const tasksData = data.docs.map((doc) => doc.data());
        setTasks(tasksData);
        // setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      } catch (error) {
        console.error("Error Fetching tasks");
        setLoading(false);
      }
    };

    getTasks();
  }, [tasksCollectionRef]);
  
  const [newTask, setNewTask] = useState({
   title: "",
   description: "",
 });
  const createNewTask = async () => {
   try {
     const docRef = await addDoc(tasksCollectionRef, newTask);
     console.log("task with id:", docRef.id);
     setTasks([...tasks, newTask]);

     //clear form
     setNewTask({
       title: "",
       description: "",
     });
   } catch (error) {
     console.error("error adding task", error);
   }
 };
const handleInputChange = (e) => {
   const {name, value} = e.target;
   setNewTask((prevTask) =>({
      ...prevTask,
      [name]: value,
   }))
}
  return (
    <>
      <Card>
        <Card.Body>
          <Form onSubmit={createNewTask}>
            <Form.Group id="title">
              <Form.Label> Add Task </Form.Label>
              <Form.Control
                type="text"
                onChange={handleInputChange}
                value={newTask.title}
                required
              />
            </Form.Group>
            {/** <Form.Group id="dueDate">
              <Form.Label> Due Date </Form.Label>
              <Form.Control
                type="Date"
                onChange={(e) => setDueDate(e.target.value)}
                value={dueDate}
                required
              />
            </Form.Group> */}

            <Form.Group id="description">
              <Form.Label> Due Date </Form.Label>
              <Form.Control
                as="textArea"
                rows={5}
                onChange={handleInputChange}
                value={newTask.description}
                placeholder="Describe Task"
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100">
              {" "}
              Add Task
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <p> {loading ? "loading Tasks..." : " "}</p>
      {tasks.map((task) => (
        <div>
          <h1>{task.taskTitle}</h1>
          <p>{task.description}</p>
        </div>
      ))}
    </>
  );
};

export default NewTaskForm;
