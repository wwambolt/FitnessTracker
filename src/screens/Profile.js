import React, { Component } from 'react';
import { Alert, SafeAreaView } from 'react-native';

// Most layout elements provided by Native-Base library
import { StyleProvider, Content, Container, Header, Footer, Left, Body, Right, Button, Icon, Title,
         FooterTab, Text, Separator, Card, CardItem, Grid, Col, Row
       } from 'native-base';

// Nice pre-made avatar component
import { Avatar } from 'react-native-elements';

// Importing the realm database and custom schemas
import Realm from 'realm';
import FoodSchema from '../../realm/FoodSchema';
import MealSchema from '../../realm/MealSchema';
import ExerciseSchema from '../../realm/ExerciseSchema';
import DiarySchema from '../../realm/DiarySchema';
import User from '../../realm/User';

// Custom components
import StatsCard from '../components/StatsCard';
import ProgressCard from '../components/ProgressCard'
import NutrGoalsCard from '../components/NutrGoalsCard';
import FitnGoalsCard from '../components/FitnGoalsCard';

// Custom styling
import styles from '../../styles/styles';
import getTheme from '../../native-base-theme/components';
import custom from '../../native-base-theme/variables/custom';

import { avatar_01 } from '../../assets/images';

// Open the existing realm database
let realm = new Realm({ schema: [FoodSchema, MealSchema, ExerciseSchema, DiarySchema, User] });
let profile = realm.objects('User');

class Profile extends Component {
    static navigationOptions = {
      drawerLabel: 'Profile',
      header: null,
    };

    render() {

      return (
        <SafeAreaView style={ styles.container } >
          <StyleProvider style={getTheme(custom)}>
            <Container>

              <Header>
                  <Left>
                      <Button transparent onPress={() => this.props.navigation.openDrawer()} >
                        <Icon name='menu' />
                      </Button>
                  </Left>
                  <Body style={{ marginLeft: '4%' }} >
                      <Title>Profile</Title>
                  </Body>
                  <Right style={{ marginRight: '4%' }} >
                    <Avatar rounded source={ avatar_01 }/>
                  </Right>
              </Header>

              <Content>
                <StatsCard 
                  name={profile[0].fullName} 
                  sex={profile[0].sex} 
                  age={profile[0].age} 
                  height={profile[0].height} 
                  startweight={profile[0].starting_weight} 
                  currweight={profile[0].current_weight}  
                  bmr={profile[0].bmr} 
                  tdee={profile[0].tdee} 
                />
                <ProgressCard />

                <NutrGoalsCard 
                  goalweight={profile[0].goal_weight}
                  goalcals={profile[0].daily_calories}
                  goalprot={profile[0].daily_protein}
                  goalcarb={profile[0].daily_carbs}
                  goalfat={profile[0].daily_fat}
                  goalwater={profile[0].daily_water}
                />
                <FitnGoalsCard 
                  workouts_per_week={profile[0].workouts_per_week} 
                  mins_per_workout={profile[0].mins_per_workout}
                  steps_per_day={profile[0].steps_per_day}
                />
              </Content>
            </Container>
          </StyleProvider>
        </SafeAreaView>
      );
  }

}

export default Profile;