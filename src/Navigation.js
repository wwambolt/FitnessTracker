import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { 
    createAppContainer, 
    DrawerNavigator, 
    StackNavigator, 
    BottomTabNavigator,
    createSwitchNavigator
} from 'react-navigation';

import DrawerHeader from './components/DrawerHeader';

import Home from './screens/Home';
import About from './screens/About';
import Diary from './screens/Diary';
import Profile from './screens/Profile';
import Nutrition from './screens/Nutrition';
import ViewSteps from './screens/ViewSteps';
import ViewWeight from './screens/ViewWeight';
import AddExercise from './screens/AddExercise';
import AddFood from './screens/AddFood';
import AddMeal from './screens/AddMeal';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import SignInScreen from './screens/SignInScreen';

import styles from '../styles/styles';

// Default options for the tab bars as they appear on different screens
const defaultTabBarOptions = {
    activeTintColor: '#800020',
    inactiveTintColor: 'gray',
    labelStyle: {
        fontSize: 12,
    },
    style: {
        height: 64,
        backgroundColor: '#fff',
    }
};

// Simple default options for the application drawer
const defaultDrawerOptions = {
    activeTintColor: '#800020',
    inactiveTintColor: 'gray',
};

// Simple stack navigator for the home screen
const HomeStack = createStackNavigator (
    {
        'Home': Home,
        'About': About,
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#800020',
                elevation: 0,
            },
        }
    },
);

// Tabs for the profress screen
const ProgressTabs = createBottomTabNavigator (
    {
        'Weight': {
            screen: ViewWeight,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="scale-bathroom"
                    size={30} 
                    color={tintColor} />
                )
            }
        },
        'Steps': {
            screen: ViewSteps,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="shoe-print"
                    size={30} 
                    color={tintColor} />
                )
            }
        },
    },
    {
        initialRouteName: 'Weight',
        tabBarOptions:  defaultTabBarOptions,
    },
);

// Tabs for the database screen
const DatabaseTabs = createBottomTabNavigator (
    {
        'Add Food': {
            screen: AddFood,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="food-apple"
                    size={30} 
                    color={tintColor} />
                )
            }
        },
        'Add Meal': {
            screen: AddMeal,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="food"
                    size={30} 
                    color={tintColor} />
                )
            }
        },
        'Add Exercise': {
            screen: AddExercise,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="run-fast"
                    size={30} 
                    color={tintColor} />
                )
            }
        },
    },
    {
        initialRouteName: 'Add Food',
        tabBarOptions: defaultTabBarOptions
    },
);

// The drawer navigator which appears on all screens
const MyDrawerNavigator = createDrawerNavigator( 
    {
        'Home': {
            screen: HomeStack,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon name="home"
                    size={30} 
                    color={tintColor}
                    style = { styles.drawerIcon } />
                )
            }
        },
        'Diary': {
            screen: Diary,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon name="notebook"
                    size={30} 
                    color={tintColor}
                    style = { styles.drawerIcon } />
                )
            }
        },
        'Profile': {
            screen: Profile,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon name="face-profile"
                    size={30} 
                    color={tintColor}
                    style = { styles.drawerIcon } />
                )
            }
        },
        'Nutrition': {
            screen: Nutrition,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon name="nutrition"
                    size={30} 
                    color={tintColor}
                    style = { styles.drawerIcon } />
                )
            }
        },
        'My Progress': {
            screen: ProgressTabs,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon name="chart-bar"
                    size={30} 
                    color={tintColor}
                    style = { styles.drawerIcon } />
                )
            }
        },
        'My Database': {
            screen: DatabaseTabs,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon name="database"
                    size={30} 
                    color={tintColor}
                    style = { styles.drawerIcon } />
                )
            }
        },
    },
    {
        initialRouteName: 'Home',
        contentOptions: defaultDrawerOptions,
        contentComponent: props => <DrawerHeader {...props} />
    },
);

// The stack for use with the sign-in page
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

// Simple authorization flow using a loading screen, a sign-in screen,
// and the DrawerNavigator as our entry-point
const AuthorizationFlow = createSwitchNavigator(
    {
        'AuthLoading': AuthLoadingScreen,
        'App': MyDrawerNavigator,
        'Auth': AuthStack
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

const MyApp = createAppContainer(AuthorizationFlow);

export default MyApp;