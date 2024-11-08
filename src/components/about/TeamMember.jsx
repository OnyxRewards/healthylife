import { useState } from 'react';
import './TeamMember.css';

function TeamMember({ member }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="team-member">
      <div className="team-member__image-container">
        <img 
          src={member.image} 
          alt={member.name} 
          className="team-member__image" 
        />
        <div className="team-member__social">
          {member.social.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="team-member__social-link"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="team-member__info">
        <h3 className="team-member__name">{member.name}</h3>
        <p className="team-member__role">{member.role}</p>
        
        <div className={`team-member__bio ${isExpanded ? 'team-member__bio--expanded' : ''}`}>
          <p>{member.bio}</p>
        </div>

        <button 
          className="team-member__expand"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>

        <div className="team-member__specialties">
          {member.specialties.map((specialty, index) => (
            <span key={index} className="team-member__specialty">
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamMember; 