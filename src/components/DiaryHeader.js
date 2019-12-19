import React, { Component } from 'react';
import { Separator, Header, Left, Right, Grid, Row, Col, Text, Button, Icon, Body, Title } from 'native-base';

DiaryHeader = ( props ) => {
    return (
        <>
        {/* Date Selection Header */}
        <Header style={{ backgroundColor: '#fff' }}>
            <Left style={{ flex: 1 }}>
            <Button onPress={props.leftPress} vertical transparent >
                <Icon style={{ color: '#828282', fontSize: 17  }} type='FontAwesome' name='arrow-left' />
            </Button>
            </Left>

            <Body style={{ flex: 1, alignItems: 'center'}}>
                <Title style={{ color: '#828282', fontSize: 17 }} >{props.date}</Title>
            </Body>

            <Right style={{ flex: 1 }}>
            <Button onPress={props.rightPress} vertical transparent >
                <Icon style={{ color: '#828282', fontSize: 17  }} type='FontAwesome' name='arrow-right' />
            </Button>
            </Right>
        </Header>

        {/* Calorie Display Header */}
        <Header style={{ backgroundColor: '#fff', paddingTop: 6}}>
            <Grid >
                <Row  style={{ flex: 1}} >
                <Col style={{ flex: 1 , alignItems: 'center' }} >
                  <Text style={{ color: '#000', fontSize: 16  }}>{props.goal}</Text>
                </Col>

                <Col style={{ flex: 0.5, alignItems: 'center' }} >
                  <Text style={{ color: '#000', fontSize: 16  }}>-</Text>
                </Col>

                <Col style={{ flex: 1 , alignItems: 'center' }} >
                  <Text style={{ color: '#000', fontSize: 16  }}>{props.food}</Text>
                </Col>

                <Col style={{ flex: 0.5, alignItems: 'center' }} >
                  <Text style={{ color: '#000', fontSize: 16  }}>+</Text>
                </Col>

                <Col style={{ flex: 1 , alignItems: 'center' }} >
                  <Text style={{ color: '#000', fontSize: 16  }}>{props.exercise}</Text>
                </Col>

                <Col style={{ flex: 0.5, alignItems: 'center' }} >
                  <Text style={{ color: '#000', fontSize: 16  }}>=</Text>
                </Col>

                <Col style={{ flex: 1 , alignItems: 'center' }} >
                  <Text style={{ color: '#000', fontSize: 16  }}>{props.remaining}</Text>
                </Col>
                
                </Row>

                <Row style={{ flex: 1 }} >
                <Col style={{ flex: 1 , alignItems: 'center' }} >
                    <Text style={{ color: '#828282', fontSize: 11  }}>Goal</Text>
                </Col>

                <Col style={{ flex: 0.5, alignItems: 'center' }} >
                </Col>

                <Col style={{ flex: 1 , alignItems: 'center' }} >
                    <Text style={{ color: '#828282', fontSize: 11  }}>Food</Text>
                </Col>

                <Col style={{ flex: 0.5, alignItems: 'center' }} >
                </Col>

                <Col style={{ flex: 1 , alignItems: 'center' }} >
                    <Text style={{ color: '#828282', fontSize: 11  }}>Exercise</Text>
                </Col>

                <Col style={{ flex: 0.5, alignItems: 'center' }} >
                </Col>

                <Col style={{ flex: 1 , alignItems: 'center' }} >
                    <Text style={{ color: '#828282', fontSize: 11  }}>Remaining</Text>
                </Col>
                </Row>
            </Grid>
        </Header>
        </>
    )
};

export default DiaryHeader;