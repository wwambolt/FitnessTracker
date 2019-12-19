import React, { Component } from 'react';
import { Alert, SafeAreaView, Image } from 'react-native';

// Most layout elements provided by Native-Base library
import { StyleProvider, Content, Container, Header, Footer, Left, Body, Right, Button, Icon, Title,
    FooterTab, Text, Card, CardItem, Grid, Col, Row, Separator, List, View
  } from 'native-base';

// Props passed in
// - water_qty - for water quantity
// - plusPress - when plus button pressed
// - minusPress - when minus button pressed

const HEALTHY_WATER_INTAKE = 8

DiaryWaterCard = ( props ) => {

    var DropletStyle = { fontSize: 48, color: 'black' }

    // Changes the water droplet blue when you reach 8 cups
    if (props.water_qty >= HEALTHY_WATER_INTAKE ) {
        DropletStyle = { fontSize: 48, color: 'skyblue'  }
    };

    return (
        <Card>
            <CardItem header>
            <Text>Water</Text>
            </CardItem>
            <Separator style={{ height: 2 }} ></Separator>
            <CardItem style={{ flex: 1, backgroundColor: '#f0f0f0' }} >
                <View style={{ flex: 1.5, flexDirection: 'row' , alignItems: 'baseline'}} >
                {/* 
                Need to wrap text and icons in another text field to apply
                "alignItems: 'baseline' properly
                */}
                <Text>
                <Icon name="md-water" style={ DropletStyle } />
                {/* Please not deliberate use of spaces in these texts */}
                <Text style={{ fontSize: 36 }}>  {props.water_qty}</Text>
                <Text style={{ fontSize: 16, color: '#828282' }}>  cups</Text>
                </Text>
                </View>
            <Button rounded style={{ flex: 1 }} onPress={props.plusPress} >
                <Icon type='AntDesign' name="plus" />
            </Button>
            <Button rounded style={{ flex: 1 }} onPress={props.minusPress} >
                <Icon type='AntDesign' name="minus" />
            </Button>
            </CardItem>
        </Card>
    )
};

export default DiaryWaterCard;