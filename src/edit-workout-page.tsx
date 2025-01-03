import React, { ChangeEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Exercise, Workout } from './helper/workout';
import { WorkoutStorage } from './helper/storage';

const defaultWorkout = {
  exercises: [],
  numSets: 3,
  preCountDuration: 3,
  restBetweenSetsDuration: 5,
};

function WorkoutPage(workoutId?: string) {
  const [workout, setWorkout] = React.useState<Workout>(workoutId ? new WorkoutStorage().get(workoutId)!.workout : defaultWorkout);
  const [addType, setAddType] = React.useState<'work'|'rest'>('work');
  const addExercise = (exercise: Exercise) => {
    setWorkout(currentWorkout => ({
      ...currentWorkout,
      exercises: [...currentWorkout.exercises, exercise]
    }));
    setAddType('work');
  }

  const handleNumSetsChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setWorkout(currentWorkout => ({
      ...currentWorkout,
      numSets: Number(event.target.value)
    }));
  }
  const navigate = useNavigate();
  const handleStart = () => {
    const storage = new WorkoutStorage();
    let id = workoutId;
    if (workoutId) {
      storage.set(workoutId, workout);
    } else {
      id = storage.add(workout);
    }
    navigate(`/${id}/timer`);
  };
  const openAddExercisePopup = () => {
    // TODO use modal?
  };
  const addValues = [5, 10, 15, 20, 30];
  const handleAddTypeChange = (event: ChangeEvent<HTMLInputElement>) => setAddType(event.target.value as 'work'|'rest');
  return (
    <div className="container">
      <h4>Workout</h4>
      <div className="row row-cols-auto">
        {workout.exercises.map(exercise => (
          <div>
            <span className="badge text-bg-primary">{exercise.duration} {exercise.type == 'rest' ? 'R' : ''}</span>
          </div>
        ))}
      </div>
      <div className="">
        <div className="btn-group m-1" role="group">
          <input type="radio" className="btn-check" name="addType" value="work" id="addExercise" onChange={handleAddTypeChange} checked={addType==='work'} />
          <label className="btn btn-outline-primary" htmlFor="addExercise">Add exercise</label>

          <input type="radio" className="btn-check" name="addType" value="rest" id="addRest" onChange={handleAddTypeChange} checked={addType==='rest'} />
          <label className="btn btn-outline-primary" htmlFor="addRest">Add rest</label>
        </div>
        <div className="row row-cols-auto">
        {addValues.map(value => (
          <button key={value} type="button" className="btn btn-primary m-1"
            onClick={() => addExercise({type: addType, duration: value})}>
            {value} sec
          </button>
        ))}
          <button key="+" type="button" className="btn btn-primary m-1"
            onClick={() => openAddExercisePopup}>
            other
          </button>
        </div>
        <div className="mb-3">
          <label htmlFor="set-count" className="form-label">Number of sets</label>
          <input id="set-count" type="number" className="form-control w-50" value={workout.numSets} onChange={handleNumSetsChanged} />
        </div>
      </div >
      <button className="btn btn-success btn-lg" onClick={handleStart}>Start</button>
      <Link to="/" className="btn btn-secondary btn-lg">Cancel</Link>
    </div>

  );
}


export function CreateWorkoutPage() {
  return WorkoutPage();
}

export function EditWorkoutPage() {
  const { workoutId } = useParams();
  return WorkoutPage(workoutId);
}
