import { Link } from 'react-router-dom';
import { WorkoutStorage } from './helper/storage';

function OverviewPage() {
  const workouts = new WorkoutStorage().getRecent();
  return (
    <>
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">New workout</h5>
          <p className="card-text">Create new workout schedule here.</p>
          <Link to="/create" className="btn btn-primary">Create Workout</Link>
        </div>
      </div>
      {workouts.map(workoutEntry => (
        <div className="card" style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">Last workout</h5>
            <p className="card-text">
              {workoutEntry.workout.exercises.map(ex =>
                <span>{ex.duration}&nbsp;</span>
              )}
              {workoutEntry.workout.numSets} sets
            </p>
            <a href={`/${workoutEntry.id}/edit`} className="btn btn-primary">Edit</a>
          </div>
        </div>
      ))}
    </>
  );
}

export default OverviewPage
