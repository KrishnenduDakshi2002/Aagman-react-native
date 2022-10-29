import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
} from "react-native";

import { Button } from "@rneui/themed";

const NavigateIcon = (props) => {
  const { styles } = useStyles(props.style);
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container, 
        {
            opacity : pressed ? 0.5 : 1
        }]}

      onPress={props.onPress}
    >
      {props.icon}
    </Pressable>
  );
};

const useStyles = (style) => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // width: width/5,
      height: '70%',
      justifyContent: "center",
      alignItems: "center",
    //   backgroundColor: style.backgroundColor,
      borderRadius: 7,
      marginHorizontal: 10,
    },
  });
  return { styles };
};

export default NavigateIcon;
