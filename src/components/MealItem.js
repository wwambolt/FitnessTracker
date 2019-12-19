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
function MealItem( props ) {
  const[detailModalVisibility, setVisibility] = useState(false)

  return (
    <>
    {/* Details overlay in the form of a nutrition label */}
    <Overlay
      isVisible={detailModalVisibility}
      onBackdropPress={ () => setVisibility(false) }
    >
      <ScrollView>
          <H1>Meal</H1>
          <H2>{props.name}</H2>

          <Separator style={{ height: 8, backgroundColor: 'black' }} />

          <H3 style={{ marginTop: 6 }}>
            {props.mealItems[0] != undefined ? props.mealItems[0].name : ''}
          </H3>
          <Text>
            {props.mealItems[0] != undefined 
              ? '  Protein:  ' + props.mealItems[0].protein
                + ',  Carbs:  ' + props.mealItems[0].carbs
                + ',  Fat:  ' + props.mealItems[0].fat
            : '' }
          </Text>

          <H3 style={{ marginTop: 6 }}>
            {props.mealItems[1] != undefined ? props.mealItems[1].name : ''}
          </H3>
          <Text>
            {props.mealItems[1] != undefined 
              ? '  Protein:  ' + props.mealItems[1].protein
                + ',  Carbs:  ' + props.mealItems[1].carbs
                + ',  Fat:  ' + props.mealItems[1].fat
            : '' }
          </Text>

          <H3 style={{ marginTop: 6 }}>
            {props.mealItems[2] != undefined ? props.mealItems[2].name : ''}
          </H3>
          <Text>
            {props.mealItems[2] != undefined 
              ? '  Protein:  ' + props.mealItems[2].protein
                + ',  Carbs:  ' + props.mealItems[2].carbs
                + ',  Fat:  ' + props.mealItems[2].fat
            : '' }
          </Text>

          <H3 style={{ marginTop: 6 }}>
            {props.mealItems[3] != undefined ? props.mealItems[3].name : ''}
          </H3>
          <Text>
            {props.mealItems[3] != undefined 
              ? '  Protein:  ' + props.mealItems[3].protein
                + ',  Carbs:  ' + props.mealItems[3].carbs
                + ',  Fat:  ' + props.mealItems[3].fat
            : '' }
          </Text>

          <H3 style={{ marginTop: 6 }}>
            {props.mealItems[4] != undefined ? props.mealItems[4].name : ''}
          </H3>
          <Text>
            {props.mealItems[4] != undefined 
              ? '  Protein:  ' + props.mealItems[4].protein
                + ',  Carbs:  ' + props.mealItems[4].carbs
                + ',  Fat:  ' + props.mealItems[4].fat
            : '' }
          </Text>

      </ScrollView>
    </Overlay>

    <Card>
      <CardItem header style={{flex: 1 }}>
          <H3>{props.name}</H3>
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
          onPress={ () => props.removeMeal(props.meal_id)}
          style={{ flex: 1 }}
        >
          <Text style={{ color: 'white' }} >Remove</Text>
        </Button>
      </CardItem>
    </Card>
    </>
  );
}

export default MealItem;