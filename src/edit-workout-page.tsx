import React, { ChangeEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Exercise, Workout } from './helper/workout';
import { WorkoutStorage } from './helper/storage';
import { getDurationOfSet } from './helper/timer-state';

const INITIAL_WORKOUT = {
  exercises: [],
  numSets: 3,
  preCountDuration: 3,
  restBetweenSetsDuration: 5,
};

const ADD_VALUES = [5, 10, 15, 20, 30];


function WorkoutPage(workoutId?: string) {
  const [workout, setWorkout] = React.useState<Workout>(workoutId ? new WorkoutStorage().get(workoutId)!.workout : INITIAL_WORKOUT);

  const [addType, setAddType] = React.useState<'work' | 'rest'>('work');
  const handleAddTypeChange = (event: ChangeEvent<HTMLInputElement>) => setAddType(event.target.value as 'work' | 'rest');

  const handleNumSetsChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setWorkout(currentWorkout => ({
      ...currentWorkout,
      numSets: Number(event.target.value)
    }));
  }

  const navigate = useNavigate();

  const addExercise = (exercise: Exercise) => {
    setWorkout(currentWorkout => ({
      ...currentWorkout,
      exercises: [...currentWorkout.exercises, exercise]
    }));
    setAddType('work');
  }

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

  return (
    <div className="container">
      <h4 className="mb-4">Edit Workout</h4>
      <div className="d-flex flex-wrap gap-4">
        {workout.exercises.map(exercise => (
          <div>
            <span className="badge text-bg-info fs-3">{exercise.duration} {exercise.type == 'rest' ? 'R' : ''}</span>
          </div>
        ))}
      </div>
      <div className="my-2">
        Duration of set: {getDurationOfSet(workout)} seconds ({workout.exercises.length} exercises)
      </div>
      <div className="border p-3">
        <div className="btn-group m-1" role="group">
          <input type="radio" className="btn-check" name="addType" value="work" id="addExercise" onChange={handleAddTypeChange} checked={addType === 'work'} />
          <label className="btn btn-outline-primary" htmlFor="addExercise">Add exercise</label>

          <input type="radio" className="btn-check" name="addType" value="rest" id="addRest" onChange={handleAddTypeChange} checked={addType === 'rest'} />
          <label className="btn btn-outline-primary" htmlFor="addRest">Add rest</label>
        </div>
        <div className="d-flex flex-wrap gap-2">
          {ADD_VALUES.map(value => (
            <button key={value} type="button" className="btn btn-primary m-1"
              onClick={() => addExercise({ type: addType, duration: value })}>
              {value} sec
            </button>
          ))}
          <button key="+" type="button" className="btn btn-primary m-1"
            onClick={() => openAddExercisePopup}>
            other
          </button>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="set-count" className="form-label">Number of sets</label>
        <input id="set-count" type="number" className="form-control w-50" value={workout.numSets} onChange={handleNumSetsChanged} />
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-success btn-lg" onClick={handleStart}>Start</button>
        <Link to="/" className="btn btn-secondary btn-lg">Cancel</Link>
      </div>
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
