import React, { Component } from 'react';

// Most layout elements provided by Native-Base library
import { Card, CardItem, Text, Separator, Col
  } from 'native-base';

// Props passed into the component
// weekly_workouts
// mins_per_workout
// steps_per_day

NutrGoalsCard = ( props ) => {
      return (
        <Card>
            <CardItem header>
              <Text>Fitness Goals</Text>
            </CardItem>
            <Separator style={{ height: 2, flex: 0 }} ></Separator>
            <CardItem>
              <Col>
                <Text>Workouts / Week:  {props.workouts_per_week}</Text>
                <Text>Minutes / Workout:  {props.mins_per_workout}</Text>
                <Text>Steps / Day:  {props.steps_per_day}</Text>
              </Col>
            </CardItem>
        </Card>
      )
};

export default NutrGoalsCard;