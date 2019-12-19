// Schema is based the required information for a standard
// Nutrition Facts Table as proscribed by the Canadian Food 
// and Drug Regulations

// This schema could be expanded to account for more
// micronutrients or other information

const FoodSchema = 
{
    name: 'Food',
    primaryKey: 'id',
    properties: 
    {
        // General info
        id: 'int',
        name: 'string',

        // Categories will be used for sorting in the database screen
        category: {type: 'string', optional: true},
        servings: {type: 'float', default: 0},
        // measured in g or ml
        serving_size: {type: 'float', default: 0, optional: true},  

        // Macro and Micronutrients
        cals_per_serving: {type: 'float', default: 0},

        fat: {type: 'float', default: 0},
        saturated_fat: {type: 'float', default: 0},
        trans_fat: {type: 'float', default: 0},

        carbs: {type: 'float', default: 0},
        fibre: {type: 'float', default: 0},
        sugars: {type: 'float', default: 0},

        protein: {type: 'float', default: 0},

        cholesterol: {type: 'float', default: 0},
        sodium: {type: 'float', default: 0},
        potassium: {type: 'float', default: 0},
        calcium: {type: 'float', default: 0},
        iron: {type: 'float', default: 0},
        
    }
};

export default FoodSchema;