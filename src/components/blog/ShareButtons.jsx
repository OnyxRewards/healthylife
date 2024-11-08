import './ShareButtons.css';

function ShareButtons({ url, title }) {
  const shareLinks = [
    {
      name: 'Twitter',
      icon: '𝕏',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'Facebook',
      icon: 'f',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      name: 'LinkedIn',
      icon: 'in',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
    }
  ];

  return (
    <div className="share-buttons">
      <span className="share-buttons__label">Share:</span>
      {shareLinks.map(link => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="share-button"
          aria-label={`Share on ${link.name}`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}

export default ShareButtons; 