import React, { useState } from 'react'
import { 
StyleSheet, 
Text, 
View, 
ScrollView,
TextInput,FlatList,
useWindowDimensions, 
SafeAreaView} from 'react-native'

import { Button } from '@rneui/themed';

const Input = (props)=>{
    const { styles } = useStyles();
    const [inputText, setInputText] = useState("")

    return(
        <TextInput
        style={styles.input}
        onChangeText={(text)=>props.setValue(text)}
        value={props.value}
        placeholder="Enter text"
      />
    )
}


const ProfileScreen = ()=>{
    const { styles } = useStyles();
    const [inputText, setInputText] = useState("")
    const [tags, setTags] = useState([]);


    return(
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <Input
            value = {inputText}
            setValue = {(text)=> setInputText(text)}
            />
            <Button
            title={'add'}
            onPress = {()=>{
                setTags([...tags,inputText]);
                setInputText("");
            }}
            />
            <FlatList
            horizontal
            data={tags}
            renderItem={({item})=> <Text>{item}</Text>}
            />

        </ScrollView>
    </SafeAreaView>
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
        input: {
            width: width,
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          },
    });
    return {styles};
};




export default ProfileScreen;