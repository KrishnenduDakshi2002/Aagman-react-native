import React, { useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import SkeletonComponent from "../skeleton.component";


const LoadingComponent = () => {
  const { styles, width, height } = useStyles();
  return (
    <View style={styles.container}>
        {/* eventname */}
      <SkeletonComponent
        width={"50%"}
        height={12}
        style={{ marginBottom: 20 }}
      />
      {/* description */}
      <SkeletonComponent
        width={"90%"}
        height={10}
        style={{ marginBottom: 5 }}
      />
      <SkeletonComponent
        width={"80%"}
        height={10}
        style={{ marginBottom: 10 }}
      />
      {/* date and time */}
      <SkeletonComponent
        width={"15%"}
        height={10}
        style={{ marginBottom: 5,marginLeft: 10 }}
      />
      <SkeletonComponent
        width={"20%"}
        height={10}
        style={{ marginBottom: 15,marginLeft: 10 }}
      />
      {/* status and mode */}
      <SkeletonComponent
        width={"15%"}
        height={10}
        style={{ marginBottom: 5,marginLeft: 10 }}
      />
      <SkeletonComponent
        width={"40%"}
        height={10}
        style={{ marginBottom: 5,marginLeft: 10 }}
      />
    </View>
  );
};

const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      height: 170,
      width: width,
      backgroundColor: "white",
      justifyContent:'center',
      alignItems: "flex-start",
      paddingVertical: 15,
      paddingHorizontal: 15,
      marginTop: 7,
    },
  });
  return { styles, width, height };
};

export default LoadingComponent;
