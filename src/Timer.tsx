import React, { useEffect } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import beepSound from './sounds/beep.wav'

const beep = new Audio(beepSound);


function Timer() {
  const [paused, setPaused] = React.useState(true);
  const [overallSeconds, setOverallSeconds] = React.useState(0);
  const timerRef = React.useRef<NodeJS.Timeout | undefined>(undefined);
  const workout = {
    exercises: [5, 10, 5],
    sets: 3,
  }
  const getTotalSeconds = () => {
    return workout.exercises.reduce((acc, exercise) => acc + exercise, 0); // * workout.sets;
  }
  const getProgress = (overall: number): number => {
    return 100 * overall / getTotalSeconds();
  }
  const getCounter = (overall: number): number => {
    for (const exercise of workout.exercises) {
      if (overall < exercise) {
        return exercise - overall;
      }
      overall -= exercise;
    }
    return 0;
  }
  useEffect(() => {
    return () => {
      if (timerRef.current)
        clearInterval(timerRef.current);
    }
  }, []);
  const handlePlayPause = () => {
    if (paused) {
      timerRef.current = setInterval(() => {
        setOverallSeconds(overallSeconds => overallSeconds + 1);
        beep.play();
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }

    setPaused(paused => !paused);
  };
  const handleReset = () => {
    setPaused(true);
    setOverallSeconds(0);
    if (timerRef.current)
      clearInterval(timerRef.current);
  }

  return (
    <>
      <div className="container">
        <button type="button" className="btn btn-primary btn-lg fs-3 m-2" onClick={handlePlayPause}
          dangerouslySetInnerHTML={{ __html: paused ? "&#x23F5;&#xFE0E;": "&#x23F8;&#xFE0E;"  }}>
        </button>
        <button type="button" className="btn btn-primary btn-lg fs-3 m-2" onClick={handleReset}>
          &#10226;
        </button>
        <CircularProgressbarWithChildren value={getProgress(overallSeconds)}>
          <div id="timer" className="text-center" style={{ fontSize: 80 }}>
            {getCounter(overallSeconds)}
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </>
  );
}

export default Timer
