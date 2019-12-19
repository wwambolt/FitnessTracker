import React, { Component } from 'react';

// Most layout elements provided by Native-Base library
import { Card, CardItem, Text, Separator
  } from 'native-base';

ProgressCard = ( props ) => {
    return (
       <Card>
        <CardItem header>
          <Text>Progress</Text>
        </CardItem>
        <Separator style={{ height: 2, flex: 0 }} ></Separator>
        <CardItem>
          <Text>CHART WILL GO HERE</Text>
        </CardItem>
      </Card>
    )
}

export default ProgressCard;