import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../Assets/Styles/comment.css';
import Swal from 'sweetalert2';

function CommentSection(props) {
  const [comments, setComments] = useState([]);
  const [newCommentBody, setNewCommentBody] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await axios.get(`/api/components/${props.componentId}/comments`);
    setComments(response.data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/api/components/${props.componentId}/comments`, {
        body: newCommentBody,
      });
      setComments([...comments, response.data.comment]);
      setNewCommentBody('');
      Swal.fire({
        title: 'Success!',
        text: 'Your comment has been added.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again .',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="comment-section">
      <h2>Comments:</h2>
      <ul className="comment-list">
        {comments.map(comment => (
          <li key={comment.id}>{comment.body} - {comment.user.name}</li>
        ))}
      </ul>
      <form className="comment-form" onSubmit={handleSubmit}>
        <label htmlFor="comment">Add Comment:</label>
        <textarea id="comment" name="comment" value={newCommentBody} onChange={(e) => setNewCommentBody(e.target.value)}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CommentSection;
