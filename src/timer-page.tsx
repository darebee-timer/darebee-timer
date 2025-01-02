import React, { useEffect } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import beepSound from './sounds/beep.wav'
import { Workout } from './helper/workout';
import { getWorkoutState } from './helper/timer-state';

const beep = new Audio(beepSound);


function TimerPage() {
  const workout: Workout = {
    numSets: 2,
    exercises: [
      { type: 'work', duration: 5 }
    ],
    restBetweenSetsDuration: 10,
    preCountDuration: 5,
  }
  const [paused, setPaused] = React.useState(true);
  const [state, setState] = React.useState(getWorkoutState(workout, 0));
  const timerRef = React.useRef<NodeJS.Timeout | undefined>(undefined);
  useEffect(() => {
    return () => {
      // cleanup timeout
      if (timerRef.current)
        clearInterval(timerRef.current);
    }
  }, []);
  const stopTimer = () => {
    setPaused(true);
    if (!timerRef.current) return;
    clearInterval(timerRef.current);
    timerRef.current = undefined;
  };
  const tickHandler = () => {
    setState(workoutState => {
      if (workoutState.position >= workoutState.totalDuration) {
        stopTimer();
        return workoutState;
      }
      return getWorkoutState(workout, workoutState.position + 1)
    });
    beep.play();
  }
  const handlePlayPause = () => {
    if (paused) {
      timerRef.current = setInterval(tickHandler, 1000);
      setPaused(false);
    } else {
      stopTimer();
    }
  };
  const handleReset = () => {
    stopTimer();
    setState(getWorkoutState(workout, 0));
  }

  return (
    <>
      <div className="container">
        <button type="button" className="btn btn-primary btn-lg fs-3 m-2" onClick={handlePlayPause}
          dangerouslySetInnerHTML={{ __html: paused ? "&#x23F5;&#xFE0E;" : "&#x23F8;&#xFE0E;" }}>
        </button>
        <button type="button" className="btn btn-primary btn-lg fs-3 m-2" onClick={handleReset}>
          &#10226;
        </button>
        <CircularProgressbarWithChildren value={state.exercise.fraction * 100}>
          <div id="timer" className="text-center" style={{ fontSize: 80 }}>
            {state.exercise.duration - state.exercise.position}
          </div>
        </CircularProgressbarWithChildren>
        <div className="progress" role="progressbar">
          <div className="progress-bar" style={{ width: `${state.overall.fraction * 100}%` }}></div>
        </div>
      </div>
    </>
  );
}

export default TimerPage
