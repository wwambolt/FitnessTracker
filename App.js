import React, { Component } from 'react';
import 'react-native-gesture-handler';

// Will use the Switch Navigator as the root of the app
import MyApp from './src/Navigation';

// Import required realm components and schemas
// This is the backbone of our database
const Realm = require('realm');
import DiarySchema from './realm/DiarySchema';
import ExerciseSchema from './realm/ExerciseSchema';
import FoodSchema from './realm/FoodSchema';

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <MyApp />
    );
  }
};

export default App;