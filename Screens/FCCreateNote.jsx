import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import FCGallery from './FCGallery';
const logo = require('../assets/Logo.png');

export default function FCCreateNote({ navigation, route }) {
    const { photo } = route.params;
    const [noteText, setNoteText] = useState('');
    const [noteImageUri, setNoteImageUri] = useState('');
    const { category } = route.params;

    const storeData = async () => {
        category.notes.push({ noteText: noteText, noteImage: noteImageUri });
        console.log('=============setItem================');
        try {
            await AsyncStorage.setItem(`@${category.title}`, JSON.stringify(category));
            const item = await AsyncStorage.getItem(`@${category.title}`);
            console.log("item: ", item);
            Alert.alert(
                `New Note`,
                "You created a new note!",
                [
                    { text: "OK", onPress: () => navigation.navigate('Home') }
                ],
                { cancelable: false }
            );
        } catch (error) {
            Alert.alert(`Saving error`, `The new note was not saved`);
        }
    }

    return (
        <>
            <TextInput
                multiline
                placeholder="What's on your mind?"
                style={{ height: 200, padding: 10, backgroundColor: 'white' }}
                value={noteText}
                onChangeText={setNoteText}
            />
            <Button
                title="Done"
                onPress={() => {
                    storeData();
                }}
            />
            <Text></Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button
                    title=""
                    buttonStyle={{ backgroundColor: "#fcaf17" }}
                    onPress={() => navigation.navigate('FCCamera')}
                    icon={
                        <Icon
                            name="camera-outline"
                            size={40}
                            color="white"
                        />
                    }
                />
                <FCGallery />
                {/* <Button
                    title=""
                    buttonStyle={{ backgroundColor: "#8e19d1" }}
                    onPress={() => navigation.navigate('FCGallery')}
                    icon={
                        <Icon
                        name="images-outline"
                        size={40}
                        color="white"
                        />
                    }
                /> */}
            </View>
            <View style={{ flex: 1, alignItems: 'center', borderColor: 'black',borderWidth:1 }}>
                {<Image
                    source={logo}
                    style={{ width: 200, height: 200 }}
                />}
            </View>
        </>
    );
}