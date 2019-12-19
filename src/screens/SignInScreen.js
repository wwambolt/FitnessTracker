//This code adapted from the react-navigation documentation for authentication flows.

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  Picker,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
} from 'react-native';

import { Separator, H1, H3 } from 'native-base';

// Importing the realm database and custom schemas
import Realm from 'realm';
import FoodSchema from '../../realm/FoodSchema';
import MealSchema from '../../realm/MealSchema';
import ExerciseSchema from '../../realm/ExerciseSchema';
import DiarySchema from '../../realm/DiarySchema';
import User from '../../realm/User';

import AsyncStorage from '@react-native-community/async-storage';

// Open the existing realm database
let realm = new Realm({ schema: [FoodSchema, MealSchema, ExerciseSchema, DiarySchema, User] });
let profile = realm.objects('User');

class SignInScreen extends Component {
  static navigationOptions = {
    title: 'Please update your user profile.',
  };

  constructor(props) {
    super(props);
    this.state = 
    {
      first_name: 'John',
      last_name: 'Doe',
      sex: 'male',
      age: 20,
      height: 180,
      starting_weight: 77,
      current_weight: 0,
      activity_level: 'sedentary',
      bmr: 0,
      tdee: 0,
      goal_weight: 64,
      kg_loss: 0,
      daily_calories: 0,
      daily_protein: 0,
      daily_carbs: 0,
      daily_fat: 0,
      daily_water: 8,
      workouts_per_week: 5,
      minutes_per_workout: 30,
      steps_per_day: 10000,
    };
  }

  onSavePress = () => {
    realm.beginTransaction();
    realm.create(
      'User',
      {
        id: 1,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        sex: this.state.sex,
        age: parseInt(this.state.age),
        height: parseInt(this.state.height),
        starting_weight: parseFloat(this.state.starting_weight),
        current_weight: this.state.current_weight,
        activity_level: this.state.activity_level,
        bmr: this.state.bmr,
        tdee: this.state.tdee,
        goal_weight: parseFloat(this.state.goal_weight),
        kg_loss: parseFloat(this.state.kg_loss),
        daily_calories: parseInt(this.state. daily_calories),
        daily_protein: parseInt(this.state.daily_protein),
        daily_carbs: parseInt(this.state.daily_carbs),
        daily_fat: parseInt(this.state.daily_fat),
        daily_water: parseInt(this.state.daily_water),
        workouts_per_week: parseInt(this.state.workouts_per_week),
        minutes_per_workout: parseInt(this.state.minutes_per_workout),
        steps_per_day: parseInt(this.state.steps_per_day),
      },
      'modified'
    );
    realm.commitTransaction();
    console.log(profile);
  };

  // Mifflin St. Jeor formulae used to calculate
  calculateBMR = () => {
    var bmr_calc;
    if (this.state.sex == 'female') {
      bmr_calc = (this.state.height * 6.25)
             + (this.state.starting_weight * 9.99)
            - (this.state.age * 4.92) - 161; 
    }
    else {
      bmr_calc = (this.state.height * 6.25)
             + (this.state.starting_weight * 9.99)
            - (this.state.age * 4.92) + 5; 
    }
    console.log('height: ',this.state.height);
    console.log('weight: ',this.state.starting_weight);
    console.log('age: ',this.state.age);
    console.log('BMR: ',bmr_calc);
    this.setState({ bmr: bmr_calc}, this.calculateTDEE);  
  }

  calculateTDEE = () => {
    var tdee_calc;
    if (this.state.sex == 'female') {
      if (this.state.activity_level === 'sedentary' ) {
        tdee_calc = this.state.bmr * 1.1;
      }
      else if (this.state.activity_level =='light') {
        tdee_calc = this.state.bmr * 1.275;
      }
      else if (this.state.activity_level =='moderate') {
        tdee_calc = this.state.bmr * 1.35;
      }
      else if (this.state.activity_level =='very') {
        tdee_calc = this.state.bmr * 1.525;
      }
    }
    else {
      if (this.state.activity_level =='sedentary' ) {
        tdee_calc = this.state.bmr * 1.2;
      }
      else if (this.state.activity_level == 'light') {
        tdee_calc = this.state.bmr * 1.375;
      }
      else if (this.state.activity_level == 'moderate') {
        tdee_calc = this.state.bmr * 1.55;
      }
      else if (this.state.activity_level == 'very') {
        tdee_calc = this.state.bmr * 1.725;
      }
    }
    console.log('Activity_level: ',this.state.activity_level);
    console.log('TDEE: ',tdee_calc);
    this.setState({ tdee: tdee_calc }, this.calculateDailyCalories);
  }

