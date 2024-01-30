// Example: TaskComments.jsx
import { useState, useEffect } from 'react';
import { collection, addDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { Button } from "react-bootstrap";

const TaskComments = ({ taskId, }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const commentsCollectionRef = collection(db, 'tasks', taskId, 'comments');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
   console.log('correctly triigered')
   // Subscribe to the Firestore collection when the component mounts
   
   const commentsQuery = query(commentsCollectionRef);

   const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
     const updatedComments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data().text }));
     setComments(updatedComments);
     console.log('Updated Comments:', updatedComments);
     
    setComments(updatedComments);
    setLoading(false);
    
   });

   // Unsubscribe when the component unmounts
   return () => unsubscribe();
 }, [taskId]); 

 

  // Add a comment
  const addComment = async (text) => {
    try {
      if (newComment.trim() !== '') {
         const newCommentRef = await addDoc(commentsCollectionRef, { text: { content: newComment }, userId: 'currentUserId' });
         console.log('Comment added with ID:', newCommentRef.id);
         setNewComment(''); // Clear the textarea after adding a comment
       }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      { //loading ? 'Loading Comments' :
      <div className='taskComment'>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <textarea className='w-100' placeholder="Add a comment" value={newComment}
        onChange={(e) => setNewComment(e.target.value)}  />
      <Button className='w-100 Btn' onClick={addComment}>Add Comment</Button>
      
        
    </div>}
    </div>
    
        
  );
};

export default TaskComments;
