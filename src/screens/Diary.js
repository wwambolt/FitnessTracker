import React, { Component } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import moment from 'moment';

// Most layout elements provided by Native-Base library
import { StyleProvider, Content, Container, Header, Footer, Left, Body, Right, Button, Icon, Title,
         FooterTab, Text, Card, CardItem, Grid, Col, Row, Separator, List, View
       } from 'native-base';

// Importing the realm database and custom schemas
import Realm from 'realm';
import FoodSchema from '../../realm/FoodSchema';
import MealSchema from '../../realm/MealSchema';
import ExerciseSchema from '../../realm/ExerciseSchema';
import DiarySchema from '../../realm/DiarySchema';
import User from '../../realm/User';

// Custom components
import DiaryHeader from '../components/DiaryHeader';
import DiaryCard from '../components/DiaryCard';
import DiaryWaterCard from '../components/DiaryWaterCard';
import DiaryStepsCard from '../components/DiaryStepsCard';
import DiaryWeightCard from '../components/DiaryWeightCard';
import DiaryExerciseCard from '../components/DiaryExerciseCard';
import LogItemsModal from '../components/LogItemsModal';
import LogExerciseModal from '../components/LogExerciseModal';

// Custom styling
import styles from '../../styles/styles';
import getTheme from '../../native-base-theme/components';
import custom from '../../native-base-theme/variables/custom';

// Open the existing realm database
let realm = new Realm({ schema: [FoodSchema, MealSchema, ExerciseSchema, DiarySchema, User] });
var foods = realm.objects('Food');
var meals = realm.objects('Meal');
var exercises = realm.objects('Exercise');
var logs = realm.objects('DiaryEntry');
var profile = realm.objects('User');

class Diary extends Component {
    static navigationOptions = {
        drawerLabel: 'Diary',
        header: null,
      };

    constructor(props) {
      super(props);

      this.current_date = moment();
      this.decrementDate = this.decrementDate.bind(this);
      this.incrementDate = this.incrementDate.bind(this);

      this.state =
      {
          // This will be used for holding foods while the user
          // chooses them in the AddFoodsModal
          temp_array: [],
          logOverlayVisible: false,
          exerciseOverlayVisible: false,
          breakfastPressed: false,
          lunchPressed: false,
          dinnerPressed: false,
          snacksPressed: false,
          beveragesPressed: false,
          exercisePressed: false,

          // Used to get the summed calories from the diary food cards
          breakfast_cals: 0,
          lunch_cals: 0,
          dinner_cals: 0,
          snacks_cals: 0,
          beverages_cals: 0,

          breakfast: [],
          lunch: [],
          dinner: [],
          snacks: [],
          beverages: [],
          exercises: [],

          FoodList: foods,
          MealList: meals,
          ExerciseList: exercises,

          date: `${this.current_date.format('ll')}`,
          weight_log: '',

          water_count: 0,

          exercises: [],
          steps_count: 0,

          goal_cals: 0,
          foods_cals: 0,
          exercise_cals: 0,
          remaining_cals: 0,

          goal_protein: 0,
          goal_carbs: 0,
          goal_fat: 0,
      };
    };

    totalCals = () => {
      var breakfastCals = this.state.breakfast.reduce(function(prev, cur) {
        return prev + cur.cals_per_serving;
      }, 0);
      var lunchCals = this.state.lunch.reduce(function(prev, cur) {
        return prev + cur.cals_per_serving;
      }, 0);
      var dinnerCals = this.state.dinner.reduce(function(prev, cur) {
        return prev + cur.cals_per_serving;
      }, 0);
      var snacksCals = this.state.snacks.reduce(function(prev, cur) {
        return prev + cur.cals_per_serving;
      }, 0);
      var beveragesCals = this.state.beverages.reduce(function(prev, cur) {
        return prev + cur.cals_per_serving;
      }, 0);
      var sum = breakfastCals + lunchCals + dinnerCals + snacksCals + beveragesCals;
      this.setState({foods_cals: sum}, () => {
        this.remainingCals();
      });
    }

