import { Link } from 'react-router-dom';
import { WorkoutStorage } from './helper/storage';

function OverviewPage() {
  const workouts = new WorkoutStorage().getRecent();
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
            <Link to={`/${workoutEntry.id}/edit`} className="btn btn-primary">Edit</Link>
          </div>
        </div>
      ))}
    </>
  );
}

export default OverviewPage
