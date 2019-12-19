import React, { Component } from 'react';
import { Alert, SafeAreaView, Image } from 'react-native';

// Most layout elements provided by Native-Base library
import { StyleProvider, Content, Container, Header, Footer, Left, Body, Right, Button, Icon, Title,
         FooterTab, Text, Card, CardItem, Grid, Col, Separator
       } from 'native-base';

// image assets must be imported from file to work NativeBase image component
import { home_01, home_02, home_03 } from '../../assets/images';

// Custom Components
import About from './About';

// Custom styling
import styles from '../../styles/styles';
import getTheme from '../../native-base-theme/components';
import custom from '../../native-base-theme/variables/custom';

import AsyncStorage from '@react-native-community/async-storage';

class Home extends Component {
    static navigationOptions = {
      drawerLabel: 'Home',
      header: null,
    };

    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };

    render() {

      return (
        <SafeAreaView style={ styles.container } >
            <StyleProvider style={getTheme(custom)}>
            <Container>

                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()} >
                          <Icon name='menu' />
                        </Button>
                    </Left>

                    <Body>
                        <Title>MyVigourFriend</Title>
                    </Body>

                    <Right>
                        <Button vertical transparent onPress={() => this.props.navigation.navigate("About")} >
                            <Icon type='AntDesign' name='infocirlce' />
                        </Button>
                    </Right>
                </Header>

                <Content>
                  
                  <Card>
                    <Button 
                      style={{ justifyContent: 'center' }}
                      onPress={this._signOutAsync}
                    >
                      <Text>Update Profile</Text>
                    </Button>
                  </Card>

                  <Card>
                    <CardItem header >
                      <Text>Keep track of your hard work!</Text>
                    </CardItem>
                    <CardItem cardBody>
                      <Image source={home_01} style={{height: 150, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem footer style={{ height: 40, backgroundColor: '#f0f0f0' }} >
                      <Button transparent>
                        <Icon active type='AntDesign' name="pluscircle" />
                        <Text>Press here to learn more.</Text>
                      </Button>
                    </CardItem>
                  </Card>

                  <Card>
                    <CardItem header >
                      <Text>Create your own definition of success!</Text>
                    </CardItem>
                    <CardItem cardBody>
                      <Image source={home_02} style={{height: 150, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem footer style={{ height: 40, backgroundColor: '#f0f0f0' }} >
                      <Button transparent>
                        <Icon active type='AntDesign' name="pluscircle" />
                        <Text>Press here to learn more.</Text>
                      </Button>
                    </CardItem>
                  </Card>

                  <Card>
                    <CardItem header >
                      <Text>Better living through technology!</Text>
                    </CardItem>
                    <CardItem cardBody>
                      <Image source={home_03} style={{height: 150, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem footer style={{ height: 40, backgroundColor: '#f0f0f0' }} >
                      <Button transparent>
                        <Icon active type='AntDesign' name="pluscircle" />
                        <Text>Press here to learn more.</Text>
                      </Button>
                    </CardItem>
                  </Card>
                </Content>
            </Container>
            </StyleProvider>
        </SafeAreaView>
      );
  }
};

export default Home;