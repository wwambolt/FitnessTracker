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
import Item from '../components/Item';

// Custom styling
import styles from '../../styles/styles';
import getTheme from '../../native-base-theme/components';
import custom from '../../native-base-theme/variables/custom';

// Open the existing realm database
let realm = new Realm({ schema: [FoodSchema, MealSchema, ExerciseSchema, DiarySchema, User] });
var foods = realm.objects('Food'); // All foods in database
console.log(foods)

class AddFood extends Component {

  constructor(props) {
    super(props);
      this.state = 
      { 
        FlatListItems: foods,
        refresh: false, // toggled to force the FlatList to refresh
        addOverlayVisible: false,
        id: 0,
        name: 'New Food',
        category: 'New Category',
        servings: 0,
        serving_size: 0,
        cals_per_serving: 0,
        fat: 0,
        saturated_fat: 0,
        trans_fat: 0,
        carbs: 0,
        fibre: 0,
        sugars: 0,
        protein: 0,
        cholesterol: 0,
        sodium: 0,
        potassium: 0,
        calcium: 0,
        iron: 0,
      };
  };

  handleName = (text) => {
    this.setState({ name: text })
  };
  handleCategory = (text) => {
    this.setState({ category: text })
  };
  handleServings = (text) => {
    this.setState({ servings: text })
  };
  handleServingSize = (text) => {
    this.setState({ serving_size: text })
  };
  handleCalsPerServ = (text) => {
    this.setState({ cals_per_serving: text })
  };
  handleFat = (text) => {
    this.setState({ fat: text })
  };
  handleSatFat= (text) => {
    this.setState({ saturated_fat: text })
  };
  handleTransFat = (text) => {
    this.setState({ trans_fat: text })
  };
  handleCarbs = (text) => {
    this.setState({ carbs: text })
  };
  handleFibre = (text) => {
    this.setState({ fibre: text })
  };
  handleSugars = (text) => {
    this.setState({ sugars: text })
  };
  handleProtein = (text) => {
    this.setState({ protein: text })
  };
  handleCholesterol = (text) => {
    this.setState({ cholesterol: text })
  };
  handleSodium = (text) => {
    this.setState({ sodium: text })
  };
  handlePotassium = (text) => {
    this.setState({ potassium: text })
  };
  handleCalcium = (text) => {
    this.setState({ calcium: text })
  };
  handleIron = (text) => {
    this.setState({ iron: text })
  };

  // Function for adding a food to the database
  addFood = (name, category, servings, serving_size, cals_per_serving, fat,
    saturated_fat, trans_fat, carbs, fibre, sugars, protein, cholesterol,
    sodium, potassium, calcium, iron) => {
    realm.beginTransaction();
    realm.create(
      'Food',
      {
        id: (Math.random() * 10000 + 1),
        name: this.state.name,
        category: this.state.category,
        servings: parseFloat(this.state.servings),
        serving_size: parseFloat(this.state.serving_size),
        cals_per_serving: parseFloat(this.state.cals_per_serving),
        fat: parseFloat(this.state.fat),
        saturated_fat: parseFloat(this.state.saturated_fat),
        trans_fat: parseFloat(this.state.trans_fat),
        carbs: parseFloat(this.state.carbs),
        fibre: parseFloat(this.state.fibre),
        sugars: parseFloat(this.state.sugars),
        protein: parseFloat(this.state.protein),
        cholesterol: parseFloat(this.state.cholesterol),
        sodium: parseFloat(this.state.sodium),
        potassium: parseFloat(this.state.potassium),
        calcium: parseFloat(this.state.calcium),
        iron: parseFloat(this.state.iron),
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

  removeFood = ( food_id ) => {
    realm.beginTransaction();
    realm.delete(
        realm.objects('Food').filtered('id=' + food_id)
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
                  Please input the food statistics.
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
                      <Label>Servings</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleServings( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Serving Size</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleServingSize( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Calories</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleCalsPerServ( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Fat</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleFat( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Sat. Fat</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleSatFat( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Trans fat</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleTransFat( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Carbs.</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleCarbs( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Fibre</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleFibre( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Sugars</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleSugars( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Protein</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleProtein( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Cholesterol</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleCholesterol( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Sodium</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleSodium( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Potassium</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handlePotassium( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }} >
                      <Label>Calcium</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleCalcium( value ) }
                      />
                    </BaseItem>
                    <BaseItem fixedLabel regular style={{ marginBottom: 6 }}>
                      <Label>Iron</Label>
                      <Input 
                        keyboardType='numeric'
                        style={{ backgroundColor: '#d9d9d9' }}
                        onChangeText={ (value) => this.handleIron( value ) }
                      />
                    </BaseItem>
                    <BaseButton 
                      rounded 
                      block 
                      onPress={() => this.addFood() }>
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

            {/* FlatList of Food Items */}
            <FlatList
              data={this.state.FlatListItems}
              extraData={this.state.refresh}
              renderItem={({ item }) =>
                  <Item
                      food_id={item.id}
                      name={item.name}
                      category={item.category}
                      servings={item.servings}
                      serving_size={item.serving_size}
                      cals_per_serving={item.cals_per_serving}
                      fat={item.fat}
                      saturated_fat={item.saturated_fat}
                      trans_fat={item.trans_fat}
                      carbs={item.carbs}
                      fibre={item.fibre}
                      sugars={item.sugars}
                      protein={item.protein}
                      cholesterol={item.cholesterol}
                      sodium={item.sodium}
                      potassium={item.potassium}
                      calcium={item.calcium}
                      iron={item.iron}
                      removeFood={this.removeFood.bind(this)}
                  />}
              keyExtractor={item => item.id.toString() }
            />

            <BaseButton 
                block 
                onPress={ () => this.setState({addOverlayVisible: true})}
              >
                <Text>Create a Food</Text>
            </BaseButton>

          </Container>
        </StyleProvider>
      </SafeAreaView>
    );
  }
};

export default AddFood;