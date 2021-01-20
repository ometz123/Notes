import * as React from 'react';
import { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';
import FCModalStack from './FCModalStack'
import FCCreateCategory from './FCCreateCategory';
import FCCategories from './FCCategories';
import FCNotes from './FCNotes';
import FCCreateNote from './FCCreateNote';

const logo = require('../assets/Logo.png');

function FCHomeScreen({ navigation, route }) {
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Screen was focused
            // Do something
            //alert('Home Screen was focused');
        });

        return unsubscribe;
    }, [navigation]);
    // useEffect(() => {
    //     if (route.params?.post) {
    //         // Post updated, do something with `route.params.post`
    //         // For example, send the post to the server
    //     }
    // }, [route.params?.post]);
    //const [count, setCount] = useState(0);
    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => (
    //             <Button onPress={() => setCount(c => c + 1)} title="Update count" />
    //         ),
    //     });
    // }, [navigation]);

    return (
        <View style={{ flex: 1, alignItems: 'center'/*, justifyContent: 'center'*/ }}>
            {/* <Button
                title="Go to Details"
                onPress={() => {
                    navigation.navigate('Details');
                }}
            /> 
            <Text></Text>*/}
            <Button
                title="Create New Category"
                onPress={() => {
                    navigation.navigate('FCCreateCategory'
                        //, {
                        //itemId: 86,
                        //otherParam: 'anything you want here',
                        //}
                    );
                    //navigation.setParams({ itemId: 69 })
                }}
            />
            <Text>{'\n'}</Text>
            {/* <Text>Count: {count}</Text>
            <Button
                title="Create post"
                onPress={() => navigation.navigate('CreatePost')}
            />

            <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>

            <Text>{'\n'}</Text>
            <Button
                title="Go to Profile"
                onPress={() =>
                    navigation.navigate('Profile', { name: 'Custom profile header' })
                }
            />
            <Text>{'\n'}</Text>
            <Button
                title="Update the title"
                onPress={() => navigation.setOptions({ title: 'Updated!' })}
            />
            <Text>{'\n'}</Text>
            <Button
                title="Go to FCModalStack"
                onPress={() => navigation.navigate('FCModalStack')}
            /> */}
        </View>
    );
}
function CreatePostScreen({ navigation, route }) {
    const [postText, setPostText] = useState('');

    return (
        <>
            <TextInput
                multiline
                placeholder="What's on your mind?"
                style={{ height: 200, padding: 10, backgroundColor: 'white' }}
                value={postText}
                onChangeText={setPostText}
            />
            <Button
                title="Done"
                onPress={() => {
                    // Pass params back to home screen
                    navigation.navigate('Home', { post: postText });
                }}
            />
        </>
    );
}
function DetailsScreen({ navigation, route }) {
    /* 2. Get the param */
    const { itemId, otherParam } = route.params;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>itemId: {itemId}</Text>
            <Text>otherParam: {otherParam}</Text>
            <Button
                title="Go to Details... again"
                onPress={() =>
                    navigation.push('Details', {
                        itemId: Math.floor(Math.random() * 100),
                        otherParam: `Bitch No ${itemId * 2} `
                    })
                }
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}
function ProfileScreen({ navigation }) {
    //const [header, setHeader] = useState('');
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Screen was focused
            // Do something
            //alert('Screen was focused');
        });
        return unsubscribe;
    }, [navigation]);
    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            //alert('profile is focused!');
            return () => {
                //alert('profile is not focused!');
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile screen</Text>
            {/* <TextInput
                multiline
                placeholder="New Header Title"
                style={{ height: 200, padding: 10, backgroundColor: 'white' }}
                value={header}
                onChangeText={setHeader}
            /> */}
            {/* <Button title="Go Home" onPress={() => navigation.navigate('Home', { header: header })} /> */}
            <Button title="Go Home" onPress={() => navigation.goBack()} />
        </View>
    );
}
function LogoTitle() {
    return (
        <Image
            style={{ width: 50, height: 50 }}
            source={logo}
        />
    );
}

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>
                <Stack.Screen
                    name="Home"
                    component={FCCategories}
                    //options={{ title: 'Categories' }}
                    //options={({ route }) => ({ title: route.params?.header })}
                    //initialParams={{ title: "Categories" }}
                    options={({ navigation, route }) => ({
                        title: 'Categories',
                        //headerRight: props => <LogoTitle {...props} />,
                        // headerStyle: {
                        //     backgroundColor: '#f4511e',
                        // },
                        // headerTintColor: '#fff',
                        // headerTitleStyle: {
                        //     fontWeight: 'bold',
                        // },
                        headerRight: () => (
                            <Button
                                title="Create New Category"
                                onPress={() => {
                                    navigation.navigate('FCCreateCategory'
                                        //, {
                                        //itemId: 86,
                                        //otherParam: 'anything you want here',
                                        //}
                                    );
                                    //navigation.setParams({ itemId: 69 })
                                }}
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="FCCreateCategory"
                    component={FCCreateCategory}
                // options={({ route }) => ({
                //     title: route.params.name,
                // })}
                />
                <Stack.Screen
                    name="FCNotes"
                    component={FCNotes}
                    options={({ navigation, route }) => ({
                        title: route.params.category.title,
                        headerRight: () => (
                            <Button
                                title="Create New Note"
                                onPress={() => {
                                    navigation.navigate('FCCreateNote', {
                                        category: route.params.category
                                    });
                                }}
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="FCCreateNote"
                    component={FCCreateNote}
                    options={{ title: "New Note" }}
                />
                {/* 
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                //initialParams={{ itemId: 42 }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={({ route }) => ({
                        title: route.params.name,
                        headerTitle: props => <LogoTitle {...props} />

                    })}
                />
                <Stack.Screen
                    name="FCModalStack"
                    component={FCModalStack}
                // options={({ route }) => ({
                //     title: route.params.name,
                // })}
                /> */}

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;