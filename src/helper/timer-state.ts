
import { Workout, ExerciseType } from './workout';

export type ExerciseState = {
    type: ExerciseType | 'preCount';
    position: number;
    fraction: number;
    duration: number;
};

export type WorkoutState = {
    position: number;
    exercise: ExerciseState;
    overall: {
        set: number;
        fraction: number;
    };
    totalDuration: number;
}

function getExerciseState(workout: Workout, pos: number): ExerciseState {
    let currentPos = pos;
    for (const exercise of workout.exercises) {
        if (currentPos < exercise.duration) {
            return {
                type: exercise.type,
                position: currentPos,
                fraction: currentPos / exercise.duration,
                duration: exercise.duration,
            };
        }
        currentPos -= exercise.duration;
    }
    return {
        type: 'rest',
        position: currentPos,
        fraction: currentPos / workout.restBetweenSetsDuration,
        duration: workout.restBetweenSetsDuration,
    };
}

export function getWorkoutState(workout: Workout, pos: number): WorkoutState {
    const setDuration = workout.exercises.reduce((accu, current) => accu + current.duration, 0);
    const totalDuration = workout.preCountDuration
        + setDuration * workout.numSets
        + workout.restBetweenSetsDuration * (workout.numSets - 1);

    // first handle first count down
    if (pos < workout.preCountDuration) {
        return {
            position: pos,
            exercise: {
                type: 'preCount',
                position: pos,
                fraction: pos / workout.preCountDuration,
                duration: workout.preCountDuration,
            },
            overall: {
                set: 1,
                fraction: pos / totalDuration,
            },
            totalDuration: totalDuration
        };
    }

    // find current exercise
    const posInWorkout = pos - workout.preCountDuration;
    const setAndRestDuration = setDuration + workout.restBetweenSetsDuration;
    const currentSet = Math.floor(posInWorkout / setAndRestDuration);
    const posInExercises = posInWorkout % setAndRestDuration;
    return {
        position: pos,
        exercise: getExerciseState(workout, posInExercises),
        overall: {
            set: currentSet,
            fraction: pos / totalDuration,
        },
        totalDuration: totalDuration
    };
}

export function stepState(workout: Workout, state: WorkoutState, dir: 1|-1): WorkoutState {
    if (dir > 0) {
        // jump to next exercise
        return getWorkoutState(workout, state.position + state.exercise.duration - state.exercise.position);
    }
    // jump to beginning of exercise, if we are not on the beginning yet.
    if (state.exercise.position > 1)
        return getWorkoutState(workout, state.position - state.exercise.position);

    // jump to beginning of previous exercise
    const prevExerciseState = getWorkoutState(workout, state.position - state.exercise.position - 1);
    return getWorkoutState(workout, prevExerciseState.position - prevExerciseState.exercise.position);
}
