import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import beepSound from './assets/sounds/beep.wav'
import { Workout } from './helper/workout';
import { getWorkoutState, stepState } from './helper/timer-state';
import { Link, useParams } from 'react-router-dom';
import { WorkoutStorage } from './helper/storage';

// for android audio playback is already transient
// for ios we use this new API currently only implemented by safari
if (navigator.audioSession) {
    navigator.audioSession.type = 'transient';
}

const beep = new Audio(beepSound);


function TimerPage() {
  const { workoutId } = useParams();
  const workout: Workout = new WorkoutStorage().get(workoutId!)!.workout;
  const [paused, setPaused] = React.useState(true);
  const [state, setState] = React.useState(getWorkoutState(workout, 0));
  const timerRef = React.useRef<NodeJS.Timeout | undefined>(undefined);
  React.useEffect(() => {
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
      const newState = getWorkoutState(workout, workoutState.position + 1);
      if (newState.exercise.duration - newState.exercise.position <= 3)
        beep.play();
      return newState;
    });
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
  const handlePrevious = () => {
    setState(workoutState => stepState(workout, workoutState, -1))
  };
  const handleNext = () => {
    setState(workoutState => stepState(workout, workoutState, +1))
  };

  return (
    <>
      <div className="container py-4" style={{maxWidth: '35em'}}>
        <CircularProgressbarWithChildren value={state.exercise.fraction * 100}>
          <div className="position-absolute top-0 start-0">
            <Link to={`/${workoutId}/edit`} className="btn btn-primary btn-sm fs-3 m-2">Edit</Link>
          </div>
          <div className="position-absolute top-0 end-0 fs-3">set {state.overall.set + 1}/{workout.numSets}</div>
          { state.overall.fraction < 1 ? 
            <>
              <div id="timer" className="text-center" style={{ fontSize: 80 }}>
                {state.exercise.duration - state.exercise.position}
              </div>
              <div id="workType" className="text-center fs-3">
                {state.exercise.type !== 'preCount' ? state.exercise.type : ''}
              </div>
            </>
            : <div className="text-center fs-3">finished!</div>
          }
        </CircularProgressbarWithChildren>
        <div className="progress my-4" role="progressbar">
          <div className="progress-bar" style={{ width: `${state.overall.fraction * 100}%` }}></div>
        </div>
        <div id="buttonRow" className="text-center">
          <button type="button" className="btn btn-primary btn-lg fs-3 m-2" onClick={handlePrevious}>
            &#x23EE;&#xFE0E;
          </button>
          <button type="button" className="btn btn-primary btn-lg fs-3 m-2" onClick={handlePlayPause}
            dangerouslySetInnerHTML={{ __html: paused ? "&#x23F5;&#xFE0E;" : "&#x23F8;&#xFE0E;" }}>
          </button>
          <button type="button" className="btn btn-primary btn-lg fs-3 m-2" onClick={handleNext}>
            &#x23ED;&#xFE0E;
          </button>
          <button type="button" className="btn btn-primary btn-lg fs-3 m-2" onClick={handleReset}>
            &#10226;
          </button>
        </div>
      </div>
    </>
  );
}

export default TimerPage
