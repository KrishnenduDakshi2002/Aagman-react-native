import React, { useState } from "react";
import { Button, SafeAreaView, View ,Text} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat)

const Example = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const [date, setDate] = useState(null);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (val) => {
    console.warn("A date has been picked: ", val);
    setDate(val);
    hideDatePicker();
  };

    // console.log(dayjs(date).format('LT'));
  return (
    <SafeAreaView
    style={{justifyContent:'center',alignItems:'center',flex:1}}
    >
        <Text>{dayjs(date).format('LT')}</Text>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
};

export default Example;