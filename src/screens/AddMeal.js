import React,{ Component } from 'react';
import { ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Overlay } from 'react-native-elements';

// Most layout elements provided by Native-Base library
import { StyleProvider, Content, Container, Header, Footer, Left, Body, Right, Button, Icon, Title,
  FooterTab, Text, Card, CardItem, Grid, Col, Row, Separator, Segment, Input, Form, View,
  Label, Item as BaseItem, Button as BaseButton, Picker
} from 'native-base';

// Importing the realm database and custom schemas
import Realm from 'realm';
import FoodSchema from '../../realm/FoodSchema';
import MealSchema from '../../realm/MealSchema';
import ExerciseSchema from '../../realm/ExerciseSchema';
import DiarySchema from '../../realm/DiarySchema';
import User from '../../realm/User';

// Importing custom components
import MealItem from '../components/MealItem';

// Custom styling
import styles from '../../styles/styles';
import getTheme from '../../native-base-theme/components';
import custom from '../../native-base-theme/variables/custom';

// Open the existing realm database
let realm = new Realm({ schema: [FoodSchema, MealSchema, ExerciseSchema, DiarySchema, User] });
var meals = realm.objects('Meal'); // All meals in database
var foods = realm.objects('Food');
console.log(meals)

class AddMeal extends Component {

  constructor(props) {
    super(props);
      this.state = 
      { 
        FlatListItems: meals,
        refresh: false, // toggled to force the FlatList to refresh
        addOverlayVisible: false,
        id: 0,
        name: 'New Meal',
        mealItems: new Array(5),
      };
  };

  handleName = (text) => {
    this.setState({ name: text })
  };

  handleMealItems = (text) => {
    this.setState({ mealItems: text })
  };

