import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import FCGallery from './FCGallery';
const logo = require('../assets/Logo.png');

export default function FCCreateNote({ navigation, route }) {
    const [noteText, setNoteText] = useState('');
    const [noteImage, setNoteImage] = useState({});
    const { category } = route.params;
    const [noteButton, setNoteButton] = useState(true);
    const [noteMessage, setNoteMessage] = useState("");

    const storeData = async () => {
        category.notes.push({ noteText: noteText, noteImage: noteImage });
        //console.log('=============setItem================');
        try {
            await AsyncStorage.setItem(`@${category.title}`, JSON.stringify(category));
            const item = await AsyncStorage.getItem(`@${category.title}`);
            //console.log("item: ", item);
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
    useEffect(() => {
        if (noteText.trim() === "" || noteText.length < 3) {
            setNoteButton(true);
            setNoteMessage("Note must be at least 3 characters");
        }
        else {
            setNoteMessage("");
            setNoteButton(false);
        }
    }, [noteText, noteImage]);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Screen was focused
            // Do something
        });
        return unsubscribe;
    }, []);

    return (
        <>
            <TextInput
                multiline
                placeholder="What's on your mind?"
                style={{ height: 200, padding: 10, backgroundColor: 'white' }}
                value={noteText}
                onChangeText={setNoteText}
            />
            <Text style={{ alignSelf: "center", color: "red" }}>{noteMessage}</Text>
            <Button
                title="Done"
                disabled={noteButton}
                onPress={() => {
                    storeData();
                }}
            />
            <Text></Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button
                    title=""
                    buttonStyle={{ backgroundColor: "#fcaf17" }}
                    onPress={() => {
                        navigation.navigate('FCCamera', { setNoteImage: setNoteImage });
                    }}
                    icon={
                        <Icon
                            name="camera-outline"
                            size={40}
                            color="white"
                        />
                    }
                />
                <FCGallery setNoteImage={setNoteImage} />
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
            <View style={{ flex: 1, alignItems: 'center'/*, borderColor: 'black', borderWidth: 1*/ }}>
                {<Image
                    source={noteImage ?? logo}
                    style={{ width: 200, height: 200 }}
                />}
            </View>
        </>
    );
}