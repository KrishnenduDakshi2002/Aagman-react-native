import React, { useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

//importing icons
import {
  AntDesign,
  Octicons,
  FontAwesome5,
  FontAwesome,
  Ionicons,
  Feather,
} from "@expo/vector-icons";

import { useFonts } from "expo-font";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../screens/home.screen";
import EventCalenderComponent from "../components/molecules/eventCalendar.component";
import { _fonts_ } from "../styles/fonts";
import { _colors_ } from "../styles/colors";
import DiscussionScreen from "../screens/discussion.screen";
import BlogScreen from "../screens/blog.screen";
import SimilarInterestScreen from "../screens/similar.interest";

const Tab = createMaterialBottomTabNavigator();

const HomeTabNavigator = () => {
  const { styles } = useStyles();

  const [fontsLoaded] = useFonts(_fonts_);
  if (!fontsLoaded) return null;
  return (
    <Tab.Navigator
      labeled={false}
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: _colors_.dark_blue }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Eventcalender"
        component={EventCalenderComponent}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="calendar-check-o" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="DisscussionScreen"
        component={DiscussionScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Octicons name="comment-discussion" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="BlogScreen"
        component={BlogScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="paper-plane" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="SimilarInterestScreen"
        component={SimilarInterestScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return { styles };
};

export default HomeTabNavigator;