  // Function for adding a food to the database
  addMeal = (name, mealItems) => {
    var validMealItems = [];
    // Loop through and check for valid objects
    for (var i = 0; i < 5; i++) {
      if (this.state.mealItems[i] != undefined) {
        console.log('Item', i, this.state.mealItems[i].name)
        validMealItems.push(this.state.mealItems[i]);
      }
    }
    console.log(validMealItems);
    realm.beginTransaction();
    realm.create(
      'Meal',
      {
        id: (Math.random() * 10000 + 1),
        name: this.state.name,
        mealItems: validMealItems,
      }
    );
    realm.commitTransaction();
    this.refreshHandler();
    this.setState({ addOverlayVisible: false });
    this.setState({mealItems: new Array(5) });
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

  removeMeal = ( meal_id ) => {
    realm.beginTransaction();
    realm.delete(
        realm.objects('Meal').filtered('id=' + meal_id)
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
                  Please input the meal items.
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
                      <Label>Item 1:</Label>
                      <Picker 
                        selectedValue={this.state.PickerValue}
                        onValueChange={(itemValue, itemIndex) => {
                          this.setState({ PickerValue: itemValue });
                          const newItem = this.state.mealItems.slice()
                          newItem[0] = itemValue
                          this.setState({ mealItems: newItem });
                          console.log('Item Value = ', itemValue);
                          }
                        }
                      >
                        {/* Map the food database to the picker */}
                        <Picker.Item label='Please select an option...' value='0' />
                        { foods.map( food => <Picker.Item key={food.id} label={food.name} value={food} />) }
                      </Picker>
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Item 2:</Label>
                      <Picker 
                        selectedValue={this.state.PickerValue}
                        onValueChange={(itemValue, itemIndex) => {
                          this.setState({ PickerValue: itemValue });
                          const newItem = this.state.mealItems.slice()
                          newItem[1] = itemValue
                          this.setState({ mealItems: newItem });
                          }
                        }
                      >
                        <Picker.Item label='Please select an option...' value='0' />
                        { foods.map( food => <Picker.Item key={food.id} label={food.name} value={food} />) }
                      </Picker>
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Item 3:</Label>
                      <Picker 
                        selectedValue={this.state.PickerValue}
                        onValueChange={(itemValue, itemIndex) => {
                          this.setState({ PickerValue: itemValue });
                          const newItem = this.state.mealItems.slice()
                          newItem[2] = itemValue
                          this.setState({ mealItems: newItem });
                          }
                        }
                      >
                        <Picker.Item label='Please select an option...' value='0' />
                        { foods.map( food => <Picker.Item key={food.id} label={food.name} value={food} />) }
                      </Picker>
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Item 4:</Label>
                      <Picker 
                        selectedValue={this.state.PickerValue}
                        onValueChange={(itemValue, itemIndex) => {
                          this.setState({ PickerValue: itemValue });
                          const newItem = this.state.mealItems.slice()
                          newItem[3] = itemValue
                          this.setState({ mealItems: newItem });
                          }
                        }
                      >
                        <Picker.Item label='Please select an option...' value='0' />
                        { foods.map( food => <Picker.Item key={food.id} label={food.name} value={food} />) }
                      </Picker>
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Item 5:</Label>
                      <Picker 
                        selectedValue={this.state.PickerValue}
                        onValueChange={(itemValue, itemIndex) => {
                          this.setState({ PickerValue: itemValue });
                          const newItem = this.state.mealItems.slice()
                          newItem[4] = itemValue
                          this.setState({ mealItems: newItem });
                          }
                        }
                      >
                        <Picker.Item label='Please select an option...' value='0' />
                        { foods.map( food => <Picker.Item key={food.id} label={food.name} value={food} />) }
                      </Picker>
                    </BaseItem>

                    <Text>MEAL:</Text>

                    <Text> 
                      {this.state.mealItems[0] != undefined ? this.state.mealItems[0].name : ''}
                      {this.state.mealItems[0] != undefined 
                        ? '\n  Protein:  ' + this.state.mealItems[0].protein
                          + ',  Carbs:  ' + this.state.mealItems[0].carbs
                          + ',  Fat:  ' + this.state.mealItems[0].fat
                        : ''}
                    </Text>

                    <Text> 
                      {this.state.mealItems[1] != undefined ? this.state.mealItems[1].name : ''}
                      {this.state.mealItems[1] != undefined 
                        ? '\n  Protein:  ' + this.state.mealItems[1].protein
                          + ',  Carbs:  ' + this.state.mealItems[1].carbs
                          + ',  Fat:  ' + this.state.mealItems[1].fat
                        : ''}
                    </Text>

                    <Text> 
                      {this.state.mealItems[2] != undefined ? this.state.mealItems[2].name : ''}
                      {this.state.mealItems[2] != undefined 
                        ? '\n  Protein:  ' + this.state.mealItems[2].protein
                          + ',  Carbs:  ' + this.state.mealItems[2].carbs
                          + ',  Fat:  ' + this.state.mealItems[2].fat
                        : ''}
                    </Text>

                    <Text> 
                      {this.state.mealItems[3] != undefined ? this.state.mealItems[3].name : ''}
                      {this.state.mealItems[3] != undefined 
                        ? '\n  Protein:  ' + this.state.mealItems[3].protein
                          + ',  Carbs:  ' + this.state.mealItems[3].carbs
                          + ',  Fat:  ' + this.state.mealItems[3].fat
                        : ''}
                    </Text>

                    <Text> 
                      {this.state.mealItems[4] != undefined ? this.state.mealItems[4].name : ''}
                      {this.state.mealItems[4] != undefined 
                        ? '\n  Protein:  ' + this.state.mealItems[4].protein
                          + ',  Carbs:  ' + this.state.mealItems[4].carbs
                          + ',  Fat:  ' + this.state.mealItems[4].fat
                        : ''}
                    </Text>

                    <Text></Text>

                    <BaseButton 
                      rounded 
                      block 
                      onPress={() => this.addMeal() }>
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

            {/* FlatList of Meal entries */}
            <FlatList
              data={this.state.FlatListItems}
              extraData={this.state.refresh}
              renderItem={({ item }) =>
                  <MealItem
                      meal_id={item.id}
                      name={item.name}
                      category={item.category}
                      mealItems={item.mealItems}
                      removeMeal={this.removeMeal.bind(this)}
                  />}
              keyExtractor={item => item.id.toString() }
            />

            <BaseButton 
                block 
                onPress={ () => this.setState({addOverlayVisible: true})}
              >
                <Text>Create a Meal</Text>
            </BaseButton>

          </Container>
        </StyleProvider>
      </SafeAreaView>
    );
  }
};

export default AddMeal;