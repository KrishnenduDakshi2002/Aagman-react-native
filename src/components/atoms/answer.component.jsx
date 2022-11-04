import React, { useState } from 'react'
import { 
StyleSheet, 
Text, 
View, 
useWindowDimensions } from 'react-native'

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useFonts } from 'expo-font';
import { _fonts_ } from '../../styles/fonts';
import { _colors_ } from '../../styles/colors';

dayjs.extend(relativeTime);

const AnswerComponent =(props)=>{
    const { styles,height } = useStyles();

    const [fontsLoaded] = useFonts(_fonts_);
    if(!fontsLoaded) return null;

    return(
    <View style={styles.container}>
        <View style={{marginBottom: 15}}>
            <Text selectable style={{fontFamily:'regular',fontSize: height/52}}>{props.answer}</Text>

        </View>
        <View style={{flexDirection: "row",justifyContent:'flex-end',width:'100%'}}>
            <Text style={{fontFamily:'regular',fontSize:height/60,color:_colors_.dark_grey}}>{dayjs(props.date).fromNow()}</Text>
            <Text style={{fontFamily: 'bold',marginLeft:20,color:_colors_.dark_blue,fontSize: height/55}}>{props.author.userName}</Text>
        </View>
    </View>
)
}


const useStyles = ()=>{
    const {width,height} = useWindowDimensions();
    const styles = StyleSheet.create({
        container:{
            width: '100%',
            backgroundColor:'#E2FDFD',
            justifyContent:"center",
            alignItems:"center",
            marginTop: 10,
            paddingVertical: 20,
            paddingHorizontal: 10
        },
    });
    return {styles,height};
};




export default AnswerComponent;