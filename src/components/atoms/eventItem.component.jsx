import React, { useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions, Pressable } from "react-native";

import { Avatar,Badge } from "@rneui/themed";
import { _fonts_ } from "../../styles/fonts";
import { useFonts } from 'expo-font';
import { _colors_ } from "../../styles/colors";

const EventItemComponent = () => {
  const { styles,width,height } = useStyles();
  const [fontsLoaded] = useFonts(_fonts_);
  if(!fontsLoaded)return null;
  return (
    <View style={styles.eventItemStyle}>
      <View style={styles.box1}>
        <View style={styles.dateContainer}>
            <Text style={{fontFamily:'regular', fontSize:height/55}}>{`26 - 29 oct`}</Text>
        </View>
        <View style={styles.timeContainer}>
            <Text style={{fontFamily:'medium', fontSize:height/65}}>{`10:00 am-12:00 pm`}</Text>
        </View>
        <View style={styles.eventname}>
            <Text numberOfLines={2} style={{fontFamily:'bold', fontSize:height/45}}> HackOctober'22</Text>
        </View>
        <View style= {styles.status}>
            <Badge
            status="success"
            />
            <Text style={{fontFamily:'light',fontSize: height/65}}>ongoing</Text>
        </View>
        
      </View>
      <View style={styles.box2}>
        <View style= {styles.imageContainer}>
        <Avatar
          size={60}
          rounded
          title="H"
          containerStyle={{ backgroundColor: 'purple' }}
        />
        </View>
        <Pressable style={styles.button}>
            <Text style={{fontFamily:'regular', fontSize:height/65, color: 'white'}}>
                Register now!
            </Text>
        </Pressable>
      </View>
    </View>
  );
};

const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    eventItemStyle:{
        backgroundColor: 'white',
        flex: 1,
        flexDirection:'row',
        height:height/5,
        // backgroundColor:'red',
        marginVertical: 12,
        marginRight: 10
    },
    box1:{
        flex:1.5,
        // backgroundColor:'yellow',
        justifyContent:'center',
        paddingLeft:15
    },
    box2:{
        flex:1,
        justifyContent:'center',
        alignItems : 'center',
        // backgroundColor:'blue',
    },
    imageContainer:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        flex: 0.3,
        height: height/25,
        width:'90%',
        backgroundColor: _colors_.light_blue,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 5,
        marginVertical : 5
    },
    dateContainer:{
        // marginBottom: 
    },
    timeContainer:{
        marginBottom: height/60
    },
    status:{
        marginLeft:5,
        flexDirection:'row',
        alignItems:'center'
    },
    eventname:{
        // backgroundColor:'red',
        marginBottom : 10
    }
  });
  return { styles,width,height };
};

export default EventItemComponent;
