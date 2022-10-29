import React, { useState } from 'react'
import { 
StyleSheet, 
Text, 
View, 
useWindowDimensions } from 'react-native'


const DiscussionScreen = ()=>{
    const { styles } = useStyles();
    return(
    <View style={styles.container}>
        <Text> This is discussion screen </Text>
    </View>
)
}


const useStyles = ()=>{
    const {width,height} = useWindowDimensions();
    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent:"center",
            alignItems:"center",
        },
    });
    return {styles};
};




export default DiscussionScreen;