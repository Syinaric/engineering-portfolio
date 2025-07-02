import React, { useEffect, useState } from 'react';

const hobbies = [
  'swimming in my pool',
  'walking my dog',
  'napping',
  'playing badminton',
  'learning KiCad',
  'unclogging my 3D printer',
  "ripping my hair out because my code won't compile",
  'brewing my third coffee of the day.'
];

const TYPING_SPEED = 60;
const DELETING_SPEED = 30;
const PAUSE = 1200;

const CurrentlyDoing: React.FC = () => {
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
    <div className="min-h-[3.5rem]">
      <div className="text-lg text-gray-400">Currently I am probably:</div>
      <div className="text-lg text-white h-7">
        <span>{display}</span>
        <span className="animate-pulse">|</span>
      </div>
    </div>
  );
};

export default CurrentlyDoing; 