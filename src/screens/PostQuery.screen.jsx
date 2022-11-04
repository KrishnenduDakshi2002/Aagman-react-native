import React, { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  SafeAreaView,
  TextInput,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import {
  usePostQueryState,
  usePostQueryDispatch,
  useOnPressedPostQuestion,
} from "../contexts/discussionContext";

import { HOST } from "../config";

import { Entypo } from "@expo/vector-icons";

import { Button, Input } from "@rneui/themed";

import { useFonts } from "expo-font";
import { _fonts_ } from "../styles/fonts";
import { POST_QUERY_ACTION_TYPE } from "../utils/PostQuery.Reducer";
import InputComponent from "../components/atoms/Input.component";

const Header = (props) => {
  const { styles, width, height } = useStyles();
  const [tag, setTag] = useState("");
  const QueryState = usePostQueryState();
  const QueryDispatch = usePostQueryDispatch();

  const postQuestionState = useOnPressedPostQuestion(); // state for post Question button
  // from context

  //posting question
  const PostDataFunction = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const { id, author, ...question } = QueryState; // by this kinda excluding id and author
    fetch(`${HOST}/api/v1/discussion/question/post`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(question),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.statusCode === 201) {

          // setting this button (to pressed [true])
          postQuestionState.setState(!postQuestionState.state);
          // then navigate to discussion screen
          props.navigationFunction();
        }
      });
  };

  return (
    <View
      style={{
        // backgroundColor: "pink",
        width: width,
        marginBottom: 30,
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
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <InputComponent
          style={styles.tag}
          value={tag}
          onChangeTextFunction={setTag}
          placeholder={"Enter tags"}
        />
        <Button
          radius={10}
          title={"Add tag"}
          onPress={() => {
            if (tag !== "") {
              QueryDispatch({
                type: POST_QUERY_ACTION_TYPE.TAG,
                payload: tag,
              });
            }
            setTag("");
          }}
        />
      </View>
      <Button
        radius={10}
        title={"Post question"}
        buttonStyle={{
          backgroundColor: "rgba(111, 202, 186, 1)",
          paddingHorizontal: 30,
          paddingVertical: 15,
        }}
        onPress={() => {
          if (QueryState.question !== "" && QueryState.description !== "") {
            // giving an unique id to the question
            QueryDispatch({
              type: POST_QUERY_ACTION_TYPE.ID,
              payload: Math.floor(Math.random() * 199929231).toString(),
            });
            // adding post date to the question
            QueryDispatch({
              type: POST_QUERY_ACTION_TYPE.POSTDATE,
              payload: Date.now,
            });

            //posting the question
            PostDataFunction();
          } else {
            Alert.alert("Please enter value");
          }
        }}
      />
    </View>
  );
};

const PostQueryScreen = ({ navigation }) => {
  const { styles, width, height } = useStyles();

  const QueryState = usePostQueryState();
  const QueryDispatch = usePostQueryDispatch();

  const navigationFuntion = () => {
    navigation.navigate("DisscussionScreen");
  };

  const RenderTags = ({ item }) => {
    return (
      <View style={styles.tags}>
        <Text style={{ color: "#000D8C" }}>{item}</Text>
        <Pressable
          onPress={() =>
            QueryDispatch({
              type: POST_QUERY_ACTION_TYPE.CLEAR_TAG,
              payload: item,
            })
          }
        >
          <Entypo
            name="cross"
            size={24}
            color="#000D8C"
            style={{ marginLeft: 30 }}
          />
        </Pressable>
      </View>
    );
  };
  const [fontsLoaded] = useFonts(_fonts_);
  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{ alignItems: "center" }}
        ListHeaderComponent={<Header navigationFunction={navigationFuntion} />}
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
      marginBottom: 10,
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
      flex: 1,
      flexDirection: "row",
      height: 50,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: "black",
      paddingLeft: 15,
      alignItems: "center",
      marginBottom: 30,
      marginRight: 15,
    },
  });
  return { styles, width, height };
};

export default PostQueryScreen;
