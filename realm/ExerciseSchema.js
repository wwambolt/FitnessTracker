// Could split schema further into different exercise types
// e.g. Cardio, Strength, Isometric, etc.
// Chose a generalized schema with optional properties

const ExerciseSchema = 
{
    name: 'Exercise',
    primaryKey: 'id',
    properties: 
    {
        id: 'int',
        name: 'string',
        category: 'string',
        minutes: {type: 'int', default: 0, optional: true},
        cals_burnt_per_min: {type: 'int', default: 0, optional: true},
        total_cals: {type: 'int', default: 0, optional: true},
        sets: {type: 'int', default: 0, optional: true},
        reps: {type: 'int', default: 0, optional: true},
        distance: {type: 'int', default: 0, optional: true},
        speed: {type: 'int', default: 0, optional: true},
    }
};

export default ExerciseSchema;