import React, { useEffect, useState } from 'react';

const hobbies = [
  'swimming',
  'walking my dog',
  'napping',
  'playing badminton',
  'learning KiCad',
  'drinking boba',
  'eating butter chicken',
  'waiting for my 3d print to finish',
  'at the gym',
  'building a lego set',
  'brewing my third coffee of the day'
];

const TYPING_SPEED = 60;
const DELETING_SPEED = 30;
const PAUSE = 1200;

const CurrentlyDoing: React.FC<{ align?: 'left' | 'center' }> = ({ align = 'left' }) => {
  const [current, setCurrent] = useState(0);
  const [display, setDisplay] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const fullText = hobbies[current];

    if (typing) {
      if (display.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplay(fullText.slice(0, display.length + 1));
        }, TYPING_SPEED);
      } else {
        timeout = setTimeout(() => setTyping(false), PAUSE);
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => {
          setDisplay(fullText.slice(0, display.length - 1));
        }, DELETING_SPEED);
      } else {
        timeout = setTimeout(() => {
          setCurrent((current + 1) % hobbies.length);
          setTyping(true);
        }, 400);
      }
    }
    return () => clearTimeout(timeout);
  }, [display, typing, current]);

  return (
    <div className={`min-h-[3.5rem] w-full ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <div className="font-mono text-xs tracking-[0.25em] text-gray-500 mb-1">
        RIGHT NOW I AM PROBABLY:
      </div>
      <div className="text-lg text-white h-7 font-mono">
        <span className="text-accent">&gt; </span>
        <span>{display}</span>
        <span className="animate-pulse text-accent">_</span>
      </div>
    </div>
  );
};

export default CurrentlyDoing; 