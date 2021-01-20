import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Button } from 'react-native';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function FCCreateNote({ navigation, route }) {

    const [noteText, setNoteText] = useState('');
    const [noteImage, setNoteImage] = useState('');
    const { category } = route.params;

    const storeData = async (value) => {
        category.notes.push({ noteText: noteText, noteImage: noteImage });
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

    const handleNewNote = () => {
        storeData({ noteText: noteText, noteImage: noteImage })
        //navigation.goBack();
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
                    handleNewNote();
                    // Pass params back to home screen
                }}
            />
        </>
    );
}