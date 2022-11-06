import React, { useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import SkeletonComponent from "../skeleton.component";


const LoadingComponent = () => {
  const { styles, width, height } = useStyles();
  return (
    <View style={styles.container}>
        <View style={styles.box1}>
            <SkeletonComponent variant={'circle'} radius={40} style={{marginHorizontal:5,marginVertical:10}}/>
            <SkeletonComponent variant={'circle'} radius={40} style={{marginHorizontal:5,marginVertical:10}}/>
            <SkeletonComponent variant={'circle'} radius={40} style={{marginHorizontal:5,marginVertical:10}}/>
        </View>
        <View style={styles.box2}>
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
            {/* description */}
                <SkeletonComponent
                    width={"100%"}
                    height={10}
                    style={{ marginBottom: 5 }}
                />
                <SkeletonComponent
                    width={"70%"}
                    height={10}
                    style={{ marginBottom: 15 }}
                />
            {/* date and time */}
            <View style={{alignItems:'flex-end'}}>
                <SkeletonComponent
                    width={"40%"}
                    height={10}
                    style={{ marginBottom: 5,marginLeft: 10 }}
                />
                <SkeletonComponent
                    width={"35%"}
                    height={10}
                    style={{ marginBottom: 15,marginLeft: 10 }}
                />

            </View>
            <View>
                <FlatList
                showsHorizontalScrollIndicator = {false}
                horizontal
                data={[1,2,3,4]}
                renderItem={({item})=><SkeletonComponent width={80} height={35} style={{marginHorizontal: 10}}/>}
                />
            </View>
            
        </View>
        {/* eventname */}
    </View>
  );
};

const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      height: 220,
      width: width,
      flexDirection: 'row',
      backgroundColor: "white",
      justifyContent:'center',
      alignItems: "flex-start",
      paddingVertical: 5,
      paddingHorizontal: 15,
      marginTop: 7,
    },
    box1: {
        // flex: 0.15,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        // backgroundColor:'red'
      },
      box2: {
        flex: 1,
        height: "100%",
        paddingHorizontal: 10,
        justifyContent: "center",
      },
      tags: {
        backgroundColor: "#CADFF5",
        height: "40%",
        width: 80,
        marginRight: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
      },
  });
  return { styles, width, height };
};

export default LoadingComponent;