    exerciseCals = () => {
      var exerciseCals = this.state.exercises.reduce(function(prev, cur) {
        return prev + cur.total_cals;
      }, 0);
      this.setState({exercise_cals: exerciseCals}, () => {
        this.remainingCals();
      });
    }

    remainingCals = () => {
      this.setState({ remaining_cals: this.state.goal_cals
        - this.state.foods_cals + this.state.exercise_cals});
    }

    // Initially load the state from database
    componentDidMount = () => {
      this.setState({ date: `${this.current_date.format('ll')}` });
      var dateString = this.current_date.format('ll');
      // Load database information corresponding to the date if it exists
      // else initialize the entry
      var diaryEntry = logs.filtered('creation_date == $0', dateString);
      if (diaryEntry.length != 0)
      {
          // Exists
          // Set state to use entries
          this.setState(
            {
              date: diaryEntry[0].creation_date,
              weight_log: diaryEntry[0].weight_log,
    
              breakfast: diaryEntry[0].breakfast,
              lunch: diaryEntry[0].lunch,
              dinner: diaryEntry[0].dinner,
              snacks: diaryEntry[0].snacks,
              beverages: diaryEntry[0].beverages,
              water_count: diaryEntry[0].water_count,
    
              exercises: diaryEntry[0].exercises,
              steps_count: diaryEntry[0].steps_count,
    
              goal_cals: profile[0].daily_calories,
              foods_cals: diaryEntry[0].food_cals,
              exercise_cals: diaryEntry[0].exercise_cals,
              remaining_cals: diaryEntry[0].remaining_cals,
    
              goal_protein: profile[0].daily_protein,
              goal_carbs: profile[0].daily_carbs,
              goal_fat: profile[0].daily_fat,
            }, () => {
              this.totalCals();
              this.exerciseCals();
            }
            
          );

      }
      else
      {
          // Doesn't Exist
          realm.beginTransaction();
          realm.create(
            'DiaryEntry',
            {
              creation_date: dateString,

              breakfast: [],
              lunch: [],
              dinner: [],
              snacks: [],
              beverages: [],
              water_count: 0,

              exercises: [],
            }
          );
          realm.commitTransaction();
          // Set state to use entries
          this.setState(
          {
            date: diaryEntry[0].creation_date,
            weight_log: diaryEntry[0].weight_log,
  
            breakfast: diaryEntry[0].breakfast,
            lunch: diaryEntry[0].lunch,
            dinner: diaryEntry[0].dinner,
            snacks: diaryEntry[0].snacks,
            beverages: diaryEntry[0].beverages,
            water_count: diaryEntry[0].water_count,
  
            exercises: diaryEntry[0].exercises,
            steps_count: diaryEntry[0].steps_count,
  
            goal_cals: profile[0].daily_calories,
            foods_cals: diaryEntry[0].food_cals,
            exercise_cals: diaryEntry[0].exercise_cals,
            remaining_cals: diaryEntry[0].remaining_cals,
  
            goal_protein: profile[0].daily_protein,
            goal_carbs: profile[0].daily_carbs,
            goal_fat: profile[0].daily_fat,
          }, (updatedState) => {
            this.totalCals();
            this.exerciseCals();
          }
          );
      }
    };

