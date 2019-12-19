import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
      flex: 1,
    },

    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    customDrawerHeader: {
      flex: 1,
      backgroundColor: '#800020',
    },

    logo_64px: {
        width: 64,
        height: 64,
        resizeMode: 'contain',
        flex: 1
    },

    logo_container: {
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center'
    },

    drawerIcon: {
      width: 30,
      marginRight: 4,
      marginLeft: 16
    },

    item: {
      flexDirection: 'row',
      backgroundColor: '#c4dbf5',
    },
    name: {
      flex: 4,
      fontSize: 13,
      textAlignVertical: 'center',
      borderBottomWidth: 2,
      borderRightWidth: 2,
      borderColor: 'white',
    },

    stats: {
      flex: 1,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 13,
      borderBottomWidth: 2,
      borderRightWidth: 2,
      borderColor: 'white',
    },

  });

export default styles;