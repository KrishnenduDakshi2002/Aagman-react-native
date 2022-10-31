import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
} from "react-native";

import { Button, Dialog } from "@rneui/themed";
import { _colors_ } from "../../styles/colors";

import { useFonts } from "expo-font";

const ButtonComponent = ({ title, color = _colors_.light_brick }) => {
    const[fontsLoaded]= useFonts();

  return (
    <Button
      radius={10}
      color={color}
      title={title}
      containerStyle={{ marginVertical: 10 }}
      titleStyle = {{color: 'black',fontFamily:'medium'}}
    />
  );
};

const HomeEventDialog = (props) => {
  const { styles } = useStyles();
  return (
    <Dialog
      isVisible={props.isDialogVisible}
      onBackdropPress={() => props.setVisibitlity(false)}
    >
      <Dialog.Actions>
        <View style={{ width: "100%" }}>
          <ButtonComponent title="Hackathon" />
          <ButtonComponent title="Devfest" />
          <ButtonComponent title="Webinar" />
          <ButtonComponent title="Seminar" />
          <ButtonComponent title="Recruitment" />
          <ButtonComponent title="Competition" />
          <ButtonComponent title="Induction" />
        </View>
      </Dialog.Actions>
    </Dialog>
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

export default HomeEventDialog;
