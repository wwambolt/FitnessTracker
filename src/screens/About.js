import React, { Component } from 'react';
import { Image, Text, SafeAreaView, View } from 'react-native';

import { logo_white } from '../../assets/images';
import styles from '../../styles/styles';

class About extends Component {
    render() {
        return (
          <SafeAreaView style={{...styles.container, backgroundColor: '#800020'}} >
              <View style={{ alignItems: 'center' }}>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Image source={ logo_white } />
                  <Text></Text>
                  <Text></Text>
                  <Text style={{ color: '#fff'  }}>Personal Health Management Software</Text>
                  <Text style={{ color: '#fff'  }}>William Wambolt, 100097716</Text>
                  <Text style={{ color: '#fff'  }}>COMP 4983 X1</Text>
                  <Text style={{ color: '#fff'  }}>Dec. 6, 2019</Text>
                  <Text></Text>
                  <Text style={{ color: '#fff'  }}>I had an absolute blast learning to</Text>
                  <Text style={{ color: '#fff'  }}>implement this and I hope you've enjoyed my demo.</Text>
                  <Text style={{ color: '#fff'  }}>Thank you for coming, have a great day, and</Text>
                  <Text style={{ color: '#fff'  }}>good luck to all the rest of the presenters!</Text>
              </View>
          </SafeAreaView>
        )
    }
};

export default About;