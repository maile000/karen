import React, { useState, useRef, useEffect } from 'react';
import "./Style/Landing.css";
import KreuzWort from "../Assets/KreuzWort.svg";
import Laptop from "../Assets/laptop.jpg";
import Pin from "../Assets/pin.webp";
import Hand from "../Assets/hand.webp";
import Rakete from "../Assets/rakete.webp";

const buttonData = [
    { label: Pin , activeLabel: 'Behalte alle Projekte im Blick – ohne Multitasking-Wahnsinn. '},
    { label: Hand, activeLabel: 'Prüfungen, Hausarbeiten, Nebenjob – organisiert durchs Chaos.' },
    { label: Rakete, activeLabel: 'Analysiere deine Produktivität & belohne dich. Motivation made easy.' },
  ];


function Landing () {
    const [activeButton, setActiveButton] = useState(null);
    const containerRef = useRef(null);
    const sectionRefs = useRef([]);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.2 }
      );

      sectionRefs.current.forEach((el) => el && observer.observe(el));

      return () => {
        sectionRefs.current.forEach((el) => el && observer.unobserve(el));
      };
    }, []);

  
    const handleClick = (index) => {
      setActiveButton(index === activeButton ? null : index);
    };
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
          setActiveButton(null);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
        <div className="landing">

            <div className='landing-block2'>
              <div className='landing-block2-img' style={{ backgroundImage: `url(${Laptop}) `}}>
                <h1 className='landing-block2-header'> TASK <br/> MANAGER</h1>
              </div> 
            </div>
            <div className="landing-block3 fade-in"
            ref={(el) => (sectionRefs.current[2] = el)} >
                {buttonData.map((btn, index) => (
                    <button
                    ref={containerRef}
                    key={index}
                    className={`
                        landing-block3-div
                        ${activeButton === index ? 'active' : ''}
                        ${activeButton !== null && activeButton !== index ? 'shrink' : ''}
                    `}
                    onClick={() => handleClick(index)}
                    >
                    {activeButton === index ? (
                      <span>{btn.activeLabel}</span>
                    ) : (
                      <img src={btn.label} alt={`Icon ${index}`} className="webp-icon" />
                    )}
                    </button>
                ))}
            </div>
            <div className="landing-block-text fade-in"
            ref={(el) => (sectionRefs.current[3] = el)} >
              <h1>
                Mit denem Task Manager behältst du endlich den Überblick über deine Aufgaben, Projekte und Ziele – ohne Chaos, verpasste Deadlines oder überfüllte To-Do-Listen.
              </h1> 
          </div>
        </div>
    );
};

export default Landing;