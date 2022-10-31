import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  SafeAreaView,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import {
  usePostQueryState,
  usePostQueryDispatch,
} from "../contexts/PostQueryContext";

import { Entypo } from "@expo/vector-icons";

import { Button, Input } from "@rneui/themed";

import { useFonts } from "expo-font";
import { _fonts_ } from "../styles/fonts";
import { POST_QUERY_ACTION_TYPE } from "../utils/PostQuery.Reducer";
import InputComponent from "../components/atoms/Input.component";

const Header = () => {
  const { styles, width, height } = useStyles();
  const QueryState = usePostQueryState();
  const QueryDispatch = usePostQueryDispatch();
  return (
    <View
      style={{
        // backgroundColor: "pink",
        width: width,
        height: 350,
        marginTop: 50,
        paddingHorizontal: 15,
      }}
    >
      <InputComponent
        multiline
        style={styles.question}
        value={QueryState.question}
        onChangeTextFunction={(text) =>
          QueryDispatch({
            type: POST_QUERY_ACTION_TYPE.QUESTION,
            payload: text,
          })
        }
        placeholder={"Enter question"}
      />

      <InputComponent
        multiline
        style={styles.question}
        value={QueryState.description}
        onChangeTextFunction={(text) =>
          QueryDispatch({
            type: POST_QUERY_ACTION_TYPE.DESCRIPTION,
            payload: text,
          })
        }
        placeholder={"Enter description"}
      />
    <View style={{flexDirection:'row'}}>

      <InputComponent
        style={styles.tag}
        value={QueryState.author}
        onChangeTextFunction={(text) =>
          QueryDispatch({
            type: POST_QUERY_ACTION_TYPE.QUESTION,
            payload: text,
          })
        }
        placeholder={"Enter tags"}
      />
      <Button
      radius={10}
      title={'Add tag'}
      />
    </View>
    </View>
  );
};

const PostQueryScreen = () => {
  const { styles, width, height } = useStyles();

  const QueryState = usePostQueryState();
  const QueryDispatch = usePostQueryDispatch();

  const RenderTags = ({ item }) => {
    return (
      <View style={styles.tags}>
        <Text style={{ color: "#000D8C" }}>{item}</Text>
        <Entypo name="cross" size={24} color="#000D8C" style={{marginLeft: 30}} />
      </View>
    );
  };
  const [fontsLoaded] = useFonts(_fonts_);
  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{ alignItems: "center" }}
        ListHeaderComponent={Header}
        data={QueryState.tags}
        showsVerticalScrollIndicator={false}
        renderItem={RenderTags}
      />
    </SafeAreaView>
  );
};

const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
    tags: {
      flexDirection: "row",
      justifyContent: "space-around",
    //   width: width / 2,
      backgroundColor: "#CADFF5",
      height: 50,
      marginRight: 10,
      borderRadius: 5,
      paddingHorizontal: 10,
      alignItems: "center",
    },
    question: {
      flexDirection: "row",
      height: 100,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: "black",
      paddingLeft: 15,
      alignItems: "center",
      marginBottom: 30,
    },
    tag: {
      flexDirection: "row",
      height: 50,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: "black",
      paddingLeft: 15,
      alignItems: "center",
      marginBottom: 30,
    },
  });
  return { styles, width, height };
};

export default PostQueryScreen;
