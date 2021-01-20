import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Button } from 'react-native';
import { Text, View } from 'react-native';
import { ListItem, Avatar, Badge } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

function FCCategories({ navigation, route }) {
    const [categories, setCategories] = useState([]);

    const GetCategories = async () => {
        console.log("Get Notes");
        try {
            let keys = await AsyncStorage.getAllKeys();
            let results = await AsyncStorage.multiGet(keys);
            console.log('results= ', results);
            let categories = [];
            results.forEach(category => {
                categories.push(JSON.parse(category[1]))
            })
            console.log('categories= ', categories);
            setCategories(categories);
        } catch (error) {
            console.error(error)
        }


    };


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            GetCategories();
            // Screen was focused
            // Do something
            //alert('Home Screen was focused');
        });

        return unsubscribe;
    }, [navigation]);

    //#region hide
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
    //#endregion
    showNotes = (category) => {
        navigation.navigate('FCNotes', {
            category: category
        });
        
    }

    const List = () => {
        if (categories.length < 1) {
            return <Text>You Have No Categories Yet!</Text>
        } else {
            return (categories.map((category, i) => {
                return (
                    <ListItem
                        key={i}
                        bottomDivider
                        onPress={() => showNotes(category)}
                        //onLongPress={() => info(category)}

                    >
                        <ListItem.Content>
                            <ListItem.Title>{category.title}</ListItem.Title>
                        </ListItem.Content>
                        <Badge
                            value={category.notes.length}
                            textStyle={{ color: 'white' }}
                            containerStyle={{ marginTop: -20 }}
                        />
                    </ListItem>
                )
            }))

        }
    }

    return (
        <ScrollView contentContainerStyle={{ flex: 1, /*alignItems: 'center'/*, justifyContent: 'center'*/ }}>
            {
                //#region hide 
                // <Button
                //     title="Go to Details"
                //     onPress={() => {
                //         navigation.navigate('Details');
                //     }}
                // />
                // <Text></Text>
                // <Button
                //     title="Create New Category"
                //     onPress={() => {
                //         navigation.navigate('FCCreateCategory'
                //             //, {
                //             //itemId: 86,
                //             //otherParam: 'anything you want here',
                //             //}
                //         );
                //         //navigation.setParams({ itemId: 69 })
                //     }}
                // />
                // <Text>{'\n'}</Text>
                // <Text>Count: {count}</Text>
                // <Button
                //     title="Create post"
                //     onPress={() => navigation.navigate('CreatePost')}
                // />

                // <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>

                // <Text>{'\n'}</Text>
                // <Button
                //     title="Go to Profile"
                //     onPress={() =>
                //         navigation.navigate('Profile', { name: 'Custom profile header' })
                //     }
                // />
                // <Text>{'\n'}</Text>
                // <Button
                //     title="Update the title"
                //     onPress={() => navigation.setOptions({ title: 'Updated!' })}
                // />
                // <Text>{'\n'}</Text>
                // <Button
                //     title="Go to FCModalStack"
                //     onPress={() => navigation.navigate('FCModalStack')}
                // /> 
                //#endregion
            }
            <View>
                <Text></Text>
                {<List />
                    //#region Hide
                    // categories.map((category, i) => {
                    //     if (categories.length < 1) {
                    //         return <Text>You Have No Notes Yet!</Text>
                    //     }
                    //     else {
                    //         return (
                    //             <ListItem
                    //                 key={i}
                    //                 bottomDivider
                    //             >
                    //                 <ListItem.Content>
                    //                     <ListItem.Title>{category.title}</ListItem.Title>
                    //                     {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle> */}
                    //                 </ListItem.Content>
                    //                 <Badge
                    //                     value={category.notes.length}
                    //                     textStyle={{ color: 'white' }}
                    //                     containerStyle={{ marginTop: -20 }}
                    //                 />
                    //             </ListItem>
                    //         )
                    //     }
                    // <ListItem
                    //     key={i}
                    //     //leftIcon={{ name: category.icon }}
                    //     bottomDivider
                    // // linearGradientProps={{
                    // //     colors: ['#FF9800', '#F44336'],
                    // //     start: [1, 0],
                    // //     end: [0.2, 0],
                    // // }}
                    // // badge={{
                    // //     value: category.notes.length,
                    // //     textStyle: { color: 'white' },
                    // //     //badgeStyle: {width:100 }
                    // // }}


                    // //onPress={() => this.ShowNotes(category)}
                    // //onLongPress={() => this.Info(category)}
                    // >
                    //     <ListItem.Content>
                    //         <ListItem.Title>{category.title}</ListItem.Title>

                    //     </ListItem.Content>

                    // </ListItem>
                    //}
                    //  )
                    //#endregion
                }
            </View>
        </ScrollView>
    );
}

export default FCCategories;
