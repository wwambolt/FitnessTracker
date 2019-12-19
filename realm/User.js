class User {
  get fullName() {
    return this.first_name + ' ' + this.last_name
  }
}


User.schema = {
    name: 'User',
    primaryKey: 'id',
    properties: 
    {
        id: {type: 'int', default: 1},
        first_name: 'string',
        last_name: 'string',
        sex:  'string',
        age: 'int',
        height: 'int', // cm
        starting_weight: 'float', // kg
        current_weight: 'float',  // kg
        activity_level: 'string',
        bmr: 'int',
        tdee: 'int',

        // Nutrition Goals
        goal_weight: 'float', // kg
        kg_loss: 'float',
        daily_calories: 'int', // g
        daily_protein: 'int', // g
        daily_carbs: 'int', // g
        daily_fat: 'int',  //g
        daily_water:  {type: 'int', default: 8},

        // Fitness Goals
        workouts_per_week: { type: 'int', default: 0},
        minutes_per_workout:  { type: 'int', default: 0},
        steps_per_day: { type: 'int', default: 10000},

    }
}

export default User;