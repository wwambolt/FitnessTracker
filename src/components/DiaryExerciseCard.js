import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Card, CardItem, Text, Separator, Button, Icon, List } from 'native-base';

DiaryExerciseCard = ( props ) => {

  var totalCals = props.list.reduce(function(prev, cur) {
    return prev + cur.total_cals;
  }, 0);

  var totalMins = props.list.reduce(function(prev, cur) {
    return prev + cur.minutes;
  }, 0);

    return (
        <Card>
          <CardItem header>
            <Text>{props.title}</Text>
          </CardItem>
          <Separator style={{ height: 2 }} ></Separator>

          {/* List for displaying items*/}
          <CardItem body>
            <List>
              {props.list.map(function(item, index) {
                return (
                <View key={index} >
                <Text key={index} >
                    {item.name}{'\n  '}
                    Minutes: {item.minutes},  Cals/Min: {item.cals_burnt_per_min},{'\n  '}
                    Total cals burnt: {item.total_cals},  Sets: {item.sets},  Reps: {item.reps}
                </Text>
                </View>
                );
              })}
            </List>
          </CardItem>

          <View style={{ backgroundColor: '#f0f0f0'  }}>
            <Text>Totals</Text>
            <Text>  Calories burnt: {totalCals},  Minutes spent: {totalMins}</Text>
          </View>
          
          <Separator style={{ height: 2 }} ></Separator>
          <CardItem footer style={{ height: 40, backgroundColor: '#f0f0f0' }} >
            <Button leftIcon transparent onPress={props.footerPress} >
              <Icon type='AntDesign' name="pluscircle" />
              <Text>{props.footer}</Text>
            </Button>
          </CardItem>
        </Card>
    )
}

export default DiaryExerciseCard;