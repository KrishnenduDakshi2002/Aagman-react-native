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

const CollaborateTileComponent = () => {
  const { styles, height, width } = useStyles();
  const imageUri =
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80";

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
          <Avatar size={80} rounded source={{ uri: imageUri }} />
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
            numberOfLines={1}
            style={{
              fontFamily: "bold",
              fontSize: height / 45,
              marginVertical: 5,
            }}
          >
            Event name
          </Text>
          <Text
            numberOfLines={4}
            style={{
              fontFamily: "regular",
              fontSize: height / 60,
              marginBottom: 5,
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
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
          paddingVertical: 5,
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
          User#123
        </Text>
      </View>
      {/* Tags from props */}
      <FlatList
        // style={{backgroundColor:'red'}}
        contentContainerStyle={{ alignItems: "center" }}
        data={["tag1", "tag2", "javascript", "malfunctioning"]}
        renderItem={RenderTags}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <View name="social app && contact" style={styles.box2}>
        <View style={styles.box2}>
          <Pressable
            onPress={() =>
              Linking.openURL(`https://github.com/KrishnenduDakshi2002`)
            }
          >
            <SocialIcon
              type="github"
              iconSize={20}
              style={{ marginHorizontal: 10 }}
            />
          </Pressable>
          <Pressable
            onPress={() =>
                Linking.openURL(
                `https://www.linkedin.com/in/krishnendu-dakshi-624208224/`
                )
            }
            >
            <SocialIcon
                type="linkedin"
                iconSize={20}
                style={{ marginHorizontal: 10 }}
            />
            </Pressable>
          <Pressable
            onPress={() =>
              Linking.openURL(`whatsapp://send?phone=${+916295702093}`)
            }
          >
            <SocialIcon
              type="whatsapp"
              iconSize={20}
              style={{ marginHorizontal: 10 }}
            />
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL(`mailto:${"kdakshi2018@gmail.com"}`)}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 50,
                borderWidth: 0.3,
                padding: 10,
                marginHorizontal: 10,
              }}
            >
              <Image
                source={require("../../assets/images/gmail.png")}
                style={{ width: 25, height: 25 }}
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
      // backgroundColor: "#F6F6F6",
      width: width,
      height: 280,
      paddingVertical: 15,
      paddingHorizontal: 10,
    },
    box1: {
      flex: 3.5,
      width: "100%",
      // backgroundColor: "yellow",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    box2: {
      flex: 1,
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
  });
  return { styles, width, height };
};

export default CollaborateTileComponent;
