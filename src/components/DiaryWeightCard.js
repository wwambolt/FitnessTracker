import React, { Component } from 'react';
import { Alert, SafeAreaView, Image } from 'react-native';

// Most layout elements provided by Native-Base library
import { StyleProvider, Content, Container, Header, Footer, Left, Body, Right, Button, Icon, Title,
    FooterTab, Text, Card, CardItem, Grid, Col, Row, Separator, List, View, Form, Input, Label, Item
  } from 'native-base';

// Props passed in
// - weight- for logging weight

DiaryWeightCard = ( props ) => {
    return (
        <Card>
            <CardItem header>
            <Text>Weight</Text>
            </CardItem>
            <Separator style={{ height: 2 }} ></Separator>
            <CardItem style={{ flex: 1, backgroundColor: '#f0f0f0' }} >
                <View style={{ flex: 1, flexDirection: 'row' , alignItems: 'baseline'}} >
                {/* 
                Need to wrap text and icons in another text field to apply
                "alignItems: 'baseline' properly
                */}
                <Text>
                <Icon type='MaterialCommunityIcons' name='scale-bathroom' style={{ fontSize: 48 }} />
                {/* Please not deliberate use of spaces in these texts */}
                <Text style={{ fontSize: 36 }}>  {props.weight_log}</Text>
                <Text style={{ fontSize: 16, color: '#828282' }}>  kg</Text>
                </Text>
                </View>
            
                <Form style={{ flex: 0.66 }} >
                    <Item stackedLabel>
                        <Label style={{ color: '#800020' }} >Weight:</Label>
                        <Input placeholder='I weigh...' 
                               placeholderTextColor='#E4D5D9'
                               keyboardType='numeric'
                               style={{ color: '#800020' }}
                               value={props.weight_log.toString()}
                               onChangeText={props.onChangeValue}
                        />
                    </Item>
                </Form>

            </CardItem>
        </Card>
    )
};

export default DiaryWeightCard;