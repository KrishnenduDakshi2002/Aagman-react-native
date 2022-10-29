import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  StatusBar,
  SafeAreaView,
} from "react-native";

import { Agenda } from "react-native-calendars";
import EventItemComponent from "../atoms/eventItem.component";


const EventCalenderComponent = () => {
  const { styles } = useStyles();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" translucent={false} />
      <Agenda
        style={styles.agendaStyle}
        pagingEnabled
        items={{
          "2022-10-22": [{ name: "item 1 - any js object" }],
          "2022-10-23": [{ name: "item 2 - any js object", height: 30 }],
          "2022-10-24": [
            { name: "item 2 - any js object", height: 30 },
            { name: "item 2 - any js object", height: 30 },
          ],
        }}
        // specifying how every item should be rendered
        renderItem={(item, firstItemInDay) => <EventItemComponent/>}
        // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return <Text>There is no events</Text>;
        }}
        markingType={"period"}
        markedDates={{
          "2022-10-15": { marked: true, dotColor: "#50cebb" },
          "2022-10-16": { marked: true, dotColor: "#50cebb" },
          "2022-10-21": {
            startingDay: true,
            color: "#50cebb",
            textColor: "white",
          },
          "2022-10-22": { color: "#70d7c7", textColor: "white" },
          "2022-10-23": {
            color: "#70d7c7",
            textColor: "white",
            marked: true,
            dotColor: "white",
          },
          "2022-10-24": { color: "#70d7c7", textColor: "white" },
          "2022-10-25": {
            endingDay: true,
            color: "#50cebb",
            textColor: "white",
          },
        }}
      />
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
    agendaStyle: {
      width: width,
    },

    //event item component styles
    
  });
  return { styles };
};

export default EventCalenderComponent;
