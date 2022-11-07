import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  FlatList,
  useWindowDimensions,
  SafeAreaView,
  RefreshControl,
} from "react-native";

import { Button } from "@rneui/themed";

const ProfileScreen = () => {
  const { styles, width, height } = useStyles();
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const LoadData = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
      .then((res) => res.json())
      .then((response) => {
        console.log("lazy loading page->", page);
        console.log('response first Id->',response[0].id)
        setData([...data, ...response]);
        setPage(page + 1);
        setIsLoading(false);
      });
  };

  const onRefreshLoadData = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${1}&_limit=10`)
      .then((res) => res.json())
      .then((response) => {
        console.log("refresh loading page->");
        setData(response);
        setPage(2);
        setIsRefreshing(false);
      });
  };

  useEffect(() => {
    console.log("running use effect");
    LoadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {data.length == 0 ? (
        <Text>loading...</Text>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => {
                setIsRefreshing(true);
                onRefreshLoadData();
              }}
            />
          }
          data={data}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  height: 80,
                  width: width,
                  backgroundColor: "pink",
                  marginBottom: 5,
                  justifyContent: "center",
                  paddingLeft: 10,
                }}
              >
                <Text>Item id : {item.id}</Text>
                <Text>UserId : {item.userId}</Text>
                <Text>{item.title}</Text>
              </View>
            );
          }}
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            setIsLoading(true);
            LoadData();
          }}
        />
      )}
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
    },
    input: {
      width: width,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  return { styles, width, height };
};

export default ProfileScreen;
