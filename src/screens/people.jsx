import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AlertIOS,
  ImageBackground,
  Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SimilarInterestScreen from './similar.interest';

    const people = {
      data: [
        {
          id: 1,
          name: 'Soumyadip Mondal',
          image: require('../../assets/Similarinterest/soumyadip.jpg'),
          description: 'App Development - React Native'
        },
        {
          id: 2,
          name: 'Krishnendu Dakshi',
          image: require('../../assets/Similarinterest/krishnendu.jpg'),
          description: 'Mern Development, MongoDb, NodeJS'
        },
        {
          id: 3,
          name: 'Vaibhavi Roy',
          image: require('../../assets/Similarinterest/vaibhavi.jpg'),
          description: 'Front-End, UI-UX'
        },
        {
          id: 4,
          name: 'Rupantar Mondal',
          image: require('../../assets/Similarinterest/rupantar.jpg'),
          description: 'Design, Web Dev, AI, ML'
        },
        {
          id: 5,
          name: 'Subham Mondal',
          image: require('../../assets/Similarinterest/Rupantar.jpeg'),
          description: 'Web Dev, DSA'
        },
        {
          id: 5,
          name: 'Ankesh Banerjee',
          image: require('../../assets/Similarinterest/Rupantar.jpeg'),
          description: 'Web Dev, DSA'
        },
        {
          id: 5,
          name: 'Devleena Das',
          image: require('../../assets/Similarinterest/Rupantar.jpeg'),
          description: 'Web Dev, DSA'
        },
      ]
    };



// export function People({navigation}){
const People = ({ navigation, route }) => {
  // constructor(props) {
  //   super(props);




  // render() {
    return (
      <ImageBackground>
      <KeyboardAwareScrollView
        style={styles.con}
        contentOffset={{ x: 0, y: 0 }}
        scrollEventThrottle={0}
        contentContainerStyle={{ paddingTop: 0 }}
        contentInsetAdjustmentBehavior="always"
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraHeight={0}
        extraScrollHeight={Platform.OS == 'android' ? 32 : 0}
        enableResetScrollToCoords={false}>
        <View style={styles.header}>
      <Text style={styles.headerText}>Interested People</Text>
      </View>
      <ScrollView style={styles.container}>
        {
          people.data.map((item, index) => {
            return (
              <TouchableOpacity navigation={navigation}
                key={item.id} 
                onPress={ () => AlertIOS.alert(
                  'You tapped the button!',
                  null,
                  [
                    {text: 'OK', onPress: () => navigation.navigate(SimilarInterestScreen)},
                  ]
                )}
                >
                <View style={styles.listItem}>
                  <Image style={styles.itemImage} source={ item.image } />
                  <View style={styles.itemText}>
                    <Text style={styles.itemHeader}>{item.name}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
      </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header:{
    backgroundColor: '#54B435',
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
  },
  headerText:{
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  itemImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 50,
  },
  itemText: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  itemHeader: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#999',
  },
});

export default People;