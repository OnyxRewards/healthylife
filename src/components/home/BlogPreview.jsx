import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import './BlogPreview.css';

const recentPosts = [
  {
    id: 1,
    title: "Understanding Preventive Healthcare",
    excerpt: "Learn about the importance of regular check-ups and preventive measures for maintaining good health.",
    image: "/images/blog/preventive-care.jpg",
    date: "2024-03-15",
    category: "Health Tips"
  },
  {
    id: 2,
    title: "COVID-19: Latest Updates and Guidelines",
    excerpt: "Stay informed about the latest developments and safety measures regarding COVID-19.",
    image: "/images/blog/covid-update.jpg",
    date: "2024-03-10",
    category: "News"
  },
  {
    id: 3,
    title: "Maintaining Mental Health in Modern Times",
    excerpt: "Practical tips and strategies for managing stress and maintaining mental wellness.",
    image: "/images/blog/mental-health.jpg",
    date: "2024-03-05",
    category: "Wellness"
  }
];

function BlogPreview() {
  return (
    <section className="blog-preview">
      <div className="container">
        <div className="blog-preview__header">
          <div>
            <h2 className="blog-preview__title">Latest Health Insights</h2>
            <p className="blog-preview__subtitle">
              Stay informed with our latest articles and health tips
            </p>
          </div>
          <Link to="/blog">
            <Button variant="outline">View All Posts</Button>
          </Link>
        </div>

        <div className="blog-preview__grid">
          {recentPosts.map(post => (
            <Card key={post.id} className="blog-post" hover={true}>
              <div className="blog-post__image">
                <img src={post.image} alt={post.title} />
                <span className="blog-post__category">{post.category}</span>
              </div>
              <div className="blog-post__content">
                <time className="blog-post__date">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
                <h3 className="blog-post__title">{post.title}</h3>
                <p className="blog-post__excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="blog-post__link">
                  Read More →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogPreview; 