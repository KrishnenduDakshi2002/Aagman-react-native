import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TextInput,
  Pressable,
} from "react-native";

import { SearchBar } from "@rneui/themed";
import { _colors_ } from "../../styles/colors";

import { FontAwesome } from "@expo/vector-icons";

const SearchBarComponent = (props) => {
  const { styles } = useStyles();

  const [filterState, setFilterState] = useState(null);
  // console.log(filterState);
  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search events"
        lightTheme
        round
        showCancel
        value={props.searchedValue}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInpContainerStyle}
        inputStyle={styles.inputStyle}
        onChangeText={(searched) => props.handleSearchText(searched)}
        searchIcon={
          <FontAwesome name="search" size={20} color={_colors_.dark_grey} />
        }
      />
      <Pressable
        style={styles.filter}
        onPress={() => {
          props.navigation.navigate("FilterScreen",{value: 12011});
        }}
      >
        <FontAwesome name="filter" size={25} color="black" />
      </Pressable>
    </View>
  );
};

const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      height: 70,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
    searchBarContainer: {
      // width: width,
      flex: 1,
      backgroundColor: "white",
      borderWidth: 0,
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
    },
    inputStyle: {
      fontSize: height / 55,
      fontFamily: "medium",
      borderBottomColor: _colors_.dark_grey,
      //   borderBottomWidth: 1,
    },
    searchBarInpContainerStyle: {
      //   height: 50,
      backgroundColor: "#E7E9EB",
    },
    filter: {
      flex: 0.15,
      height: "100%",
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return { styles };
};

export default SearchBarComponent;
