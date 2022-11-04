import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
} from "react-native";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { _colors_ } from "../../styles/colors";
import { FlatList } from "react-native-gesture-handler";

import { useFonts } from "expo-font";
import { _fonts_ } from "../../styles/fonts";

const QueryTileComponent = (props) => {
  const { styles, width, height } = useStyles();

  const [fontsLoaded] = useFonts(_fonts_);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(+props.likes);
  const [isSaved, setIsSaved] = useState(false);

  const RenderTags = ({ item }) => {
    return (
      <View style={styles.tags}>
        <Text style={{ color: "#000D8C" }}>{item}</Text>
      </View>
    );
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View name="reactions and votes" style={styles.box1}>
        <Pressable
          style={{ marginBottom: 20, alignItems: "center" }}
          onPress={() => {
            !isLiked ? setLikes(likes + 1) : setLikes(likes - 1);
            setIsLiked(!isLiked);
          }}
        >
          <AntDesign
            name={isLiked ? "heart" : "hearto"}
            size={30}
            color="black"
          />

          <Text>{likes}</Text>
        </Pressable>
        <Pressable
          style={{ marginBottom: 20, alignItems: "center" }}
          // passing the current answers to Queryscreen for expanded version of question
        >
          <MaterialIcons name="question-answer" size={30} color="black" />
          <Text>{props.answers.length}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setIsSaved(!isSaved);
          }}
        >
          <Ionicons
            name={isSaved ? "bookmarks" : "bookmarks-outline"}
            size={24}
            color="black"
          />
        </Pressable>
      </View>
      <View style={styles.box2}>
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          // passing query to QueryScreen using route params
          // unique way to do this
          onPress={() => {
            const {NavigateWithParams,...query} = props;
            props.NavigateWithParams(query);
          }}
        >
          <Text
            numberOfLines={2}
            style={{ fontFamily: "bold", marginBottom: 5, color: "#0362C0" }}
          >
            {/* question from props */}
            {props.question}
          </Text>
        </Pressable>
        <Text
          numberOfLines={2}
          style={{ fontFamily: "regular", fontSize: height / 60 }}
        >
          {/* description for question from props */}
          {props.description}
        </Text>
        <Text
          style={{
            fontFamily: "medium",
            fontSize: height / 60,
            textAlign: "right",
            color: _colors_.dark_blue,
          }}
        >
          {/* author for question from props */}
          posted by {props.author}
        </Text>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: height / 60,
            textAlign: "right",
          }}
        >
          {/* Post date from props */}
          {dayjs(props.postDate).fromNow()}
        </Text>
        <View>
          {/* Tags from props */}
          <FlatList
            data={props.tags}
            renderItem={RenderTags}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      width: width,
      height: 220,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      //   backgroundColor:"#FBF8EF",
      backgroundColor: "white",
      paddingHorizontal: 10,
      paddingVertical: 12,
      marginTop: 8,
    },
    box1: {
      flex: 0.15,
      //   backgroundColor: "yellow",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    box2: {
      flex: 1,
      height: "100%",
      paddingHorizontal: 10,
      justifyContent: "space-between",
      //   backgroundColor: "green",
    },
    tags: {
      backgroundColor: "#CADFF5",
      height: "60%",
      marginRight: 10,
      borderRadius: 5,
      paddingHorizontal: 10,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return { styles, width, height };
};

export default QueryTileComponent;
