import React, { Component } from 'react';
import { ScrollView, Image, View } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { Grid, Col, Row, H2, H3 } from 'native-base';

// Custom styling
import styles from '../../styles/styles';
import { logo_white } from '../../assets/images.js';

// Importing the realm database and custom schemas
import Realm from 'realm';
import FoodSchema from '../../realm/FoodSchema';
import MealSchema from '../../realm/MealSchema';
import ExerciseSchema from '../../realm/ExerciseSchema';
import DiarySchema from '../../realm/DiarySchema';
import User from '../../realm/User';

// Open the existing realm database
let realm = new Realm({ schema: [FoodSchema, MealSchema, ExerciseSchema, DiarySchema, User] });
var profile = realm.objects('User');

DrawerHeader = ( props ) => {
    return (
        <ScrollView>
            <Grid style={{ ...styles.customDrawerHeader, flex: 1, height: 100 }}>
                <Col style={ styles.logo_container }>
                    <Image 
                        source={logo_white} 
                        style={ styles.logo_64px } >
                    </Image>
                </Col>
                <Col style={{ justifyContent: 'center', flex: 2}} >
                    <H3 style={{ color: 'grey' }} >Hello,</H3>
                    <H2 style={{ 
                        color: '#fff', 
                        fontWeight: 'bold' 
                    }} >{profile[0].first_name}</H2>
                </Col>
            </Grid>
            <DrawerItems {...props} />
        </ScrollView>
    )
};

export default DrawerHeader;