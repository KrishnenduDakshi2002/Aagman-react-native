import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
  Image,
  FlatList,
  Linking,
} from "react-native";

///https://medium.com/geekculture/deep-links-for-making-phone-calls-in-react-native-48333164e324

import { useFonts } from "expo-font";

import { SocialIcon, Button } from "@rneui/themed";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Avatar } from "@rneui/themed";
import { _fonts_ } from "../../styles/fonts";
import { _colors_ } from "../../styles/colors";

const CollaborateTileComponent = (props) => {
  const { styles, height, width } = useStyles();

  const RenderTags = ({ item }) => {
    return (
      <View style={styles.tags}>
        <Text style={{ color: "#000D8C" }}>{item}</Text>
      </View>
    );
  };

  const [fontsLoaded] = useFonts(_fonts_);
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <View style={{ paddingHorizontal: 10 }}>
          <Avatar size={55} rounded source={{ uri: props.data.imageUri }} />
        </View>
        <View
          style={{
            paddingLeft: 10,
            // backgroundColor: "pink",
            flex: 1,
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              fontFamily: "bold",
              fontSize: height / 45,
              marginVertical: 5,
            }}
          >
            {props.data.eventName}
          </Text>
          <Text
            numberOfLines={4}
            style={{
              fontFamily: "regular",
              fontSize: height / 60,
              marginBottom: 10,
            }}
          >
            {props.data.description}
          </Text>
        </View>
      </View>
      <View
        style={{
          //   backgroundColor: "pink",
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginVertical: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "medium",
            fontSize: height / 65,
            color: _colors_.dark_grey,
          }}
        >
          a month ago
        </Text>
        <Text
          style={{
            fontFamily: "bold",
            color: _colors_.dark_blue,
            marginHorizontal: 15,
            fontSize: height / 55,
          }}
        >
          {props.data.author.userName}
        </Text>
      </View>
      {/* Tags from props */}
      <FlatList
        // style={{backgroundColor:'red'}}
        contentContainerStyle={{ alignItems: "center" }}
        data={props.data.skills}
        renderItem={RenderTags}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <View name="social app && contact" style={styles.box2}>
        <View style={{flexDirection: 'row',alignItems:'center',flex:1}}>
          <Pressable
            onPress={() =>
              Linking.openURL(`${props.data.github}`)
            }
          >
            <SocialIcon
              type="github"
              iconSize={15}
              style={styles.iconStyle}
            />
          </Pressable>
          <Pressable
            onPress={() =>
                Linking.openURL(
                `${props.data.linkedIn}`
                )
            }
            >
            <SocialIcon
                type="linkedin"
                iconSize={15}
                style={styles.iconStyle}
            />
            </Pressable>
          <Pressable
            onPress={() =>
              Linking.openURL(`whatsapp://send?phone=${props.data.whatsApp}`)
            }
          >
            <SocialIcon
              type="whatsapp"
              iconSize={15}
              style={styles.iconStyle}
            />
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL(`mailto:${props.data.email}`)}
          >
            <View
              style={[{
                backgroundColor: "white",
                borderRadius: 50,
                borderWidth: 0.3,
                padding: 10,
              },styles.iconStyle]}
            >
              <Image
                source={require("../../assets/images/gmail.png")}
                style={{ width: 15, height: 15 }}
              />
            </View>
          </Pressable>
        </View>
        <View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center",marginRight: 10 }}
          >
            <Button
              radius={10}
              buttonStyle={{}}
              title={"Read more"}
              titleStyle={{ fontFamily: "regular", fontSize: height / 60 }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      width: width,
      height: 300,
      paddingVertical: 15,
      paddingHorizontal: 10,
      marginTop: 7
    },
    box1: {
      height: '50%',
      width: "100%",
      // backgroundColor: "yellow",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    box2: {
      width: "100%",
      //   backgroundColor: "green",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 5,
      justifyContent: "flex-start",
    },
    tags: {
      backgroundColor: "#CADFF5",
      height: 40,
      marginRight: 10,
      borderRadius: 5,
      paddingHorizontal: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    iconStyle :{
      marginHorizontal: 7
    }
  });
  return { styles, width, height };
};

export default CollaborateTileComponent;
