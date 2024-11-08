import { useState } from 'react';
import Button from '../common/Button';
import './Comments.css';

function Comments({ comments: initialComments, postId }) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const comment = {
      id: Date.now(),
      content: newComment,
      author: {
        name: 'Guest User',
        avatar: '/images/avatars/default.jpg'
      },
      date: new Date().toISOString(),
      likes: 0
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setIsSubmitting(false);
  };

  const handleLike = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  return (
    <section className="comments">
      <h3 className="comments__title">Comments ({comments.length})</h3>

      <form className="comments__form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Share your thoughts..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <Button 
          type="submit" 
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </form>

      <div className="comments__list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment__avatar">
              <img src={comment.author.avatar} alt={comment.author.name} />
            </div>
            <div className="comment__content">
              <div className="comment__header">
                <span className="comment__author">{comment.author.name}</span>
                <time className="comment__date">
                  {new Date(comment.date).toLocaleDateString()}
                </time>
              </div>
              <p className="comment__text">{comment.content}</p>
              <button 
                className="comment__like"
                onClick={() => handleLike(comment.id)}
              >
                ❤️ {comment.likes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Comments; 