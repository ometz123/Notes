import React from 'react';
import { useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export default function FCCreateCategory({ navigation, route }) {

    const [newCategory, setNewCategory] = useState("");
    const [categoryMessage, setCategoryMessage] = useState("");
    const [categoryButton, setCategoryButton] = useState(true);

    const clearAllData = async () => {
        await AsyncStorage.clear();
        alert('Async Storage is clean!');
        //console.log('============getAllKeys==============');
        let keys = []
        try {
            keys = await AsyncStorage.getAllKeys()
        } catch (e) {
            // read key error
        }
        //console.log(keys)
        // example console.log result:
        // ['@MyApp_user', '@MyApp_key']
        //console.log('====================================');

    }

    const storeData = async (value) => {

        //console.log('=============setItem================');
        try {
            if (await AsyncStorage.getItem(`@${value}`)) {
                Alert.alert(
                    `"${value}"`,
                    "You already have that category name!\nPlease type another category name",
                    [
                        { text: "OK" }
                    ],
                    { cancelable: false }
                );
                return;
            }
            await AsyncStorage.setItem(`@${value}`, JSON.stringify({
                title: value,
                notes: []
            }));
            const item = await AsyncStorage.getItem(`@${value}`);
            //console.log(item);
            Alert.alert(
                `"${newCategory}"`,
                "You created a new category!",
                [
                    { text: "OK", onPress: () => navigation.navigate('Home') }
                ],
                { cancelable: false }
            );
            // console.log('============getAllKeys==============');
            // let keys = []
            // try {
            //     keys = await AsyncStorage.getAllKeys()
            // } catch (e) {
            //     // read key error
            // }
            // console.log(keys)
            // console.log('====================================');
        } catch (error) {
            Alert.alert(`Saving error`, `New category "${value}" was not saved`);
        }

    }

    useEffect(() => {
        if (newCategory.trim() === "" || newCategory.length < 3) {
            setCategoryButton(true);
            setCategoryMessage("Category must be at least 3 characters");
        }
        else {
            setCategoryMessage("");
            setCategoryButton(false);
        }
    }, [newCategory]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
            <TextInput
                placeholder="Type a new Category"
                style={{ height: 50, padding: 10, backgroundColor: 'white', width: '90%' }}
                value={newCategory}
                onChangeText={setNewCategory}
            />
            <Button
                title="Save"
                onPress={() => { storeData(newCategory) }}
                disabled={categoryButton}
            />
            <Text style={{ color: "#f00" }}>
                {categoryMessage}
            </Text>
            <Button
                color='#f00'
                title="clear All Categories"
                onPress={() => { clearAllData() }}
            />
        </View>
    );
}
