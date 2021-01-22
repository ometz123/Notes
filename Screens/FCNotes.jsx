import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Button } from 'react-native';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { Alert } from 'react-native';
import { Image } from 'react-native';
import { Text, View } from 'react-native';
import { Avatar, ListItem, Overlay } from 'react-native-elements';
const logo = require('../assets/Logo.png');

export default function FCNotes({ navigation, route }) {
    const { category } = route.params;
    const [note, setNote] = useState({});
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => { setVisible(!visible); };

    const showNote = (note) => {
        //alert(note.noteText);
        setNote(note);
        toggleOverlay();
    }
    const info = (note) => {
        Alert.alert(
            `Delete note?`,
            `Are you sure you want to delete \n"${note.noteText > 15 ? note.noteText : (note.noteText).substring(0, 15)}"?`,
            [
                { text: "Cancel", },
                { text: "OK", onPress: () => deleteNote(note) },
            ],
            { cancelable: false }
        );
    }
    const deleteNote = (note) => {
        //console.log("category: ", category);
        const index = category.notes.indexOf(note);
        //console.log(index);
        if (index > -1) {
            category.notes.splice(index, 1);
            //console.log("category: ", category);
        }
        AsyncStorage.setItem(`@${category.title}`, JSON.stringify(category));
        navigation.navigate('Home');
    }
    const List = () => {
        if (category.notes.length < 1) {
            return (<ListItem>
                <ListItem.Content>
                    <ListItem.Title>You Have No Notes Yet!</ListItem.Title>
                </ListItem.Content>
            </ListItem>);
        } else {
            return (category.notes.map((note, i) => {
                return (
                    <ListItem
                        key={i}
                        bottomDivider
                        onPress={() => showNote(note)}
                        onLongPress={() => info(note)}
                    >
                        <Avatar
                            source={note.noteImage?.uri ? note.noteImage : logo}
                        />
                        <ListItem.Content>
                            <ListItem.Title>
                                {(note.noteText).length < 10 ? note.noteText : (note.noteText).substring(0, 9) + '...'}
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                )
            }))
        }
    }
    return (
        <ScrollView>
            <List />
            <Overlay
                isVisible={visible}
                onBackdropPress={toggleOverlay}
                style={{ flex: 0, alignItems: 'center', justifyContent: 'center', height: Dimensions.get("screen").height * 0.1, width: Dimensions.get("screen").width * 0.7 }}
            >
                <ScrollView
                    style={{ height: Dimensions.get("screen").height, width: Dimensions.get("screen").width * 0.7 }}
                >
                    {note.noteImage?.uri ?
                        <View>
                            <Image
                                source={note.noteImage}
                                style={{
                                    width: Dimensions.get("screen").width * 0.7,
                                    height: 200,
                                    alignSelf: 'center'
                                }}
                            />
                        </View>
                        : <View></View>
                    }
                    <Text>{note.noteText}</Text>

                </ScrollView>
                {/* <ScrollView
                    style={{ height: 100 }}
                >
                </ScrollView> */}
                {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    </View> */}



                {/* <Image
                    source={note.noteImage}
                    style={{ width: 200, height: 200 }}
                /> */}
            </Overlay>
        </ScrollView >
    );
}