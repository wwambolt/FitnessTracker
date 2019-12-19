import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay } from 'react-native-elements';

import { StyleProvider, H1, H2, H3, Separator, Row, Col, Card, 
  CardItem, Button, 
} from 'native-base';

// Custom styling
import styles from '../../styles/styles';
import getTheme from '../../native-base-theme/components';
import custom from '../../native-base-theme/variables/custom';

// Creating a functional Item component to be rendered by
// renderItem prop in the flatlist
function ExerciseItem( props ) {
  const[detailModalVisibility, setVisibility] = useState(false)

  return (
    <>
    {/* Details overlay in the form of a nutrition label */}
    <Overlay
      isVisible={detailModalVisibility}
      onBackdropPress={ () => setVisibility(false) }
    >
      <ScrollView>
        <H1>Exercise</H1>
        <H2>{props.name}</H2>
        <H3>{props.category}</H3>
    
        <Separator style={{ height: 2, backgroundColor: 'black' }} />

        <Text style={{ marginTop: 6 }}>Calories burnt per min:  {props.cals_burnt_per_min}</Text>
        <Text>Exercise minutes:  {props.minutes}</Text>
        <Text>Total calories burnt per session: { props.total_cals}</Text>
        <Text>Target sets:  {props.sets}</Text>
        <Text>Target reps:  {props.reps}</Text>
        <Text>Target distance:  {props.distance}</Text>
        <Text>Target speed:  {props.speed}</Text>
        
      </ScrollView>
    </Overlay>

    <Card>
      <CardItem header style={{flex: 1 }}>
        <H3 style={{ flex: 8 }} >{props.name}</H3>
        <H3 style={{ flex: 1} }>{props.cals_per_serving}</H3>
      </CardItem>
      <CardItem style={{ height: 26, flex: 1 }}>
  <Text style={{ flex: 9 }}>{props.category}</Text>
      </CardItem>
      <CardItem footer style={{flex: 1 }}>
        <Button 
          full rounded
          onPress={ () => setVisibility(true) }
          style={{ flex: 1 }}
        >
          <Text style={{ color: 'white' }} >Details</Text>
        </Button>

        <Button 
          full rounded
          onPress={ () => props.removeExercise(props.exercise_id)}
          style={{ flex: 1 }}
        >
          <Text style={{ color: 'white' }} >Remove</Text>
        </Button>
      </CardItem>
    </Card>
    </>
  );
}

export default ExerciseItem;