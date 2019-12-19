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
function Item( props ) {
  const[detailModalVisibility, setVisibility] = useState(false)

  return (
    <>
    {/* Details overlay in the form of a nutrition label */}
    <Overlay
      isVisible={detailModalVisibility}
      onBackdropPress={ () => setVisibility(false) }
    >
      <ScrollView>
        <H1>Nutrition Facts</H1>
        <H2>{props.name}</H2>
        <H3>{props.category}</H3>
        <H3>Per {props.servings} serving ({props.serving_size} g/ml)</H3>

        <Separator style={{ height: 2, backgroundColor: 'black' }} />
        
        <Row style={{ flex: 1 }}>
          <Col style={{ flex: 0.5 }}>
            <H3 style={{ marginTop: 6 }} >Calories {props.cals_per_serving}</H3>
            <Separator style={{ height: 6, backgroundColor: 'black' }} />
          </Col>
        </Row>

        <Text>Fat {props.fat} g</Text>
        <Text>  Saturated {props.saturated_fat} g</Text>
        <Text>  + Trans {props.trans_fat} g</Text>

        <Separator style={{ height: 2, backgroundColor: 'black' }} />
        <Text>Carbohydrate {props.carbs} g</Text>
        <Text>  Fibre {props.fibre} g</Text>
        <Text>  Sugars {props.sugars} g</Text>

        <Separator style={{ height: 2, backgroundColor: 'black' }} />
        <Text>Protein {props.protein} g</Text>

        <Separator style={{ height: 2, backgroundColor: 'black' }} />
        <Text>Cholesterol {props.cholesterol} mg</Text>

        <Separator style={{ height: 2, backgroundColor: 'black' }} />
        <Text>Sodium {props.sodium} mg</Text>

        <Separator style={{ height: 8, backgroundColor: 'black' }} />
        <Text>Potassium {props.potassium} mg</Text>
        <Text>Calcium {props.calcium} mg</Text>
        <Text>Iron {props.iron} mg</Text>
      </ScrollView>
    </Overlay>

    <Card>
      <CardItem header style={{flex: 1 }}>
        <H3 style={{ flex: 8 }} >{props.name}</H3>
        <H3 style={{ flex: 1} }>{props.cals_per_serving}</H3>
      </CardItem>
      <CardItem style={{ height: 26, flex: 1 }}>
        <Text style={{ flex: 9 }}>Fat:{props.fat},  Carbs:{props.carbs},  Protein:{props.protein}</Text>
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
          onPress={ () => props.removeFood(props.food_id)}
          style={{ flex: 1 }}
        >
          <Text style={{ color: 'white' }} >Remove</Text>
        </Button>
      </CardItem>
    </Card>
    </>
  );
}

export default Item;