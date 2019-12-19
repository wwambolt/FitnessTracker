import React, { Component } from 'react';

// Most layout elements provided by Native-Base library
import { Card, CardItem, Text, Separator, Col
  } from 'native-base';

// Props passed into the component
// - goalweight
// - goalcals
// - goalprot
// - goalcarb
// - goalfat
// - goalwater

NutrGoalsCard = ( props ) => {
      return (
        <Card>
            <CardItem header>
              <Text>Nutrition Goals</Text>
            </CardItem>
            <Separator style={{ height: 2, flex: 0 }} ></Separator>
            <CardItem>
              <Col>
                <Text>Goal Weight:  {props.goalweight} kg</Text>
                <Text>Daily Calories:  {props.goalcals} cals</Text>
                <Text>Daily Protein:  {props.goalprot} g</Text>
                <Text>Daily Carbs:  {props.goalcarb} g</Text>
                <Text>Daily Fat:  {props.goalfat} g</Text>
                <Text>Daily Water:  {props.goalwater} cups</Text>
              </Col>
            </CardItem>
        </Card>
      )
};

export default NutrGoalsCard;