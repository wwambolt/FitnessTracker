import React, { Component } from 'react';
import { Alert, SafeAreaView } from 'react-native';

// Most layout elements provided by Native-Base library
import { Text, Separator, Card, CardItem, Col } from 'native-base';

// Props passed into this component
// - name
// - sex
// - age
// - height
// - startweight
// - currweight
// - goalweight
// - bmr
// - tdee

StatsCard = ( props ) => {
    return (
      <Card>
        <CardItem header>
          <Text>My Stats</Text>
        </CardItem>
        <Separator style={{ height: 2, flex: 0 }} ></Separator>
          <CardItem>
            <Col>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }} >{props.name}</Text>
              <Text>Sex:  {props.sex}</Text>
              <Text>Age:  {props.age}</Text>
              <Text>Height:  {props.height} cm</Text>
              <Text>Starting Weight:  {props.startweight} kg</Text>
              <Text>Current Weight:  {props.currweight} kg</Text>
              <Text>BMR:  {props.bmr} cals</Text>
              <Text>TDEE:  {props.tdee} cals</Text>
            </Col>
        </CardItem>
      </Card>
    )
};

export default StatsCard;