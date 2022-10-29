import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  Pressable,
} from "react-native";

import { useFonts } from "expo-font";
import { _fonts_ } from "../../styles/fonts";

import { SearchBar } from "@rneui/themed";

//importing icons
import {
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import { _colors_ } from "../../styles/colors";

const HomeHeaderComponent = (props) => {
  const { styles,width,height } = useStyles();

  const [fontsLoaded] = useFonts(_fonts_);
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "bold", fontSize: height/40 }}> App name</Text>
      <View style={styles.notification_host_event}>
        <View style={styles.notification}>
          <Ionicons name="notifications" size={25} color="black" />
        </View>
        <Pressable
          name="create event button"
          style={({ pressed }) => [
            styles.createEventBtn,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <Text style={{fontFamily: 'bold' ,fontSize: height/60}}>Host event</Text>
        </Pressable>
      </View>
    </View>
  );
};

const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      width: width,
      height : 60,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems: "center",
      backgroundColor:'white',
      paddingHorizontal: 15,
      // borderBottomWidth: 2,
      // borderBottomColor: _colors_.dark_grey
    },
    notification_host_event: {
      width: "55%",
      // backgroundColor:'red',
      flexDirection: "row",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      // paddingRight: 15,
    },
    notification: {
      flex:0.2,
      marginLeft: 10,
    },
    createEventBtn: {
      flex: 1,
      backgroundColor: _colors_.light_brick,
      height: "80%",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      marginLeft: 15,
    },
  });
  return { styles,width,height };
};

export default HomeHeaderComponent;
