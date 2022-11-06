import React, { useState } from 'react'
import { 
StyleSheet, 
Text, 
View, 
useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import LoadingComponent from './loading.component'


const componentArray = [1,2,3,4,5]

const LoadingScreen = ()=>{
    const { styles } = useStyles();
    return(
    <ScrollView 
    showsVerticalScrollIndicator = {false}
    contentContainerStyle={styles.container}>
        {
            componentArray.map(val=> <LoadingComponent key={val}/>)
        }
    </ScrollView>
)
}


const useStyles = ()=>{
    const {width,height} = useWindowDimensions();
    const styles = StyleSheet.create({
        container:{
            width: width,
            backgroundColor: 'lightgrey',
            justifyContent:"center",
            alignItems:"center",
        },
    });
    return {styles};
};




export default LoadingScreen;