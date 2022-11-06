import React, { useState, useMemo, useEffect } from "react";
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
import {
  useOnPressedPostQuestion,
  usePostQueryDispatch,
  usePostQueryState,
} from "../contexts/discussionContext";
import { POST_QUERY_ACTION_TYPE } from "../utils/PostQuery.Reducer";
import { HOST } from "../config";
import LoadingScreen from "../loading/discussionScreen/loading.screen";

const DiscussionScreen = ({ navigation }) => {
  const { styles, width, height } = useStyles();
  const [searchText, setSearchText] = useState("");
  const [Queries, setQueries] = useState(null);

  const QueryState = usePostQueryState();
  const QueryDispatch = usePostQueryDispatch();

  const postQuestionState = useOnPressedPostQuestion(); // state for post Question button

  //handling API response
  const LoadDataFunction = () => {
    fetch(`${HOST}/api/v1/discussion/question/getAll`)
      .then((res) => res.json())
      .then((data) => {
        setQueries(data);
      });
  };

  useEffect(() => {
    // api will be called first time when this screen is rendering
    // second time when the postQuestion state will be true
    LoadDataFunction();

    if (postQuestionState.state) {
      QueryDispatch({ type: POST_QUERY_ACTION_TYPE.CLEAR }); // clearing the previous state for postQuery reducer
      postQuestionState.setState(!postQuestionState.state); // making state of post question button [in postQuery screen] to false
    }
  }, [postQuestionState.state]);

  // from context

  // useEffect(() => {
  //   // console.log('Running useeffect [disscussion]');
  //   if(postQuestionState.state){
  //     setQueries([...Queries,QueryState]);  // adding new questions to list (when use added new question from postQuery screen)
  //     QueryDispatch({type : POST_QUERY_ACTION_TYPE.CLEAR}) // clearing the previous state for postQuery reducer
  //     postQuestionState.setState(!postQuestionState.state);  // making state of post question button [in postQuery screen] to false
  //   }
  // }, [postQuestionState.state])

  const filteredQuery = useMemo(() => {
    if(searchText.startsWith('#')){  // this for searching for tags
      return Queries?.filter(query=>{
        const tags = searchText.split(' ').map(tag=> tag.slice(1));  // tags from search text
        const intersection = tags.filter(tag => query.tags.includes(tag.toLowerCase())) // intersection between search tags and query tags
        if(intersection.length > 0) return true
        else return false;
      })
    }else{
      return Queries?.filter((query) => {   // this is for searching question name
        return query.question.toLowerCase().includes(searchText.toLowerCase());
      });
    }
  }, [searchText, Queries]); 

  // https://stackoverflow.com/a/67862414/16896561
  /// for navigating with params through flatlist component
  const NavigateWithParams = (query) => {
navigation.navigate("QueryScreen", query);
  };

  const renderItemFunction = ({ item }) => {
    return (
      <QueryTileComponent
        //set search text from child
        setSearchTagText = {(text)=> setSearchText(text)}

        questionId = {item._id}
        // passing NavigateWithParams function to component
        NavigateWithParams={NavigateWithParams}
        question={item.question}
        description={item.description}
        author={item.author.userName}
        postDate={item.createdAt}
        likes={item.likes}
        tags={item.tags}
        answers={item.answers}
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

      {
        Queries == null ? 
        (<LoadingScreen/>):
        (
          <FlatList
            data={filteredQuery}
            style={{ backgroundColor: _colors_.light_mode_screen_background_color }}
            showsVerticalScrollIndicator={false}
            renderItem={renderItemFunction}
          />
        )
      }
      <Pressable
        style={styles.create_query_btn}
        onPress={() => navigation.navigate("PostQueryScreen")}
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
