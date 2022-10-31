import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Platform,
  useWindowDimensions,
  Pressable,
  Button,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { Ionicons, Feather } from "react-native-vector-icons";


const details = {
  data: [
    {
      id: 1,
      name: "DSA",
      image: require("../../assets/Similarinterest/dsa.png"),
    },
    {
      id: 2,
      name: "Web Development",
      image: require("../../assets/Similarinterest/webdev.png"),
    },
    {
      id: 3,
      name: "App Development",
      image: require("../../assets/Similarinterest/appdev.png"),
    },
    {
      id: 4,
      name: "Machine Learning",
      image: require("../../assets/Similarinterest/ml.jpg"),
    },
    {
      id: 5,
      name: "Hackathon",
      image: require("../../assets/Similarinterest/hackathon.png"),
    },
    {
      id: 6,
      name: "UI-UX",
      image: require("../../assets/Similarinterest/uiux.jpg"),
    },
    {
      id: 7,
      name: "IoT",
      image: require("../../assets/Similarinterest/dsa.png"),
    },
    {
      id: 8,
      name: "Graphic Design",
      image: require("../../assets/Similarinterest/dsa.png"),
    },
    {
      id: 9,
      name: "Block Chain",
      image: require("../../assets/Similarinterest/dsa.png"),
    },
    {
      id: 10,
      name: "AI",
      image: require("../../assets/Similarinterest/dsa.png"),
    },
    {
      id: 11,
      name: "Start Ups",
      image: require("../../assets/Similarinterest/dsa.png"),
    },
    {
      id: 12,
      name: "Others",
      image: require("../../assets/Similarinterest/dsa.png"),
    },
  ],
};

// function SimilarInterestScreen ({ navigation, route }) {
const SimilarInterestScreen = ({ navigation }) => {
  const { styles, width, height } = useStyles();
  const [searchText, setSearchText] = useState("");
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
            Find people with similar interest
          </Text>
          <Pressable
            style={({ pressed }) => [
              { position: "absolute", right: 30, opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <Feather name="download" size={28} color="black" />
          </Pressable>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          navigation={navigation}
          data={details.data}
          renderItem={({ item }) => (
            <View
              onPress={() =>
                details.props.navigation.navigate("Detail", {
                  id: item.id,
                  name: item.name,
                  image: item.image,
                })
              }
            >
              <View style={styles.card}>
                <Image style={styles.image} source={item.image} />
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>

                  <TouchableOpacity
                    style={styles.findButton}
                  >
                    <Text style={styles.findButtonText}>Find People</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};
const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
    },
    cardContent: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    card: {
      shadowColor: "#00000021",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,

      marginVertical: 10,
      marginHorizontal: 20,
      backgroundColor: "white",
      flexBasis: "42%",
      padding: 10,
      flexDirection: "row",
    },

    name: {
      fontSize: 18,
      flex: 1,
      alignSelf: "center",
      color: "#696969",
      fontWeight: "bold",
    },
    findButton: {
      marginTop: 10,
      height: 35,
      width: 150,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 30,
      backgroundColor: "#00BFFF",
    },
    findButtonText: {
      color: "white",
      fontSize: 15,
    },
  });
  return { styles, width, height };
};

export default SimilarInterestScreen;