    addWater = () => {
      this.setState({ water_count: this.state.water_count + 1 })
    };
    removeWater = () => {
      this.setState({ water_count: this.state.water_count - 1 })
    };
    handleSteps = (text) => {
      this.setState({ steps_count: text })
    };
    handleWeight = (text) => {
      this.setState({ weight_log: text })
    }
    decrementDate = () => {
      this.current_date.subtract(1, 'days');
      this.setState({ date: `${this.current_date.format('ll')}` });
      var dateString = this.current_date.format('ll');
      // Load database information corresponding to the date if it exists
      // else initialize the entry
      var diaryEntry = logs.filtered('creation_date == $0', dateString);
      if (diaryEntry.length != 0)
      {
          // Exists
          // Set state to use entries
          this.setState(
            {
              date: diaryEntry[0].creation_date,
              weight_log: diaryEntry[0].weight_log,
    
              breakfast: diaryEntry[0].breakfast,
              lunch: diaryEntry[0].lunch,
              dinner: diaryEntry[0].dinner,
              snacks: diaryEntry[0].snacks,
              beverages: diaryEntry[0].beverages,
              water_count: diaryEntry[0].water_count,
    
              exercises: diaryEntry[0].exercises,
              steps_count: diaryEntry[0].steps_count,
    
              goal_cals: profile[0].daily_calories,
              foods_cals: diaryEntry[0].food_cals,
              exercise_cals: diaryEntry[0].exercise_cals,
              remaining_cals: diaryEntry[0].remaining_cals,
    
              goal_protein: profile[0].daily_protein,
              goal_carbs: profile[0].daily_carbs,
              goal_fat: profile[0].daily_fat,
            }, (updatedState) => {
              this.totalCals();
              this.exerciseCals();
            }
          );

        }
      else
      {
          // Doesn't Exist
          realm.beginTransaction();
          realm.create(
            'DiaryEntry',
            {
              creation_date: dateString,

              breakfast: [],
              lunch: [],
              dinner: [],
              snacks: [],
              beverages: [],
              water_count: 0,

              exercises: [],
            }
          );
          realm.commitTransaction();
          // Set state to use entries
          this.setState(
          {
            date: diaryEntry[0].creation_date,
            weight_log: diaryEntry[0].weight_log,
  
            breakfast: diaryEntry[0].breakfast,
            lunch: diaryEntry[0].lunch,
            dinner: diaryEntry[0].dinner,
            snacks: diaryEntry[0].snacks,
            beverages: diaryEntry[0].beverages,
            water_count: diaryEntry[0].water_count,
  
            exercises: diaryEntry[0].exercises,
            steps_count: diaryEntry[0].steps_count,
  
            goal_cals: profile[0].daily_calories,
            foods_cals: diaryEntry[0].food_cals,
            exercise_cals: diaryEntry[0].exercise_cals,
            remaining_cals: diaryEntry[0].remaining_cals,
  
            goal_protein: profile[0].daily_protein,
            goal_carbs: profile[0].daily_carbs,
            goal_fat: profile[0].daily_fat,
          }, (updatedState) => {
            this.totalCals();
            this.exerciseCals();
          }
          );
      }
    };
    incrementDate = () => {
      this.current_date.add(1, 'days');
      this.setState({ date: `${this.current_date.format('ll')}` });
      var dateString = this.current_date.format('ll');
      // Load database information corresponding to the date if it exists
      // else initialize the entry
      var diaryEntry = logs.filtered('creation_date == $0', dateString);
      if (diaryEntry.length != 0)
      {
          // Exists
          // Set state to use entries
          this.setState(
            {
              date: diaryEntry[0].creation_date,
              weight_log: diaryEntry[0].weight_log,
    
              breakfast: diaryEntry[0].breakfast,
              lunch: diaryEntry[0].lunch,
              dinner: diaryEntry[0].dinner,
              snacks: diaryEntry[0].snacks,
              beverages: diaryEntry[0].beverages,
              water_count: diaryEntry[0].water_count,
    
              exercises: diaryEntry[0].exercises,
              steps_count: diaryEntry[0].steps_count,
    
              goal_cals: profile[0].daily_calories,
              foods_cals: diaryEntry[0].food_cals,
              exercise_cals: diaryEntry[0].exercise_cals,
              remaining_cals: diaryEntry[0].remaining_cals,
    
              goal_protein: profile[0].daily_protein,
              goal_carbs: profile[0].daily_carbs,
              goal_fat: profile[0].daily_fat,
            }, (updatedState) => {
              this.totalCals();
              this.exerciseCals();
            }
          );

        }
      else
      {
          // Doesn't Exist
          realm.beginTransaction();
          realm.create(
            'DiaryEntry',
            {
              creation_date: dateString,

              breakfast: [],
              lunch: [],
              dinner: [],
              snacks: [],
              beverages: [],
              water_count: 0,

              exercises: [],
            }
          );
          realm.commitTransaction();
          // Set state to use entries
          this.setState(
          {
            date: diaryEntry[0].creation_date,
            weight_log: diaryEntry[0].weight_log,
  
            breakfast: diaryEntry[0].breakfast,
            lunch: diaryEntry[0].lunch,
            dinner: diaryEntry[0].dinner,
            snacks: diaryEntry[0].snacks,
            beverages: diaryEntry[0].beverages,
            water_count: diaryEntry[0].water_count,
  
            exercises: diaryEntry[0].exercises,
            steps_count: diaryEntry[0].steps_count,
  
            goal_cals: profile[0].daily_calories,
            foods_cals: diaryEntry[0].food_cals,
            exercise_cals: diaryEntry[0].exercise_cals,
            remaining_cals: diaryEntry[0].remaining_cals,
  
            goal_protein: profile[0].daily_protein,
            goal_carbs: profile[0].daily_carbs,
            goal_fat: profile[0].daily_fat,
          }, (updatedState) => {
            this.totalCals();
            this.exerciseCals();
          }
          );
      }
    };
    saveDiaryEntry = () => {
      // realm.create should create new entry if it exists or update an 
      // existing entry with matching primary key by providing 
      // 'modified' as third parameter
      realm.beginTransaction();
      realm.create(
        'DiaryEntry',
        {
          creation_date: this.state.date,

          weight_log: this.state.weight_log == '' ? 0: parseFloat(this.state.weight_log),

          breakfast: this.state.breakfast,
          lunch: this.state.lunch,
          dinner: this.state.dinner,
          snacks: this.state.snacks,
          beverages: this.state.beverages,
          water_count: parseInt(this.state.water_count),

          exercises: this.state.exercises,
          steps_count: parseInt(this.state.steps_count),

          goal_cals: parseInt(this.state.goal_cals),
          foods_cals: parseInt(this.state.food_cals),
          exercise_cals: parseInt(this.state.exercise_cals),
          remaining_cals: parseInt(this.state.remaining_cals),

          goal_protein: parseInt(this.state.goal_protein),
          goal_carbs: parseInt(this.state.goal_carbs),
          goal_fat: parseInt(this.state.goal_fat),
        },
        'modified'
      );
      realm.commitTransaction();
      Alert.alert(`Diary entry for ${this.state.date} saved.`);
      this.totalCals();
      this.exerciseCals();
      this.remainingCals();
    };

