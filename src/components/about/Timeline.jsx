import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Timeline.css';

gsap.registerPlugin(ScrollTrigger);

function Timeline({ events }) {
  const timelineRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    const items = timeline.querySelectorAll('.timeline__item');

    items.forEach((item, index) => {
      gsap.from(item, {
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        duration: 1,
        scrollTrigger: {
          trigger: item,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, []);

  return (
    <div className="timeline" ref={timelineRef}>
      {events.map((event, index) => (
        <div 
          key={index} 
          className={`timeline__item ${
            index % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'
          }`}
        >
          <div className="timeline__content">
            <div className="timeline__date">{event.year}</div>
            <h3 className="timeline__title">{event.title}</h3>
            <p className="timeline__description">{event.description}</p>
            {event.image && (
              <img 
                src={event.image} 
                alt={event.title} 
                className="timeline__image" 
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline; 