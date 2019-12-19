import React,{ Component } from 'react';
import { ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Overlay } from 'react-native-elements';

// Most layout elements provided by Native-Base library
import { StyleProvider, Content, Container, Header, Footer, Left, Body, Right, Button, Icon, Title,
  FooterTab, Text, Card, CardItem, Grid, Col, Row, Separator, Segment, Input, Form, View,
  Label, Item as BaseItem, Button as BaseButton
} from 'native-base';

// Importing the realm database and custom schemas
import Realm from 'realm';
import FoodSchema from '../../realm/FoodSchema';
import MealSchema from '../../realm/MealSchema';
import ExerciseSchema from '../../realm/ExerciseSchema';
import DiarySchema from '../../realm/DiarySchema';
import User from '../../realm/User';

// Importing custom components
import ExerciseItem from '../components/ExerciseItem';

// Custom styling
import styles from '../../styles/styles';
import getTheme from '../../native-base-theme/components';
import custom from '../../native-base-theme/variables/custom';

// Open the existing realm database
let realm = new Realm({ schema: [FoodSchema, MealSchema, ExerciseSchema, DiarySchema, User] });
var exercises = realm.objects('Exercise'); // All exercises in database
console.log(exercises)

class AddFood extends Component {

  constructor(props) {
    super(props);
      this.state = 
      { 
        FlatListItems: exercises,
        refresh: false, // toggled to force the FlatList to refresh
        addOverlayVisible: false,
        id: 0,
        name: 'New Exercise',
        category: 'New Category',
        minutes: 0,
        cals_burnt_per_min: 0,
        total_cals: 0,
        sets: 0,
        reps: 0,
        distance: 0,
        speed: 0,
      };
  };

  handleName = (text) => {
    this.setState({ name: text })
  };
  handleCategory = (text) => {
    this.setState({ category: text })
  };
  handleMinutes = (text) => {
    this.setState({ minutes: text })
  };
  handleCalsBurnt = (text) => {
    this.setState({ cals_burnt_per_min: text })
  };
  handleSets = (text) => {
    this.setState({ sets: text })
  };
  handleReps = (text) => {
    this.setState({ reps: text })
  };
  handleDistance= (text) => {
    this.setState({ distance: text })
  };
  handleSpeed = (text) => {
    this.setState({ speed: text })
  };

  // Function for adding a food to the database
  addExercise = (name, category, minutes, cals_burnt_per_minute,
    sets, reps, distance, speed) => {
    realm.beginTransaction();
    realm.create(
      'Exercise',
      {
        id: (Math.random() * 10000 + 1),
        name: this.state.name,
        category: this.state.category,
        minutes: parseInt(this.state.minutes),
        cals_burnt_per_min: parseInt(this.state.cals_burnt_per_min),
        total_cals: (this.state.minutes * this.state.cals_burnt_per_min),
        sets: parseInt(this.state.sets),
        reps: parseInt(this.state.reps),
        distance: parseInt(this.state.distance),
        speed: parseInt(this.state.speed),
      }
    );
    realm.commitTransaction();
    this.refreshHandler();
    this.setState({ addOverlayVisible: false });
  };

  // Used to change the refresh attribute of state
  // which is passed into the FlatList as extraData
  // when this state attribute changes it forces the list to
  // re-render
  refreshHandler = () => {
    this.setState({ 
      refresh: !this.state.refresh
    })
  };

  removeExercise = ( exercise_id ) => {
    realm.beginTransaction();
    realm.delete(
        realm.objects('Exercise').filtered('id=' + exercise_id)
    );
    realm.commitTransaction();
    this.refreshHandler();
  }

  render()
  {
    return (
      <SafeAreaView style={styles.container}>
        <StyleProvider style={getTheme(custom)}>
          <Container style={{ flex: 1 }}>

          <Overlay
                isVisible={this.state.addOverlayVisible}
                onBackdropPress={ () => this.setState({addOverlayVisible: false})}
          >
            <ScrollView>
                <Text style={{ marginBottom: 6 }} >
                  Please input the exercise statistics.
                </Text>
                <Form>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Name</Label>
                      <Input 
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleName( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Category</Label>
                      <Input 
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleCategory( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Minutes</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleMinutes( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Cals. Burnt/Min</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleCalsBurnt( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Target Sets</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleSets( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Target Reps</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleReps( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Target Distance</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleDistance( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Target Speed</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleSpeed( value ) }
                      />
                    </BaseItem>
                    <BaseButton 
                      rounded 
                      block 
                      onPress={() => this.addExercise() }>
                      <Text>Save</Text>
                    </BaseButton>
                </Form>
              </ScrollView>
          </Overlay>

            <Header>
              <Left>
                  <Button transparent onPress={() => this.props.navigation.openDrawer()} >
                    <Icon name='menu' />
                  </Button>
              </Left>

              <Body>
                  <Title>My Database</Title>
              </Body>
            </Header>

            <Header searchBar rounded>
                <BaseItem>
                  <Icon name="md-search" />
                  <Input placeholder="Search" />
                  <Icon name="md-send" onPress={() => console.log('Searching...')} />
                </BaseItem>
            </Header>

            <Separator style={{ height: 2, flex: 0 }} ></Separator>

            {/* FlatList of Exercises */}
            <FlatList
              data={this.state.FlatListItems}
              extraData={this.state.refresh}
              renderItem={({ item }) =>
                  <ExerciseItem
                      exercise_id={item.id}
                      name={item.name}
                      category={item.category}
                      minutes={item.minutes}
                      cals_burnt_per_min={item.cals_burnt_per_min}
                      total_cals={item.total_cals}
                      sets={item.sets}
                      reps={item.reps}
                      distance={item.distance}
                      speed={item.speed}
                      removeExercise={this.removeExercise.bind(this)}
                  />}
              keyExtractor={item => item.id.toString() }
            />

            <BaseButton 
                block 
                onPress={ () => this.setState({addOverlayVisible: true})}
              >
                <Text>Create an Exercise</Text>
            </BaseButton>

          </Container>
        </StyleProvider>
      </SafeAreaView>
    );
  }
};

export default AddFood;