import React, { useState, useMemo, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  SafeAreaView,
  Pressable,
  FlatList,
} from "react-native";

import { useFonts } from "expo-font";

import SearchBarComponent from "../components/atoms/searchBar.component";
import BlogTileComponent from "../components/atoms/blogs.component";

import { _fonts_ } from "../styles/fonts";

import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";

import { BLOG_DATA } from "../data/blog.data";
import { _colors_ } from "../styles/colors";

const renderItemFunction = ({ item }) => {
  return (
    <BlogTileComponent
      title={item.title}
      imageUri={item.imageUri}
      shortDescription={item.shortDescription}
      author={item.author}
      reactions={item.reactions}
      blog = {item}
    />
  );
};

const BlogScreen = ({ navigation }) => {
  const { styles, width, height } = useStyles();
  const [fontsLoaded] = useFonts(_fonts_);

  const [searchText, setSearchText] = useState("");
  const [blogs, setBlogs] = useState(BLOG_DATA);

  const searchedBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      return blog.title.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [blogs, searchText]);

  if (!fontsLoaded) return null;

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
          <Pressable>
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </Pressable>
          <Text
            style={{
              fontFamily: "bold",
              fontSize: height / 40,
              paddingLeft: 10,
            }}
          >
            Tech blogs
          </Text>
          <Pressable
            style={({ pressed }) => [{ position: "absolute", right: 30, opacity: pressed ? 0.5:1 }]}
          >
            <Feather name="download" size={28} color="black" />
          </Pressable>
        </View>
        <SearchBarComponent
          placeholder = {"Search blog"}
          navigation={navigation}
          searchedValue={searchText}
          handleSearchText={(text) => setSearchText(text)}
          filterScreenName={"FilterScreen"}
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={searchedBlogs}
        renderItem={renderItemFunction}
        style={{ backgroundColor: _colors_.light_mode_screen_background_color }}
      />
      <Pressable style={styles.create_query_btn}>
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

export default BlogScreen;
