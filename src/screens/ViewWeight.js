import React, { Component } from 'react';
import { Alert, SafeAreaView, FlatList } from 'react-native';

// Most layout elements provided by Native-Base library
import { StyleProvider, Content, Container, Header, Footer, Left, Body, Right, Button, Icon, Title,
  FooterTab, Text, Card, CardItem, Grid, Col, Row, Separator, List, View, Segment, Item, Input
} from 'native-base';

// Importing the realm database and custom schemas
import Realm from 'realm';
import FoodSchema from '../../realm/FoodSchema';
import MealSchema from '../../realm/MealSchema';
import ExerciseSchema from '../../realm/ExerciseSchema';
import DiarySchema from '../../realm/DiarySchema';
import User from '../../realm/User';

// Custom styling
import styles from '../../styles/styles';
import getTheme from '../../native-base-theme/components';
import custom from '../../native-base-theme/variables/custom';

import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

// Open the existing realm database and the diary entries to grab the stats from
let realm = new Realm({ schema: [FoodSchema, MealSchema, ExerciseSchema, DiarySchema, User] });
var logs = realm.objects('DiaryEntry');
var newArray;

for (var i = 0; i < logs.length; i++)
{
  console.log(logs[i].creation_date);
  console.log(logs[i].weight_log);
}

class ViewWeight extends Component{

  ComponentDidMount = () => {
    console.log('TEST');
  }

  constructor(props) {
    super(props);
    this.state = {
      refresh: false
    }
    this.refreshList = this.refreshList.bind(this);
  }

  refreshList = () => {
    this.setState({refresh: !this.state.refresh});
  }

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

                <Body>
                    <Title>My Progress</Title>
                </Body>
            </Header>

            <VictoryChart height={175} width={350} theme={VictoryTheme.material}>
              <VictoryBar data={logs} x="creation_date" y="weight_log" />
            </VictoryChart>

            <Button onPress={() => this.refreshList() } style={{ justifyContent: 'center' }}>
              <Text>Refresh</Text>
            </Button>

            <FlatList
              data={logs.filtered('weight_log != 0 ')}
              extraData={logs}
              renderItem={({ item }) =>
                <Card>
                  <CardItem header style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1 }}>{item.creation_date}</Text>
                    <Text>  Weight: {item.weight_log} kg</Text>
                  </CardItem>
                </Card>
                }
                keyExtractor={item => item.creation_date }
            />

        </Container>
      </StyleProvider>
    </SafeAreaView>
    )
  }
}

export default ViewWeight;