    render() {

      return (
        <SafeAreaView style={ styles.container } >
          <StyleProvider style={getTheme(custom)}>
            <Container>

              <LogItemsModal
                isVisible={this.state.logOverlayVisible}
                onBackdropPress={() => this.setState({
                    logOverlayVisible: false,
                    breakfastPressed: false,
                    lunchPressed: false,
                    dinnerPressed: false,
                    snacksPressed: false,
                    beveragesPressed: false,
                    temp_array: [],
                  })
                }
                temp_array={this.state.temp_array}
                FoodList={this.state.FoodList}
                MealList={this.state.MealList}
                temp_array={this.state.temp_array}
                onSavePress={ () => {
                    if (this.state.breakfastPressed == true) {
                      this.setState({ breakfast: this.state.temp_array });
                    }
                    else if (this.state.lunchPressed == true) {
                      this.setState({ lunch: this.state.temp_array });
                    }
                    else if (this.state.dinnerPressed == true) {
                      this.setState({ dinner: this.state.temp_array });
                    }
                    else if (this.state.snacksPressed == true) {
                      this.setState({ snacks: this.state.temp_array });
                    }
                    else if (this.state.beveragesPressed == true) {
                      this.setState({ beverages: this.state.temp_array });
                    }
                    this.setState({
                      logOverlayVisible: false,
                      breakfastPressed: false,
                      lunchPressed: false,
                      dinnerPressed: false,
                      snacksPressed: false,
                      beveragesPressed: false,
                      temp_array: [],
                   });

                  }
                }
              />

              <LogExerciseModal
                isVisible={this.state.exerciseOverlayVisible}
                onBackdropPress={() => this.setState({
                    exerciseOverlayVisible: false,
                    temp_array: [],
                  })
                }
                temp_array={this.state.temp_array}
                ExerciseList={this.state.ExerciseList}
                onSavePress={ () => {
                  this.setState({ exercises: this.state.temp_array });
                  this.setState({
                    exerciseOverlayVisible: false,
                    temp_array: [],
                  });
                }
              }
            />

                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()} >
                        <Icon name='menu' />
                        </Button>
                    </Left>

                    <Body>
                        <Title>Diary</Title>
                    </Body>
                </Header>

                <DiaryHeader 
                  date={this.state.date}
                  goal={this.state.goal_cals}
                  food={this.state.foods_cals}
                  exercise={this.state.exercise_cals}
                  remaining={this.state.remaining_cals}
                  leftPress={() => {
                      this.decrementDate();
                    }
                  }
                  rightPress={() => {
                      this.incrementDate();
                    }
                  }
                />
                <Separator style={{ height: 2, flex: 0 }} ></Separator>

                <Content>

                  <DiaryCard 
                    title='Breakfast' 
                    footer='Add food' 
                    footerPress={() => this.setState({logOverlayVisible: true, breakfastPressed: true})}
                    list={this.state.breakfast}
                  />
                  <DiaryCard 
                    title='Lunch' 
                    footer='Add food' 
                    footerPress={() => this.setState({logOverlayVisible: true, lunchPressed: true})}
                    list={this.state.lunch}
                  />
                  <DiaryCard 
                    title='Dinner' 
                    footer='Add food' 
                    footerPress={() => this.setState({logOverlayVisible: true, dinnerPressed: true})}
                    list={this.state.dinner}
                  />
                  <DiaryCard 
                    title='Snacks' 
                    footer='Add food' 
                    footerPress={() => this.setState({logOverlayVisible: true, snacksPressed: true})}
                    list={this.state.snacks}
                  />
                  <DiaryCard 
                    title='Beverages' 
                    footer='Add drinks' 
                    footerPress={() => this.setState({logOverlayVisible: true, beveragesPressed: true})}
                    list={this.state.beverages}
                  />
                  <DiaryExerciseCard 
                    title='Exercise' 
                    footer='Add exercise' 
                    footerPress={() => this.setState({exerciseOverlayVisible: true})}
                    list={this.state.exercises}
                  />

                  <DiaryWaterCard 
                      water_qty={this.state.water_count}
                      plusPress={ () =>  this.addWater() } 
                      minusPress={ () =>  this.removeWater() }
                  />

                  <DiaryStepsCard
                      steps_count={this.state.steps_count}
                      onChangeValue={this.handleSteps}
                  />

                  <DiaryWeightCard
                      weight_log={this.state.weight_log}
                      onChangeValue={this.handleWeight}
                  />

                  <Card>
                      <Button 
                        full 
                        onPress={() => 
                          {
                            this.saveDiaryEntry();
                          }
                        }
                      >
                        <Text>Save</Text>
                      </Button>
                  </Card>

                </Content>
            </Container>
          </StyleProvider>
        </SafeAreaView>
      );
  }
};

export default Diary;