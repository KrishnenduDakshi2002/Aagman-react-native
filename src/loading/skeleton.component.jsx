import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Animated,
} from "react-native";

const SkeletonComponent = (props) => {
  const fadeAnimationValue = useRef(new Animated.Value(0.3)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnimationValue, {
          toValue: 0.6,
          useNativeDriver: true,
          duration: 750,
        }),
        Animated.timing(fadeAnimationValue, {
          toValue: 0.3,
          useNativeDriver: 1,
          duration: 750,
        }),
      ])
    ).start();
  }, [fadeAnimationValue]);

  const { styles } = useStyles(
    props.radius,
    props.width,
    props.height,
    props.borderRadius
  );
  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnimationValue,
        },
        props.variant == "circle" ? styles.circle : styles.regular,
        props.style
      ]}
    ></Animated.View>
  );
};

const useStyles = (
  radius = 5,
  Boxwidth = 5,
  Boxheight = 5,
  borderRadius = 4,
) => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    regular: {
      backgroundColor: "hsl(200, 20%, 70%)",
      borderRadius: borderRadius,
      width: Boxwidth,
      height: Boxheight,
      justifyContent: "center",
      alignItems: "center",
    },
    circle: {
      backgroundColor: "hsl(200, 20%, 70%)",
      borderRadius: 50,
      width: radius,
      height: radius,
    },
  });
  return { styles };
};

export default SkeletonComponent;
