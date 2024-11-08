import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import './BlogPost.css';

function BlogPost({ post, isFeatured = false }) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card 
      className={`blog-post ${isFeatured ? 'blog-post--featured' : ''}`}
      hover={!isFeatured}
    >
      <Link to={`/blog/${post.slug}`} className="blog-post__image-link">
        <div className="blog-post__image">
          <img src={post.image} alt={post.title} />
          {post.category && (
            <span className="blog-post__category">{post.category}</span>
          )}
          {isFeatured && (
            <span className="blog-post__featured-badge">Featured</span>
          )}
        </div>
      </Link>

      <div className="blog-post__content">
        <div className="blog-post__meta">
          <time dateTime={post.date}>{formattedDate}</time>
          <span className="blog-post__read-time">{post.readTime} min read</span>
        </div>

        <Link to={`/blog/${post.slug}`} className="blog-post__title-link">
          <h3 className="blog-post__title">{post.title}</h3>
        </Link>

        <p className="blog-post__excerpt">{post.excerpt}</p>

        <div className="blog-post__footer">
          <div className="blog-post__author">
            <img src={post.author.avatar} alt={post.author.name} />
            <span>{post.author.name}</span>
          </div>
          
          <Link to={`/blog/${post.slug}`} className="blog-post__read-more">
            Read More →
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default BlogPost; 