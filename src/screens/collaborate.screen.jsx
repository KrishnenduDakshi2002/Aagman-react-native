import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  SafeAreaView,
  FlatList,
} from "react-native";
import CollaborateTileComponent from "../components/atoms/collaborateTile.component";
import SearchBarComponent from "../components/atoms/searchBar.component";

const CollaborateScreen = ({ navigation }) => {
  const { styles, width, height } = useStyles();
  const [searchText, setsearchText] = useState("");

  // navigation function
  const NavigationFunction = (value) => {
    navigation.navigate("colleborateDetailsScreee", value);
  };

  const RenderItemFunction = ({ item }) => {
    return <CollaborateTileComponent />;
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

      {/* <FlatList
        showsVerticalScrollIndicator={false}
        data={{}}
        renderItem={() => {}}
      /> */}
      <CollaborateTileComponent/>
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
