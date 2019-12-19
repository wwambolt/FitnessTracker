import FoodSchema from './FoodSchema';

const MealSchema = {
    name: 'Meal',
    primaryKey: 'id',
    properties:
    {
        id: 'int',
        name: 'string',
        mealItems: 'Food[]',
    }
};

export default MealSchema;