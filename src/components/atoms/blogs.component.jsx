import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { Button } from "@rneui/themed";

import { useFonts } from "expo-font";

import { Ionicons } from "@expo/vector-icons";
import { _fonts_ } from "../../styles/fonts";

const SaveBlog = async (blog,isLiked,isSaved) => {
  try {
    const object = {
        isLiked,
        isSaved,
        blog
    }
    const jsonValue = JSON.stringify(object);
    await AsyncStorage.setItem(object.blog.title, jsonValue);
  } catch (e) {
    // saving error
    console.log("Error while storing blog [blog.component] ->", e);
  }
};
const RemoveBlog = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // saving error
    console.log("Error while removing blog [blog.component] ->", e);
  }
};

const GetBlog = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    // return jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log(jsonValue);
  } catch (error) {
    console.log("error while getting blog [blog.component]->", error);
  }
};

const BlogTileComponent = (props) => {
  const { styles, width, height } = useStyles();
  const [fontsLoaded] = useFonts(_fonts_);
  const [likes, setLikes] = useState(+props.reactions);
  const [likePressed, setLikePressed] = useState(false);
  const [bookMarkPressed, setBookMarkPressed] = useState(false);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: props.imageUri }}
        resizeMode="cover"
      />
      <Text
        numberOfLines={2}
        style={{ fontFamily: "bold", fontSize: height / 50, marginBottom: 5 }}
      >
        {props.title}
      </Text>
      <Text
        numberOfLines={2}
        style={{ fontFamily: "regular", fontSize: height / 60 }}
      >
        {props.shortDescription}
      </Text>
      <Text>
        <Text
          style={{
            fontFamily: "medium",
            fontSize: height / 60,
            textAlign: "left",
          }}
        >
          by {props.author}
        </Text>
      </Text>
      <View style={styles.reaction_button_container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable
            onPress={() => {
              //operating with past values
              // initially -> false( to true) -> if {}
              // true ( to false ) -> else {}
              if (!likePressed) setLikes(likes + 1);
              else setLikes(likes - 1);

              setLikePressed(!likePressed);
            }}
          >
            <Ionicons
              name={likePressed ? "heart-sharp" : "heart-outline"}
              size={30}
              color={likePressed ? "red" : "black"}
            />
          </Pressable>
          <Text style={{ marginLeft: 6 }}>{likes} Likes</Text>
          <Pressable
            style={{ position: "absolute", marginLeft: 110 }}
            onPress={() => {
              if (!bookMarkPressed) {
                SaveBlog(props.blog,likePressed,!bookMarkPressed);
              } else {
                RemoveBlog(props.title);
              }
              setBookMarkPressed(!bookMarkPressed);
            }}
          >
            <Ionicons
              name={bookMarkPressed ? "ios-bookmarks" : "ios-bookmarks-outline"}
              size={25}
              color={bookMarkPressed ? "black" : "black"}
            />
          </Pressable>
        </View>
        <Button
          title={"Read more"}
          radius={10}
          titleStyle={{ fontFamily: "medium", fontSize: height / 50 }}

          onPress = {()=> GetBlog(props.title)}
        />
      </View>
    </View>
  );
};

const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      height: height / 2,
      width: width,
      justifyContent: "space-around",
      //   alignItems: "center",
      backgroundColor: "white",
      marginTop: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    image: {
      //   flex: 1,
      height: "60%",
      width: "100%",
      marginBottom: 10
    },
    reaction_button_container: {
      flexDirection: "row",
      justifyContent: "space-between",
      //   backgroundColor: "blue",
    },
  });
  return { styles, width, height };
};

export default BlogTileComponent;
