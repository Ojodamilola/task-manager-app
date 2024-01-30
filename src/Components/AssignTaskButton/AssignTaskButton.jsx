
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const AssignTaskButton = ({ taskId, assignedUserId }) => {
  const handleAssignTask = async () => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, { assignedUserId });
    } catch (error) {
      console.error('Error assigning task:', error);
    }
  };

  return (
    <p onClick={handleAssignTask}>Assign Task</p>
  );
};

export default AssignTaskButton;
