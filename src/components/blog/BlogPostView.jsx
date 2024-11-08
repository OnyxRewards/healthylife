import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import ShareButtons from './ShareButtons';
import './BlogPostView.css';

function BlogPostView({ post }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="blog-post-view">
      <header className="blog-post-view__header">
        <div className="blog-post-view__meta">
          <Link to={`/blog/category/${post.category.toLowerCase()}`} className="blog-post-view__category">
            {post.category}
          </Link>
          <time dateTime={post.date}>{formattedDate}</time>
          <span className="blog-post-view__read-time">{post.readTime} min read</span>
        </div>

        <h1 className="blog-post-view__title">{post.title}</h1>
        
        <div className="blog-post-view__author">
          <img src={post.author.avatar} alt={post.author.name} />
          <div className="blog-post-view__author-info">
            <span className="blog-post-view__author-name">{post.author.name}</span>
            <span className="blog-post-view__author-role">{post.author.role}</span>
          </div>
        </div>
      </header>

      <div className="blog-post-view__hero">
        <img src={post.image} alt={post.title} />
      </div>

      <div className="blog-post-view__content" dangerouslySetInnerHTML={{ __html: post.content }} />

      <footer className="blog-post-view__footer">
        <div className="blog-post-view__tags">
          {post.tags.map(tag => (
            <Link key={tag} to={`/blog/tag/${tag.toLowerCase()}`} className="blog-post-view__tag">
              #{tag}
            </Link>
          ))}
        </div>

        <ShareButtons url={window.location.href} title={post.title} />
      </footer>
    </article>
  );
}

export default BlogPostView; 