import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
} from "react-native";

import { Avatar, Badge } from "@rneui/themed";
import { _fonts_ } from "../../styles/fonts";
import { useFonts } from "expo-font";
import { _colors_ } from "../../styles/colors";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

const HomeEventItemComponent = (props) => {
  const { styles, width, height } = useStyles();
  const [fontsLoaded] = useFonts(_fonts_);

  const time = `${dayjs(props.startTime).format("LT")} - ${dayjs(
    props.endTime
  ).format("LT")}`;
  let date;
  if (props.endDate) {
    date = `${dayjs(props.startDate).format("DD MMM")} - ${dayjs(
      props.endDate
    ).format("DD MMM")}`;
  } else {
    date = `${dayjs(props.startDate).format("DD MMM")}`;
  }

  if (!fontsLoaded) return null;
  return (
    <View style={styles.eventItemStyle}>
      <View style={styles.box1}>
        <View style={styles.eventname}>
          <Text
            numberOfLines={2}
            style={{ fontFamily: "bold", fontSize: height / 45 }}
          >
            {props.eventName}
          </Text>
        </View>
        <View style={styles.eventDescription}></View>
        <View style={styles.dateContainer}>
          <Text style={{ fontFamily: "regular", fontSize: height / 55 }}>
            {date}
          </Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={{ fontFamily: "medium", fontSize: height / 65 }}>
            {time}
          </Text>
        </View>

        <View style={styles.status}>
          <Badge status="success" />
          <Text style={{ fontFamily: "light", fontSize: height / 65 }}>
            {props.status}
          </Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Avatar
          size={60}
          rounded
          title="H"
          containerStyle={{ backgroundColor: "purple" }}
        />
      </View>
      <Pressable style={styles.button}>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: height / 65,
            color: "white",
          }}
        >
          Register now!
        </Text>
      </Pressable>
    </View>
  );
};

const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    eventItemStyle: {
      backgroundColor: "white",
      height: 400,
      flexDirection: "row",
      height: height / 3,
      // backgroundColor:'red',
      marginVertical: 5,
    },
    box1: {
      flex: 1.5,
      // backgroundColor:'yellow',
      justifyContent: "center",
      paddingLeft: 15,
    },
    box2: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor:'blue',
    },
    imageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      position: "absolute",
      bottom: 20,
      right: 15,
      flex: 0.3,
      height: "20%",
      width: "45%",
      backgroundColor: _colors_.light_blue,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      marginVertical: 5,
    },
    dateContainer: {
      // marginBottom:
    },
    timeContainer: {
      marginBottom: height / 60,
    },
    status: {
      marginLeft: 5,
      flexDirection: "row",
      alignItems: "center",
    },
    eventname: {
      // backgroundColor:'red',
      marginBottom: 10,
    },
  });
  return { styles, width, height };
};

export default HomeEventItemComponent;
