import React, { useReducer, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  SafeAreaView,
  FlatList,
  Pressable,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import Divider from "../components/atoms/Divider.component";

import { Button } from "@rneui/themed";

import { useFonts } from "expo-font";
import { _fonts_ } from "../styles/fonts";
import { _colors_ } from "../styles/colors";
import AnswerComponent from "../components/atoms/answer.component";
import { TextInput } from "react-native-gesture-handler";
import InputComponent from "../components/atoms/Input.component";

import {
  PostAnswerReducer,
  POST_ANSWER_INITIAL_STATE,
  POSTANSWER_ACTION_TYPES,
} from "../utils/postAnswer.Reducer";
import { usePostAnswerContext } from "../contexts/discussionContext";
import { HOST } from "../config";

const AnswerRenderFunction = ({ item }) => {
  return (
    <AnswerComponent
      answerId={item._id}
      answer={item.answer}
      author={item.author}
      date={item.date}
    />
  );
};

// form component
const Footer = (props) => {
  const PostAnswerContext = usePostAnswerContext();
  const { styles } = useStyles();
  return (
    <View style={{ marginVertical: 30 }}>
      <Divider color={_colors_.dark_grey} />
      <InputComponent
        multiline
        style={styles.answer}
        value={PostAnswerContext.state.answer}
        onChangeTextFunction={(text) =>
          PostAnswerContext.setState({
            type: POSTANSWER_ACTION_TYPES.ANSWER,
            payload: text,
          })
        }
        placeholder={"Enter answer"}
      />
      <Button
        title={"Your answer"}
        radius={10}
        titleStyle={{ fontFamily: "regular" }}
        containerStyle={{ marginBottom: 15 }}
        onPress={async () => {
          if (PostAnswerContext.state.answer !== "") {
            PostAnswerContext.setState({
              type: POSTANSWER_ACTION_TYPES.DATE,
              payload: Date.now(),
            });

            // checking for token (or is user logged in)
            const token = await AsyncStorage.getItem("authToken");

            if (token === undefined || token === null) {
              //do something
            }

            // posting the answer through api

            fetch(`${HOST}/api/v1/discussion/answer/post`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(
                {
                  answer : PostAnswerContext.state.answer,
                  questionId : props.questionId
                }
              ),
            }).then(res => res.json())
            .then(data=>{
              if(data.statusCode === 201){
                props.setPostAnswerPressed(true);
              }
            });

          } else Alert.alert("please enter valid answer");
        }}
      />
    </View>
  );
};

const QueryScreen = ({ navigation, route }) => {
  const { styles, width, height } = useStyles();
  const [query, setQuery] = useState(route.params); // holding the total state of this screen
  const [isPostAnswerPressed, setIsPostAnswerPressed] = useState(false); // holding state of your answer button

  const [answers, setAnswers] = useState([]);

  const [PostAnswerState, PostAnswerDispatch] = useReducer(
    PostAnswerReducer,
    POST_ANSWER_INITIAL_STATE
  ); // holding state for answer

  const PostAnswerContext = usePostAnswerContext();

  const LoadAnswerDataFunction = () => {
    fetch(`${HOST}/api/v1/discussion/answer/getAll`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionId: query.questionId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAnswers([...data.answers]);
      });
  };

  useEffect(() => {
    LoadAnswerDataFunction();
    if(isPostAnswerPressed){
      PostAnswerContext.setState({ type: POSTANSWER_ACTION_TYPES.CLEAR });
      setIsPostAnswerPressed(false);
    }
  }, [isPostAnswerPressed]);

  // useEffect(() => {
  //   if (isPostAnswerPressed) {
  //     setQuery({
  //       ...query,
  //       answers: [...query.answers, PostAnswerContext.state],
  //     });
  //     PostAnswerContext.setState({ type: POSTANSWER_ACTION_TYPES.CLEAR });
  //     setIsPostAnswerPressed(false);
  //   }
  // }, [isPostAnswerPressed]);

  const [fontsLoaded] = useFonts(_fonts_);

  const RenderTags = ({ item }) => {
    return (
      <View style={styles.tags}>
        <Text style={{ color: "#000D8C" }}>{item}</Text>
      </View>
    );
  };

  const Header = () => {
    return (
      <View style={{ backgroundColor: "white",width: '100%' }}>
        <Text
          style={{
            fontFamily: "bold",
            fontSize: height / 40,
            marginTop: 30,
            color: "#004B85",
          }}
        >
          {query.question}
        </Text>
        <Text style={{ marginTop: 20, marginBottom: 10 }}>
          Asked{" "}
          <Text
            style={{
              color: _colors_.dark_grey,
              fontFamily: "regular",
              fontSize: height / 60,
            }}
          >
            {dayjs(query.postDate).fromNow()}
          </Text>
        </Text>
        <Divider color={_colors_.dark_grey} />
        <Text
          style={{ fontFamily: "medium", fontSize: height / 60, marginTop: 20 }}
        >
          {query.description}
        </Text>
        <View style={{ height: 40, marginVertical: 20 }}>
          <FlatList
            data={query.tags}
            renderItem={RenderTags}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Text
          style={{
            width: "100%",
            fontFamily: "medium",
            textAlign: "right",
            marginBottom: 10,
            color: _colors_.dark_blue,
          }}
        >
          Posted by {query.author}
        </Text>
        <Divider color={_colors_.dark_grey} />

        <Text
          style={{ width: "100%", fontFamily: "medium", fontSize: height / 50 }}
        >
          {answers.length} Answers
        </Text>
      </View>
    );
  };

  if (!fontsLoaded) return null;
  else if (answers === []) return null;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{width:'100%',paddingHorizontal: 15}}
        showsVerticalScrollIndicator={false}
        data={answers}
        renderItem={AnswerRenderFunction}
        ListHeaderComponent={Header}
        ListFooterComponent={
          <Footer 
          setPostAnswerPressed={(val) => setIsPostAnswerPressed(val)} 
          questionId = {query.questionId}
          />
        }
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
      // marginHorizontal: 10,
      backgroundColor: "white",
      // width: width
    },
    tags: {
      backgroundColor: "#CADFF5",
      height: "100%",
      marginRight: 10,
      borderRadius: 5,
      paddingHorizontal: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    answer: {
      flexDirection: "row",
      width: '100%',
      height: 150,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: "black",
      paddingLeft: 15,
      alignItems: "center",
      marginBottom: 30,
      marginTop: 30,
    },
  });
  return { styles, width, height };
};

export default QueryScreen;
