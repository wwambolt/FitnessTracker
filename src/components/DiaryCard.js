import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Card, CardItem, Text, Separator, Button, Icon, List } from 'native-base';

// Props passed in:
// - title - the header title
// - list - an interactive list of foods for the meal
// - footer - the footer text
// - footerPress - for when the add food/drink footer is tapped

DiaryCard = ( props ) => {

    // Sum nutrition of all entries in list
    var totalCals = props.list.reduce(function(prev, cur) {
      return prev + cur.cals_per_serving;
    }, 0);

    var totalProt = props.list.reduce(function(prev, cur) {
      return prev + cur.protein;
    }, 0);

    var totalCarbs = props.list.reduce(function(prev, cur) {
      return prev + cur.carbs;
    }, 0);

    var totalFat = props.list.reduce(function(prev, cur) {
      return prev + cur.fat;
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
                    Calories: {item.cals_per_serving}, Protein: {item.protein},  Carbs: {item.carbs},  Fat: {item.fat}
                </Text>
                </View>
                );
              })}
            </List>
          </CardItem>

          <View style={{ backgroundColor: '#f0f0f0'  }}>
            <Text>Totals</Text>
            <Text>  Calories: {totalCals},  Protein: {totalProt},  Carbs: {totalCarbs},  Fat: {totalFat}</Text>
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

export default DiaryCard;