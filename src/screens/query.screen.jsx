import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import Divider from "../components/atoms/Divider.component";

import { Button } from "@rneui/themed";

import { useFonts } from "expo-font";
import { _fonts_ } from "../styles/fonts";
import { _colors_ } from "../styles/colors";
import AnswerComponent from "../components/atoms/answer.component";

const AnswerRenderFunction = ({ item }) => {
  return <AnswerComponent
  answer = {item.answer}
  author = {item.author}
  date = {item.date}
  />;
};

const QueryScreen = ({ navigation, route }) => {
  const { styles, width, height } = useStyles();
  const [query, setQuery] = useState(route.params.query);

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
      <View style={{backgroundColor:"white"}}>
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
        <Button
        title={'Your answer'}
        radius= {10}
        titleStyle = {{fontFamily: 'regular'}}
        containerStyle ={{marginBottom: 15}}
        />
        <Divider color={_colors_.dark_grey} />

        <Text
          style={{ width: "100%", fontFamily: "medium", fontSize: height / 50 }}
        >
          {query.answers.length} Answers
        </Text>

        
      </View>
    );
  };

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={query.answers}
        renderItem={AnswerRenderFunction}
        ListHeaderComponent={Header}
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
      marginHorizontal: 10,
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
  });
  return { styles, width, height };
};

export default QueryScreen;
