import React, { useState } from 'react'
import { 
StyleSheet, 
Text, 
View, 
useWindowDimensions } from 'react-native'


const Divider = ({ width = 1, color = "black" }) => {
    return (
      <View
        style={{
          backgroundColor: color,
          height: width,
          width: "100%",
        }}
      ></View>
    );
  }



export default Divider;