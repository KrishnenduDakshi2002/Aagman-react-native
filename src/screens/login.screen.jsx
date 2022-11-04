import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeAreaView } from "react-native-safe-area-context";
import InputComponent from "../components/atoms/Input.component";

import { Button } from "@rneui/themed";
import { HOST } from "../config";

const LoginScreen = ({ navigation }) => {
  const { styles, width, height } = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginFunction = () => {
    fetch(`${HOST}/api/v1/user/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          if (data.statusCode === 200) {
            await AsyncStorage.setItem("authToken", data.authToken);
            navigation.navigate("HomeTab");
          } else {
            Alert.alert("Enter valid value");
          }
        } catch (error) {
          Alert.alert("Error while storing token");
        }
      });
  };

  const GetToken = async () => {
    const token = await AsyncStorage.getItem("authToken");
    if (token !== null || token !== undefined) {
      fetch(`${HOST}/api/v1/user/verifyToken`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`
        },
      }).then(res=> res.json()).then(data => {
        if(data.statusCode === 200){
            navigation.navigate("HomeTab");
        }
      });
    }
  };
  useEffect(() => {
    GetToken();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        width: width,
        marginBottom: 30,
        marginTop: 50,
        // paddingHorizontal: 15,
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 0.8,
          // backgroundColor:'pink',
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InputComponent
          style={styles.question}
          value={email}
          onChangeTextFunction={(text) => setEmail(text)}
          placeholder={"Enter email"}
        />
        <InputComponent
          password
          style={styles.question}
          value={password}
          onChangeTextFunction={(text) => setPassword(text)}
          placeholder={"Enter password"}
        />
        <View>
          <Button
            buttonStyle={{
              paddingHorizontal: 40,
              marginBottom: 20,
              paddingVertical: 10,
            }}
            title={"Login"}
            radius={10}
            onPress={LoginFunction}
          />
          <Button title={"Sign up"} radius={10} />
        </View>
      </View>
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
      paddingHorizontal: 20,
    },
    question: {
      flexDirection: "row",
      height: 50,
      width: "80%",
      borderWidth: 1,
      borderRadius: 15,
      borderColor: "black",
      paddingLeft: 15,
      alignItems: "center",
      marginBottom: 30,
    },
  });
  return { styles, width, height };
};

export default LoginScreen;
