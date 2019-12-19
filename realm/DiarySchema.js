
import ExerciseSchema from './ExerciseSchema';
import FoodSchema from './FoodSchema';

const DiarySchema = {
    
    name: 'DiaryEntry',
    // Date objects cannot be used as realm primary keys
    // Workaround: Generate date strings at write time
    // using momentjs and make creation_date primary key
    primaryKey: 'creation_date',
    schemaVersion: 1,
    properties: 
    {
        creation_date: 'string',
        weight_log: {type: 'float', default: 0, optional: true},

        // Nutrition logs; meals are arrays of food items
        breakfast: 'Food[]',
        lunch: 'Food[]',
        dinner: 'Food[]',
        snacks: 'Food[]',
        beverages: 'Food[]',
        water_count: {type: 'int', default: 0},

        // Exercise logs
        exercises: 'Exercise[]',
        steps_count: {type: 'int', default: 0},

        // Computed caloric fields
        goal_cals: {type: 'int', default: 0},
        food_cals: {type: 'int', default: 0},
        exercise_cals: {type: 'int', default: 0},
        remaining_cals: {type: 'int', default: 0},

        goal_protein: {type: 'int', default: 0},
        goal_carbs: {type: 'int', default: 0},
        goal_fat: {type: 'int', default: 0},
    }
};

export default DiarySchema;