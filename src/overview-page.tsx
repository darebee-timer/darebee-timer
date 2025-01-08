import { Link } from 'react-router-dom';
import workspaceStorage from './helper/storage';
import React from 'react';

function OverviewPage() {
  const [workouts, setWorkouts] = React.useState(workspaceStorage.getRecent());
  const removeWorkout = (workoutId: string) => {
    workspaceStorage.remove(workoutId);
    setWorkouts(workspaceStorage.getRecent());
  }
  return (
    <>
      <div className="card mx-auto my-1" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">New workout</h5>
          <p className="card-text">Create new workout schedule here.</p>
          <Link to="/create" className="btn btn-primary">New Workout</Link>
        </div>
      </div>
      {workouts.map(workoutEntry => (
        <div className="card mx-auto my-1" style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">Workout</h5>
            <p className="card-text">
              <div className="d-flex flex-wrap gap-2">
                {workoutEntry.workout.exercises.map(exercise => (
                  <div>
                    <span className="badge text-bg-info fs-6">{exercise.duration} {exercise.type == 'rest' ? 'R' : ''}</span>
                  </div>
                ))}
              </div>
              {workoutEntry.workout.numSets} sets
            </p>
            <div className="d-flex gap-2">
              <Link to={`/${workoutEntry.id}/edit`} className="btn btn-primary">Edit</Link>
              <button className="btn btn-danger" onClick={() => removeWorkout(workoutEntry.id)}>Remove</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default OverviewPage
