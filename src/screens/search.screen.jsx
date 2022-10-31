import React, { useState } from 'react'
import { 
StyleSheet, 
Text, 
View, 
useWindowDimensions } from 'react-native'


const details = {
    data: [
      {id:1,  name: "DSA",       image: require('../../assets/Similarinterest/dsa.png'),          },
      {id:2,  name: "Web Development",     image: require('../../assets/Similarinterest/webdev.png'),           },
      {id:3,  name: "App Development",         image: require('../../assets/Similarinterest/appdev.png'),            },
      {id:4,  name: "Machine Learning",       image: require('../../assets/Similarinterest/ml.jpg'),          },
      {id:5,  name: "Hackathon",          image: require('../../assets/Similarinterest/hackathon.png'),           },
      {id:6,  name: "UI-UX",      image: require('../../assets/Similarinterest/uiux.jpg'),        },
      {id:7,  name: "IoT",      image: require('../../assets/Similarinterest/dsa.png'),        },
      {id:8,  name: "Graphic Design",             image: require('../../assets/Similarinterest/dsa.png'),             },
      {id:9,  name: "Block Chain",         image: require('../../assets/Similarinterest/dsa.png'),           },
      {id:10, name: "AI",         image: require('../../assets/Similarinterest/dsa.png'),           },
      {id:11, name: "Start Ups",         image: require('../../assets/Similarinterest/dsa.png'),           },
      {id:12, name: "Others",          image: require('../../assets/Similarinterest/dsa.png'),          },
    ]
  };
  
  

const SearchScreen = ({navigation})=>{
    const { styles } = useStyles();
    return(
    <View style={styles.container}>
        <Text> this is search screen </Text>
    </View>
)
}


const useStyles = ()=>{
    const {width,height} = useWindowDimensions();
    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent:"center",
            alignItems:"center",
        },
    });
    return {styles};
};




export default SearchScreen;