  calculateDailyCalories = () => {

    if (this.state.kg_loss == '0') {
      this.setState({ daily_calories: this.state.tdee }, this.onSavePress);
    }
    else if (this.state.kg_loss == '0.25') {
      this.setState({ daily_calories: this.state.tdee - 250 }, this.onSavePress);
    }
    else if (this.state.kg_loss == '0.5') {
      this.setState({ daily_calories: this.state.tdee - 500 }, this.onSavePress);
    }
    else if (this.state.kg_loss == '0.75') {
      this.setState({ daily_calories: this.state.tdee - 750 }, this.onSavePress);
    }
    else {
      this.setState({ daily_calories: this.state.tdee - 10000 }, this.onSavePress);
    }
    console.log('daily calories: ',this.state.daily_calories);
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: '#a0a0a0'}}>
      <ScrollView>
        <H1 style={{ backgroundColor: '#800020', color: '#ccc' }} >User Info</H1>
        <Separator style={{ height: 8, backgroundColor: 'grey' }} />

        <H3>First Name</H3>
        <TextInput style={{ backgroundColor: '#ccc' }}
          placeholder='John'
          defaultValue='John'
          onChangeText={text => this.setState({first_name: text}) }
          controlled={true}
        />

        <H3>Last Name</H3>
        <TextInput style={{ backgroundColor: '#ccc' }}
          placeholder='Doe'
          defaultValue='Doe'
          onChangeText={text => this.setState({last_name: text}) }
          controlled={true}
        />

        <H3>Sex</H3>
        <Picker
          selectedValue={this.state.sex}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({sex: itemValue})
          }
        >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
        </Picker>

        <H3>Age</H3>
        <TextInput style={{ backgroundColor: '#ccc' }}
          placeholder='20'
          defaultValue='20'
          keyboardType='numeric'
          onChangeText={text => this.setState({age: text}) }
          controlled={true}
        />

        <H3>Height (cm)</H3>
        <TextInput style={{ backgroundColor: '#ccc' }}
          placeholder='180'
          defaultValue='180'
          keyboardType='numeric'
          onChangeText={text => this.setState({height: text}) }
          controlled={true}
        />

        <H3>Weight (kg)</H3>
        <TextInput style={{ backgroundColor: '#ccc' }}
          placeholder='77'
          defaultValue='77'
          keyboardType='numeric'
          onChangeText={text => this.setState({starting_weight: text}) }
          controlled={true}
        />

        <H3>Activity Level</H3>
        <Picker
          selectedValue={this.state.activity_level}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({activity_level: itemValue})
          }
        >
            <Picker.Item label="Sedentary" value="sedentary" />
            <Picker.Item label="Lightly Active" value="light" />
            <Picker.Item label="Moderately Active" value="moderate" />
            <Picker.Item label="Very Active" value="very" />
        </Picker>

        <H1 style={{ backgroundColor: '#800020', color: '#ccc' }} >Nutrition Goals</H1>
        <Separator style={{ height: 8, backgroundColor: 'grey' }} />

        <H3>Goal Weight (kg)</H3>
        <TextInput style={{ backgroundColor: '#ccc' }}
          placeholder='64'
          defaultValue='64'
          keyboardType='numeric'
          onChangeText={text => this.setState({goal_weight: text}) }
          controlled={true}
        />

        <H3>Weight Loss Per Week (kg)</H3>
        <Picker
          selectedValue={this.state.kg_loss}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({kg_loss: itemValue})
          }
        >
            <Picker.Item label="0 kg" value="0" />
            <Picker.Item label="0.25 kg" value="0.25" />
            <Picker.Item label="0.5 kg" value="0.5" />
            <Picker.Item label="0.75 kg" value="0.75" />
            <Picker.Item label="1 kg" value="1" />
        </Picker>

        {/* Daily Calories Calculation */}

        <H3>Daily Protein (g)</H3>
        <TextInput style={{ backgroundColor: '#ccc' }}
          placeholder='0'
          defaultValue='0'
          keyboardType='numeric'
          onChangeText={text => this.setState({daily_protein: text}) }
          controlled={true}
        />

        <H3>Daily Carbs (g)</H3>
        <TextInput style={{ backgroundColor: '#ccc' }}
          placeholder='0'
          defaultValue='0'
          keyboardType='numeric'
          onChangeText={text => this.setState({daily_carbs: text}) }
          controlled={true}
        />

        <H3>Daily Fat (g)</H3>
        <TextInput style={{ backgroundColor: '#ccc' }}
          placeholder='0'
          defaultValue='0'
          keyboardType='numeric'
          onChangeText={text => this.setState({daily_fat: text}) }
          controlled={true}
        />

        <H3>Daily Water (g)</H3>
        <TextInput style={{ backgroundColor: '#ccc' }}
          placeholder='8'
          defaultValue='8'
          keyboardType='numeric'
          onChangeText={text => this.setState({daily_water: text}) }
          controlled={true}
        />


        <H1 style={{ backgroundColor: '#800020', color: '#ccc' }} >Fitness Goals</H1>
        <Separator style={{ height: 8, backgroundColor: 'grey' }} />

        <H3>Workouts Per Week</H3>
        <TextInput style={{ backgroundColor: '#ccc' }}
          placeholder='5'
          defaultValue='5'
          keyboardType='numeric'
          onChangeText={text => this.setState({workouts_per_week: text}) }
          controlled={true}
        />

        <H3>Minutes Per Workout</H3>
        <TextInput style={{ backgroundColor: '#ccc' }}
          placeholder='30'
          defaultValue='30'
          keyboardType='numeric'
          onChangeText={text => this.setState({minutes_per_workout: text}) }
          controlled={true}
        />

        <H3>Steps Per Day</H3>
        <TextInput style={{ backgroundColor: '#ccc' }}
          placeholder='10000'
          defaultValue='10000'
          keyboardType='numeric'
          onChangeText={text => this.setState({steps_per_day: text}) }
          controlled={true}
        />

        <Button
          color="#800020"
          title="Save"
          onPress={ () => {
              this._signInAsync();
              // Via callbacks, also calculates tdee, daily cals, and saves
              // the user profile to the database
              this.calculateBMR();
            }
          }
        />

      </ScrollView>
      </SafeAreaView>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

export default SignInScreen;