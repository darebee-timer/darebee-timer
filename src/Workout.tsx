import React from 'react';
import { Link } from 'react-router-dom';

function Workout() {
  const [workout, setWorkout] = React.useState({
    numSets: 3,
    exercises: [20, 20, 20],
  });
  const addExercise = (exercise: number) => {
    setWorkout(currentWorkout => ({
      ...currentWorkout,
      exercises: [...currentWorkout.exercises, exercise]
    }));
  }

  const handleNumSetsChanged = (event: any) => {
    setWorkout(currentWorkout => ({
      ...currentWorkout,
      numSets: Number(event.target.value)
    }));
  }
  const addValues = [5, 10, 15, 20, 25, 30];
  return (
    <div className="container">
      <h4>Workout</h4>
      <div className="row row-cols-auto">
        {workout.exercises.map((value) => (
          <div className="">
            <span key={value} className="badge text-bg-primary">{value}</span>
          </div>
        ))}
      </div>
      <div className="">
        <div className="btn-group m-1" role="group">
          <input type="radio" className="btn-check" name="addType" id="addExercise" checked />
          <label className="btn btn-outline-primary" htmlFor="addExercise">Add exercise</label>

          <input type="radio" className="btn-check" name="addType" id="addRest" />
          <label className="btn btn-outline-primary" htmlFor="addRest">Add rest</label>
        </div>
        <div className="row row-cols-auto">
        {addValues.map((value) => (
          <button key={value} type="button" className="btn btn-primary m-1"
            onClick={() => addExercise(value)}>
            {value} sec
          </button>
        ))}
        </div>
        <div className="mb-3">
          <label htmlFor="set-count" className="form-label">Number of sets</label>
          <input id="set-count" type="number" className="form-control w-50" value={workout.numSets} onChange={handleNumSetsChanged} />
        </div>
      </div >
      <Link to="/create/timer" className="btn btn-success btn-lg">Start</Link>
      <Link to="/" className="btn btn-secondary btn-sm">Cancel</Link>
      <Link to="/" className="btn btn-primary btn-sm">Save</Link>
    </div>

  );
}

export default Workout
