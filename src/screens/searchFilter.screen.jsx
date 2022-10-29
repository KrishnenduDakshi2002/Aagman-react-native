import React, { useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  FlatList,
  ScrollView,
  Pressable,
  SafeAreaView,
  SectionList,
} from "react-native";

import { useFonts } from "expo-font";

import { Dialog, CheckBox, Divider, Button } from "@rneui/themed";
import { _colors_ } from "../styles/colors";
import { _fonts_ } from "../styles/fonts";
import {
  ACTION_TYPES,
} from "../utils/filterCheckBoxReducer";
import {
  useFilterDispatchFunction,
  useFilterState,
} from "../contexts/filterContext";




const FilterComponent = ({ navigation, route }) => {
  const { styles, width, height } = useStyles();

  // const [state, dispatch] = useReducer(CheckBoxReducer, INITIAL_STATE);

  //using search filter context
  const state = useFilterState();
  const dispatch = useFilterDispatchFunction();

// handling clear filters
  const HandleClearFilters  = ()=>{
    const action_keys = Object.keys(ACTION_TYPES);  // an array of keys
    action_keys.map(key=> dispatch({type : key, payload : false}))  // clearing all filters
  }

  const [fontsloaded] = useFonts(_fonts_);
  if (!fontsloaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            width: width,
            height: 50,
            color: "black",
            fontSize: height / 40,
            fontFamily: "bold",
            paddingLeft: 10,
          }}
        >
          Filters
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title={"Clear"}
            color="error"
            buttonStyle={styles.buttonStyle}
            titleStyle={{ fontSize: height / 55, fontFamily: "bold" }}
            onPress={HandleClearFilters}
          />
          <Button
            title={"confirm"}
            buttonStyle={styles.buttonStyle}
            titleStyle={{ fontSize: height / 55, fontFamily: "bold" }}
            onPress={() => {
              //needs to send state back to previous screen
              navigation.navigate("HomeTab");
            }}
          />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.filterContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionHeaderText}>Event status</Text>
        <View style={styles.eventStatus}>
          <CheckBox
            containerStyle={styles.checkboxContainer}
            title={"Ongoing"}
            checked={state.ongoing}
            onPress={() => dispatch({ type: ACTION_TYPES.ONGOING , payload: !state.ongoing})}
          />
          <CheckBox
            containerStyle={styles.checkboxContainer}
            title={"Upcoming"}
            checked={state.upcoming}
            onPress={() => dispatch({ type: ACTION_TYPES.UPCOMING ,payload: !state.upcoming })}
          />
          <CheckBox
            containerStyle={styles.checkboxContainer}
            title={"Finished"}
            checked={state.finished}
            onPress={() => dispatch({ type: ACTION_TYPES.FINISHED ,payload: !state.finished})}
          />
        </View>
        <Text style={styles.sectionHeaderText}>Event mode</Text>
        <View style={styles.eventMode}>
          <CheckBox
            containerStyle={styles.checkboxContainer}
            title={"Online"}
            checked={state.online}
            onPress={() => dispatch({ type: ACTION_TYPES.ONLINE ,payload: !state.online})}
          />
          <CheckBox
            containerStyle={styles.checkboxContainer}
            title={"Offline"}
            checked={state.offline}
            onPress={() => dispatch({ type: ACTION_TYPES.OFFLINE ,payload: !state.offline})}
          />
        </View>
        <Text style={styles.sectionHeaderText}>Event types</Text>
        <View style={styles.eventOptions}>
          <CheckBox
            containerStyle={styles.checkboxContainer}
            title={"Hackathon"}
            checked={state.hackathon}
            onPress={() => dispatch({ type: ACTION_TYPES.HACKATHON,payload: !state.hackathon })}
          />
          <CheckBox
            containerStyle={styles.checkboxContainer}
            title={"Devfest"}
            checked={state.devfest}
            onPress={() => dispatch({ type: ACTION_TYPES.DEVFEST ,payload: !state.devfest})}
          />
          <CheckBox
            containerStyle={styles.checkboxContainer}
            title={"Webinar"}
            checked={state.webinar}
            onPress={() => dispatch({ type: ACTION_TYPES.WEBINAR ,payload: !state.webinar})}
          />
          <CheckBox
            containerStyle={styles.checkboxContainer}
            title={"Seminar"}
            checked={state.seminar}
            onPress={() => dispatch({ type: ACTION_TYPES.SEMINAR ,payload: !state.seminar})}
          />
          <CheckBox
            containerStyle={styles.checkboxContainer}
            title={"Competition"}
            checked={state.competition}
            onPress={() => dispatch({ type: ACTION_TYPES.COMPETITION ,payload: !state.competition})}
          />
          <CheckBox
            containerStyle={styles.checkboxContainer}
            title={"Recruitment"}
            checked={state.recruitment}
            onPress={() => dispatch({ type: ACTION_TYPES.RECRUITMENT,payload: !state.recruitment })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
    buttonContainer: {
      width: width,
      flexDirection: "row",
      // backgroundColor:'yellow',
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    buttonStyle: {
      borderRadius: 10,
      width: width / 2.5,
      marginHorizontal: 20,
    },
    checkboxContainer: {
      // backgroundColor:'red',
      width: width,
    },
    sectionHeaderText: {
      fontFamily: "medium",
      fontSize: height / 50,
      borderBottomColor: _colors_.dark_grey,
      borderBottomWidth: 1,
      padding: 10,
      backgroundColor: _colors_.light_peach,
    },
  });
  return { styles, width, height };
};

export default FilterComponent;
