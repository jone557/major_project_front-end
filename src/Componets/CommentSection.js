import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../Assets/Styles/comment.css';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import CommentCard from '../Componets/CommentCard';
import { useSelector, useDispatch } from 'react-redux'

function CommentSection(props) {
  const [comments, setComments] = useState([]);
  const [newCommentBody, setNewCommentBody] = useState('');
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth)

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/comments/add`, {
        user_id: user.id,
        body: newCommentBody,
        component_id: id,
      });
      setNewCommentBody('');
      console.log(response.data);
      if (response) {
        Swal.fire({
          title: 'Success!',
          text: 'Your comment has been added.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
        
        fetchComments();
      }
    } catch (error) {
      console.log(error.response);
      Swal.fire({
        title: 'Error!',
        text: 'Please Login to comment',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/comments/${id}`);
      console.log(response.data)
      if (response) {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [id]);

  return (
    <div className="comment-section-container">
      <div className="comment-form-container">
        <form className="comment-form" onSubmit={handleSubmit}>
          <label htmlFor="comment">Add Comment:</label>
          <textarea
            id="comment"
            name="body"
            value={newCommentBody}
            onChange={(e) => setNewCommentBody(e.target.value)}
          ></textarea>
          <div className="comment-form-actions">
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
      <div className="comment-list">
        <h2 className='comments-heading'>Comments:</h2>
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id}>
              <CommentCard {...comment} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CommentSection;
