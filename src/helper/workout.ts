
export type ExerciseType = 'work' | 'rest';

/// exercise or rest item
export type Exercise = {
    type: ExerciseType;
    duration: number;
}

/// describes a complete workout
export type Workout = {
    // number of sets
    numSets: number,
    // exercises for each set
    exercises: Exercise[],
    // time of rest between sets
    restBetweenSetsDuration: number,
    // number of seconds before first set
    preCountDuration: number,
};
