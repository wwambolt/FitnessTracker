import React, { Component } from 'react';
import { Alert, SafeAreaView, Image } from 'react-native';

// Most layout elements provided by Native-Base library
import { StyleProvider, Content, Container, Header, Footer, Left, Body, Right, Button, Icon, Title,
    FooterTab, Text, Card, CardItem, Grid, Col, Row, Separator, List, View, Form, Input, Label, Item
  } from 'native-base';

// Props passed in
// - steps_count - for steps quantity

DiaryStepsCard = ( props ) => {

    var FootprintStyle = { fontSize: 48, color: 'black' }

    // Make footprint green when you hit step goal
    if (props.steps_count >= 10000 ) {
        FootprintStyle = { fontSize: 48, color: '#73a657'  }
    };

    return (
        <Card>
            <CardItem header>
            <Text>Steps</Text>
            </CardItem>
            <Separator style={{ height: 2 }} ></Separator>
            <CardItem style={{ flex: 1, backgroundColor: '#f0f0f0' }} >
                <View style={{ flex: 1, flexDirection: 'row' , alignItems: 'baseline'}} >
                {/* 
                Need to wrap text and icons in another text field to apply
                "alignItems: 'baseline' properly
                */}
                <Text>
                <Icon type='Foundation' name='foot' style={ FootprintStyle } />
                {/* Please not deliberate use of spaces in these texts */}
                <Text style={{ fontSize: 36 }}>  {props.steps_count}</Text>
                <Text style={{ fontSize: 16, color: '#828282' }}>  steps</Text>
                </Text>
                </View>
            
                <Form style={{ flex: 0.66 }} >
                    <Item stackedLabel>
                        <Label style={{ color: '#800020' }} >Steps:</Label>
                        <Input placeholder='0...' 
                               placeholderTextColor='#E4D5D9'
                               keyboardType='numeric'
                               style={{ color: '#800020' }}
                               value={props.steps_count.toString()}
                               onChangeText={props.onChangeValue}
                        />
                    </Item>
                </Form>

            </CardItem>
        </Card>
    )
};

export default DiaryStepsCard;