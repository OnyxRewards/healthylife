import { useState, useEffect } from 'react';
import SearchBar from '../components/common/SearchBar';
import BlogPost from '../components/blog/BlogPost';
import Button from '../components/common/Button';
import './Blog.css';

const categories = [
  'All',
  'Health Tips',
  'Medical News',
  'Wellness',
  'Nutrition',
  'Mental Health'
];

const blogPosts = [
  {
    id: 1,
    title: "Understanding the Importance of Preventive Healthcare",
    slug: "understanding-preventive-healthcare",
    excerpt: "Learn why preventive healthcare is crucial for maintaining long-term health and well-being...",
    content: "Full article content here...",
    image: "/images/blog/preventive-care.jpg",
    category: "Health Tips",
    date: "2024-03-15",
    readTime: 5,
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "/images/authors/sarah.jpg"
    },
    featured: true
  },
  // Add more blog posts...
];

function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const filtered = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
        return matchesSearch && matchesCategory;
      });
      setFilteredPosts(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, activeCategory]);

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="blog">
      <div className="container">
        <div className="blog__header">
          <h1>Health & Wellness Blog</h1>
          <p>Stay informed with the latest health tips and medical insights</p>

          <SearchBar 
            onSearch={setSearchTerm}
            placeholder="Search articles..."
          />

          <div className="blog__categories">
            {categories.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? 'primary' : 'outline'}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="blog__loading">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {featuredPosts.length > 0 && (
              <div className="blog__featured">
                {featuredPosts.map(post => (
                  <BlogPost 
                    key={post.id} 
                    post={post} 
                    isFeatured={true}
                  />
                ))}
              </div>
            )}

            <div className="blog__grid">
              {regularPosts.map(post => (
                <BlogPost key={post.id} post={post} />
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="blog__empty">
                <h3>No articles found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Blog; 