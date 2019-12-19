import React, { Component, useState } from 'react';
import { Alert, SafeAreaView, View, FlatList } from 'react-native';
import { Overlay } from 'react-native-elements';

import
  {
    Button, Text, StyleProvider, Container, H3, H2, Item, Row, Col, Icon,
    Separator,
  } from 'native-base';

// Custom styling
import styles from '../../styles/styles';
import getTheme from '../../native-base-theme/components';
import custom from '../../native-base-theme/variables/custom';

LogExerciseModal = ( props ) => {
    const[refreshToggle, refreshList] = useState('false');

    return (
        <Overlay
          isVisible={props.isVisible}
          onBackdropPress={props.onBackdropPress}
        >
          <View style={{ flex: 1 }}>
            <H2>Please log exercises.</H2>

            <View style={{ flex: 1, marginTop: 8 }}>
            <H3>Exercises</H3>
            <FlatList
              style={{ backgroundColor: '#e6e6e6' }}
              data={props.ExerciseList}
              extraData={props.ExerciseList}
              ListHeaderComponent={
                <>
                <Row style={{ backgroundColor: 'darkgrey' }}>
                    <Col style={{ flex: 2.5 }}>
                      <Text style={{ fontSize: 13 }}>Name</Text>
                    </Col>
                    <Col style={{ alignItems: 'center'}} >
                      <Text style={{ fontSize: 13 }}>Mins</Text>
                    </Col>
                    <Col style={{ alignItems: 'center'}} >
                      <Text style={{ fontSize: 13 }}>Cals/Min.</Text>
                    </Col>
                    <Col style={{ alignItems: 'center'}} >
                      <Text style={{ fontSize: 13 }}>Sets</Text>
                    </Col>
                    <Col style={{ alignItems: 'center'}} >
                      <Text style={{ fontSize: 13 }}>Reps</Text>
                    </Col>
                    <Col style={{ flex: 1.5 }}></Col>
                </Row>
                <Separator style={{ height: 2, backgroundColor: '#696969' }}/>
                </>
              }
              renderItem={({ item }) =>
                  <Row>
                    <Col style={{ flex: 2.5 }}>
                      <Text style={{ fontSize: 13 }}>{item.name}</Text>
                    </Col>
                    <Col style={{ alignItems: 'center'}} >
                      <Text style={{ fontSize: 13 }}>{item.minutes}</Text>
                    </Col>
                    <Col style={{ alignItems: 'center'}} >
                      <Text style={{ fontSize: 13 }}>{item.cals_burnt_per_min}</Text>
                    </Col>
                    <Col style={{ alignItems: 'center'}} >
                      <Text style={{ fontSize: 13 }}>{item.sets}</Text>
                    </Col>
                    <Col style={{ alignItems: 'center'}} >
                      <Text style={{ fontSize: 13 }}>{item.reps}</Text>
                    </Col>
                    <Col style={{ alignItems: 'center', flex: 1.5 }}>
                    <Button 
                        rounded 
                        style={{ justifyContent: 'center' }}
                        onPress={ () => {
                            console.log(item.name, 'button pressed');
                            props.temp_array.push(item);
                            refreshList(!refreshToggle);
                            console.log(props.temp_array);
                          }
                        }
                      >
                        <Icon type='AntDesign' name='plus'/>
                    </Button>
                    </Col>
                  </Row>
                }
              keyExtractor={item => item.id.toString() }
            />
            </View>

            <View style={{ flex: 1, marginTop: 8  }}>
            <H3>Chosen</H3>
            <FlatList
              data={props.temp_array}
              extraData={refreshToggle}
              renderItem={({ item }) =>
                  <Row>
                  <Text>{item.name}</Text>
                    <Button
                      onPress={ () => {
                          console.log('EXERCISE REMOVED');
                          console.log(props.temp_array.indexOf(item));
                          var index = props.temp_array.indexOf(item);
                          var removed = props.temp_array.splice(index, 1)
                          refreshList(!refreshToggle);
                          console.log(props.temp_array);
                        }
                      }
                    >
                      <Text>Remove</Text>
                    </Button>
                  </Row>
                }
                keyExtractor={(item, index) => String(index)}
            />
            </View>

            <Button 
            rounded 
            style={{justifyContent: 'center'}}
            onPress={props.onSavePress}
            >
              <Text>Save</Text>
            </Button>
          </View>
        </Overlay>
    );
};

export default LogExerciseModal;