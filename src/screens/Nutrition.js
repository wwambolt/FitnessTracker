import React, { Component } from 'react';
import { Alert, SafeAreaView } from 'react-native';

// Most layout elements provided by Native-Base library
import { StyleProvider, Content, Container, Header, Footer, Left, Body, Right, Button, Icon, Title,
  FooterTab, Text, Card, CardItem, Grid, Col, Row, Separator, List, View, Segment, Item, Input
} from 'native-base';

// Custom styling
import styles from '../../styles/styles';
import getTheme from '../../native-base-theme/components';
import custom from '../../native-base-theme/variables/custom';

class Nutrition extends Component {
  static navigationOptions = {
    drawerLabel: 'Nutrition',
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
                      <Title>Nutrition</Title>
                  </Body>
              </Header>

              <Content>

                <Card>
                  <CardItem header>
                    <Text>Calories</Text>
                  </CardItem>
                  <Separator style={{ height: 2, flex: 0 }} ></Separator>
                  <CardItem header>
                    <Text>Body</Text>
                  </CardItem>
                </Card>

                <Card>
                  <CardItem header>
                    <Text>Nutrients</Text>
                  </CardItem>
                  <Separator style={{ height: 2, flex: 0 }} ></Separator>
                  <CardItem header>
                    <Text>Body</Text>
                  </CardItem>
                </Card>

                <Card>
                  <CardItem header>
                    <Text>Macros</Text>
                  </CardItem>
                  <Separator style={{ height: 2, flex: 0 }} ></Separator>
                  <CardItem header>
                    <Text>Body</Text>
                  </CardItem>
                </Card>

              </Content>

          </Container>
        </StyleProvider>
      </SafeAreaView>
    );
  }
};

export default Nutrition;