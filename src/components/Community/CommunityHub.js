import React, { useState } from 'react';
import './CommunityHub.css';

const CommunityHub = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', image: null });

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const post = {
      id: Date.now(),
      ...newPost,
      author: 'Current User',
      date: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', image: null });
  };

  return (
    <div className="community-container">
      <div className="community-header">
        <h1>Community Hub</h1>
        <button className="new-post-button">Create Post</button>
      </div>

      <div className="posts-grid">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            {post.image && (
              <img src={post.image} alt="" className="post-image" />
            )}
            <div className="post-content">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div className="post-meta">
                <span>{post.author}</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="post-actions">
                <button className="like-button">
                  ❤️ {post.likes}
                </button>
                <button className="comment-button">
                  💬 {post.comments.length}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityHub;