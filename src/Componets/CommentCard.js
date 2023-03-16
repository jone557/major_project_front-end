import React from 'react';
import './../Assets/Styles/card.css';

const CommentCard = ({ data }) => {
    const { username, comment } = data;
  
    return (
      <div className="comment-card">
        <h3>{username}</h3>
        <p>{comment}</p>
      </div>
    );
  };
  export default CommentCard;
  