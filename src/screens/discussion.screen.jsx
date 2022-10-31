import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
  SafeAreaView,
} from "react-native";

import SearchBarComponent from "../components/atoms/searchBar.component";

import { MaterialIcons, Feather } from "react-native-vector-icons";
import QueryTileComponent from "../components/atoms/queries.component";
import { FlatList } from "react-native-gesture-handler";
import { QUERY_DATA } from "../data/queries.data";
import { _colors_ } from "../styles/colors";
import { usePostQueryDispatch, usePostQueryState } from "../contexts/PostQueryContext";

const DiscussionScreen = ({ navigation }) => {
  const { styles, width, height } = useStyles();
  const [searchText, setSearchText] = useState("");
  const [Queries, setQueries] = useState(QUERY_DATA); 

  const QueryState = usePostQueryState();
  const QueryDispatch = usePostQueryDispatch();


  const filteredQuery = useMemo(() => {
    return Queries.filter((query) => {
      return query.question.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [searchText, Queries]);


  // https://stackoverflow.com/a/67862414/16896561
  /// for navigating with params through flatlist component
  const NavigateWithParams = (query)=>{
    navigation.navigate('QueryScreen',{query});
  }

  const renderItemFunction = ({ item }) => {
    return (
      <QueryTileComponent
        // passing NavigateWithParams function to component
        NavigateWithParams = {NavigateWithParams}
        question={item.question}
        description={item.description}
        author={item.author}
        postDate={item.postDate}
        likes={item.likes}
        tags={item.tags}
        answers={item.answers}

        // passing the whole question
        query = {item}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 30,
            paddingBottom: 10,
            paddingLeft: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "bold",
              fontSize: height / 40,
              paddingLeft: 10,
            }}
          >
            Queries
          </Text>
        </View>
        <SearchBarComponent
          placeholder={"Search query"}
          navigation={navigation}
          searchedValue={searchText}
          handleSearchText={(text) => setSearchText(text)}
          filterScreenName={"FilterScreen"}
        />
      </View>

      <FlatList
        data={filteredQuery}
        style={{ backgroundColor: _colors_.light_mode_screen_background_color }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItemFunction}
      />
      <Pressable style={styles.create_query_btn}
      onPress = {()=> navigation.navigate('PostQueryScreen')}
      >
        <MaterialIcons name="edit" size={40} color="#5C281D" />
      </Pressable>
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
    header: {
      // backgroundColor:'red',
      width: width,
    },
    create_query_btn: {
      position: "absolute",
      bottom: 30,
      right: 30,
      flexDirection: "row",
      backgroundColor: _colors_.light_brick,
      width: 75,
      height: 75,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return { styles, width, height };
};

export default DiscussionScreen;
