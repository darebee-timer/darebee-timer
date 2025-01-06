
import { Workout } from './workout';
import { v4 as uuidv4 } from 'uuid';

export type WorkoutEntry = {
    created: Date,
    lastUsed: Date,
    id: string,
    workout: Workout,
}

export class WorkoutStorage {
    private static KEY = 'recentWorkouts';
    private workouts: WorkoutEntry[] = [];

    constructor() {
        try {
            const str = localStorage.getItem(WorkoutStorage.KEY)
            if (!str) return;
            this.workouts = JSON.parse(str);
        } catch (exeption) {
            // ignore
        }
    }

    getRecent(): WorkoutEntry[] {
        return this.workouts;
    }

    get(id: string): WorkoutEntry | undefined {
        return this.workouts.find(v => v.id == id);
    }

    set(id: string, workout: Workout) {
        const idx = this.workouts.findIndex(entry => entry.id == id);
        if (idx !== 1) return;
        const entry = this.workouts[idx];
        entry.lastUsed = new Date();
        entry.workout = workout;
        // move to front
        this.workouts.splice(idx, 1);
        this.workouts.unshift(entry);
    }

    add(workout: Workout): string {
        const id = uuidv4();
        this.workouts.push({
            created: new Date(),
            lastUsed: new Date(),
            workout,
            id,
        });
        localStorage.setItem(WorkoutStorage.KEY, JSON.stringify(this.workouts));
        return id;
    }

    remove(id: string) {
        this.workouts = this.workouts.filter(entry => entry.id !== id);
        localStorage.setItem(WorkoutStorage.KEY, JSON.stringify(this.workouts));
    }
}