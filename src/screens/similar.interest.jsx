import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const details = {
  data: [
    {id:1,  name: "DSA",       image: require('../../assets/Similarinterest/dsa.png'),          },
    {id:2,  name: "Web Development",     image: require('../../assets/Similarinterest/dsa.png'),           },
    {id:3,  name: "App Development",         image: require('../../assets/Similarinterest/dsa.png'),            },
    {id:4,  name: "Machine Learning",       image: require('../../assets/Similarinterest/dsa.png'),          },
    {id:5,  name: "Hackathon",          image: require('../../assets/Similarinterest/dsa.png'),           },
    {id:6,  name: "UI-UX",      image: require('../../assets/Similarinterest/dsa.png'),        },
    {id:7,  name: "IoT",      image: require('../../assets/Similarinterest/dsa.png'),        },
    {id:8,  name: "Graphic Design",             image: require('../../assets/Similarinterest/dsa.png'),             },
    {id:9,  name: "Block Chain",         image: require('../../assets/Similarinterest/dsa.png'),           },
    {id:10, name: "AI",         image: require('../../assets/Similarinterest/dsa.png'),           },
    {id:11, name: "Start Ups",         image: require('../../assets/Similarinterest/dsa.png'),           },
    {id:12, name: "Others",          image: require('../../assets/Similarinterest/dsa.png'),          },
  ]
};

function SimilarInterestScreen ({ navigation, route }) {
//   constructor(props) {
    // super(props);
    
//   }
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
      <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>Find people with similar interest</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={details.data}
          renderItem={({item}) =>
          <TouchableOpacity onPress={() =>details.props.navigation.navigate('Detail', {
            id : item.id,
            name : item.name,
            image : item.image,
          })}
          >
          <View style={styles.card}>
            <Image style={styles.image} source={item.image}/>
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>

              <TouchableOpacity style={styles.findButton} onPress={()=> details.clickEventListener()}>
                <Text style={styles.findButtonText}>Find</Text>
              </TouchableOpacity>
            </View>
          </View>
          </TouchableOpacity>
        }
        keyExtractor = { (item, index) => index.toString() }
        />
      </View>
      </View>
      </KeyboardAwareScrollView>
      </ImageBackground>
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  header:{
    backgroundColor: '#5DA7DB',
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
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width:80,
    height:80,
    borderRadius:40,
  },
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal:20,
    backgroundColor:"white",
    flexBasis: '42%',
    padding: 10,
    flexDirection:'row'
  },

  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#696969",
    fontWeight:'bold'
  },
  findButton: {
    marginTop:10,
    height:35,
    width:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  findButtonText:{
    color: "white",
    fontSize:15,
  },
});

export default SimilarInterestScreen