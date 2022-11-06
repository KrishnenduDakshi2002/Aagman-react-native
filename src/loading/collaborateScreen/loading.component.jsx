import React, { useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import SkeletonComponent from "../skeleton.component";

const LoadingComponent = () => {
  const { styles, width, height } = useStyles();
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row", }}>
        {/* profile image */}
        <View style={{ flex: 0.3, height: "100%", justifyContent: "center" }}>
          <SkeletonComponent
            variant={"circle"}
            radius={50}
            style={{ marginHorizontal: 5, marginVertical: 10 }}
          />
        </View>
        {/* event name and description */}
        <View style={{ flex: 1, height: "100%", justifyContent: "center" }}>
          <SkeletonComponent
            width={"100%"}
            height={12}
            style={{ marginBottom: 3 }}
          />
          <SkeletonComponent
            width={"40%"}
            height={12}
            style={{ marginBottom: 10 }}
          />
          <SkeletonComponent
            width={"100%"}
            height={7}
            style={{ marginBottom: 5 }}
          />
          <SkeletonComponent
            width={"80%"}
            height={7}
            style={{ marginBottom: 5 }}
          />
          <SkeletonComponent
            width={"100%"}
            height={7}
            style={{ marginBottom: 5 }}
          />
          <SkeletonComponent
            width={"70%"}
            height={7}
            style={{ marginBottom: 15 }}
          />
        </View>
      </View>
      {/* date and author */}
      <View
        style={{
          flex: 0.1,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <SkeletonComponent
          width={"20%"}
          height={10}
          style={{ marginBottom: 5, marginLeft: 10 }}
        />
        <SkeletonComponent
          width={"30%"}
          height={12}
          style={{ marginBottom: 5, marginLeft: 10 }}
        />
      </View>
      {/* skills */}
      <View style={{ flex: 0.4,}}>
        <FlatList
          contentContainerStyle={{ alignItems: "center" }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={[1, 2, 3, 4]}
          renderItem={({ item }) => (
            <SkeletonComponent
              width={80}
              height={35}
              style={{ marginHorizontal: 10 }}
            />
          )}
        />
      </View>
      {/* contacts */}
      <View
        style={{ flex: 0.5, flexDirection: "row", }}
      >
        <FlatList
          horizontal
          data={[1, 2, 3, 4]}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <SkeletonComponent
              variant={"circle"}
              radius={40}
              style={{ marginHorizontal: 7, marginVertical: 10 }}
            />
          )}
        />
      </View>
    </View>
  );
};

const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      height: 280,
      width: width,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingVertical: 5,
      paddingHorizontal: 15,
      marginTop: 7,
    },
  });
  return { styles, width, height };
};

export default LoadingComponent;
