import React, { useState } from 'react'
import { 
StyleSheet, 
Text, 
View, 
useWindowDimensions } from 'react-native'


const QueryTileComponetn = ()=>{
    const { styles } = useStyles();
    return(
    <View style={styles.container}>
        <Text> Hello world </Text>
    </View>
)
}


const useStyles = ()=>{
    const {width,height} = useWindowDimensions();
    const styles = StyleSheet.create({
        container:{
            width: width,
            height: 150,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:'pink'
        },
    });
    return {styles};
};




export default QueryTileComponetn;