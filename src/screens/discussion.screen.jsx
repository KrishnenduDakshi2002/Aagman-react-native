import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
} from "react-native";

import SearchBarComponent from "../components/atoms/searchBar.component";

import { Ionicons, Feather } from "react-native-vector-icons";
import QueryTileComponetn from "../components/atoms/queries.component";

const DiscussionScreen = ({ navigation }) => {
  const { styles, width, height } = useStyles();
  const [searchText, setSearchText] = useState("");
  return (
    <View style={styles.container}>
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
          <Pressable
            style={({ pressed }) => [
              { position: "absolute", right: 30, opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <Feather name="download" size={28} color="black" />
          </Pressable>
        </View>
        <SearchBarComponent
          placeholder={"Search query"}
          navigation={navigation}
          searchedValue={searchText}
          handleSearchText={(text) => setSearchText(text)}
          filterScreenName={"FilterScreen"}
        />
      </View>
    
    <QueryTileComponetn/>

    </View>
  );
};

const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:'white'
    },
    header: {
      // backgroundColor:'red',
      width: width,
    },
  });
  return { styles, width, height };
};

export default DiscussionScreen;
