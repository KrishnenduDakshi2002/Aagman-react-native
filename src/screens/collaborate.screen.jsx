import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  SafeAreaView,
  FlatList,
} from "react-native";

import { HOST } from "../config/index";

import CollaborateTileComponent from "../components/atoms/collaborateTile.component";
import SearchBarComponent from "../components/atoms/searchBar.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { _colors_ } from "../styles/colors";

const CollaborateScreen = ({ navigation }) => {
  const { styles, width, height } = useStyles();
  const [searchText, setsearchText] = useState("");
  const [collabPosts, setCollabPosts] = useState([]);

  const LoadCollabDataFunction = async () => {
    const token = await AsyncStorage.getItem("authToken");
    fetch(`${HOST}/api/v1/collaborate/getAll`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCollabPosts(data));
  };

  useEffect(() => {
    LoadCollabDataFunction();
  }, []);

  // navigation function
  const NavigationFunction = (value) => {
    navigation.navigate("colleborateDetailsScreee", value);
  };

  const RenderItemFunction = ({ item }) => {
    return <CollaborateTileComponent data={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* header component */}
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
            Collaborate
          </Text>
        </View>
        <SearchBarComponent
          placeholder={"Search opportunities"}
          navigation={navigation}
          searchedValue={searchText}
          handleSearchText={(text) => setSearchText(text)}
          filterScreenName={"FilterScreen"}
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={collabPosts}
        renderItem={RenderItemFunction}
        contentContainerStyle = {{width: width,backgroundColor:_colors_.light_mode_screen_background_color}}
      />
    </SafeAreaView>
  );
};

const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent:"center",
      alignItems: "center",
      backgroundColor: "white",
    },
    header: {
      // backgroundColor:'red',
      width: width,
    },
  });
  return { styles, width, height };
};

export default CollaborateScreen;
