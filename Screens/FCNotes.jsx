import React, { useState } from 'react';
import { Button } from 'react-native';
import { Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

export default function FCNotes({ navigation, route }) {

    const { category } = route.params;

    const List = () => {
        if (category.notes.length < 1) {
            return <Text>You Have No Notes Yet!</Text>
        } else {
            return (category.notes.map((note, i) => {
                return (
                    <ListItem
                        key={i}
                        bottomDivider
                    //onPress={() => showNotes(category)}
                    //onLongPress={() => info(category)}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{note.noteText}</ListItem.Title>
                        </ListItem.Content>
                        {/* <Badge
                            value={category.notes.length}
                            textStyle={{ color: 'white' }}
                            containerStyle={{ marginTop: -20 }}
                        /> */}
                    </ListItem>
                )
            }))

        }
    }
    return (
        <ScrollView>
            <List />
        </ScrollView>
    );
}