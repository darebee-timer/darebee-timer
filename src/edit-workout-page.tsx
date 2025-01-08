import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Exercise, Workout } from './helper/workout';
import workspaceStorage from './helper/storage';
import { getDurationOfSet } from './helper/timer-state';
import AddExerciseDialog from './add-exercise-dialog';
import NumberInputRow from './number-input-row';

const INITIAL_WORKOUT = {
  exercises: [],
  numSets: 3,
  preCountDuration: 3,
  restBetweenSetsDuration: 5,
};

const ADD_VALUES = [5, 10, 15, 20, 30];


function WorkoutPage({ workoutId }: { workoutId?: string }) {

  const [workout, setWorkout] = React.useState<Workout>(workoutId ? workspaceStorage.get(workoutId)!.workout : INITIAL_WORKOUT);

  const [addType, setAddType] = React.useState<'work' | 'rest'>('work');
  const handleAddTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => setAddType(event.target.value as 'work' | 'rest');

  const [showAddExerciseDialog, setShowAddExerciseDialog] = React.useState(false);

  const navigate = useNavigate();

  const addExercise = (exercise: Exercise) => {
    setWorkout(currentWorkout => ({
      ...currentWorkout,
      exercises: [...currentWorkout.exercises, exercise]
    }));
    setAddType('work');
  }

  const handleStart = () => {
    let id = workoutId;
    if (workoutId) {
      workspaceStorage.set(workoutId, workout);
    } else {
      id = workspaceStorage.add(workout);
    }
    navigate(`/${id}/timer`);
  };

  const handleDeleteExercise = () => {
    setWorkout(currentWorkout => ({
      ...currentWorkout,
      exercises: currentWorkout.exercises.slice(0, -1), // remove last entry
    }));
  }

  return (
    <div className="container">
      <AddExerciseDialog
        show={showAddExerciseDialog}
        onClose={() => setShowAddExerciseDialog(false)}
        onAdd={(duration) => {
          addExercise({ duration, type: addType });
          setShowAddExerciseDialog(false);
        }} />

      <h4 className="mb-4">Edit Workout</h4>
      <div className="d-flex flex-wrap gap-4">
        {workout.exercises.map((exercise, index) => (
          <div key={index}>
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
          {ADD_VALUES.map((value, index) => (
            <button key={index} type="button" className="btn btn-primary m-1"
              onClick={() => addExercise({ type: addType, duration: value })}>
              {value} sec
            </button>
          ))}
          <button key="add" type="button" className="btn btn-primary m-1"
            onClick={() => setShowAddExerciseDialog(true)}>
            other
          </button>
          <button key="delete" type="button" className="btn btn-danger m-1"
            onClick={handleDeleteExercise}>
            &#x232B;
          </button>
        </div>
      </div>
      <NumberInputRow id="numSets" value={workout.numSets} onValueChanged={(value) => {
        setWorkout(currentWorkout => ({
          ...currentWorkout,
          numSets: value
        }));
      }} />
      <NumberInputRow id="restBetweenSets" value={workout.restBetweenSetsDuration} onValueChanged={(value) => {
        setWorkout(currentWorkout => ({
          ...currentWorkout,
          restBetweenSetsDuration: value
        }));
      }} />
      <NumberInputRow id="getReady" value={workout.preCountDuration} onValueChanged={(value) => {
        setWorkout(currentWorkout => ({
          ...currentWorkout,
          preCountDuration: value
        }));
      }} />
      <div className="d-flex gap-2">
        <button className="btn btn-success btn-lg" onClick={handleStart}>Start</button>
        <Link to="/" className="btn btn-secondary btn-lg">Cancel</Link>
      </div>
    </div>

  );
}


export function CreateWorkoutPage() {
  return <WorkoutPage />;
}

export function EditWorkoutPage() {
  const { workoutId } = useParams();
  return <WorkoutPage workoutId={workoutId} />;
}
