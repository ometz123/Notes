import React, { useState, useEffect } from 'react';
import { Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';

export default function FCGallery() {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            ///

            ///
        }
    };

    return (
        <View >
            <Button
                title=""
                buttonStyle={{ backgroundColor: "#8e19d1" }}
                onPress={pickImage}
                icon={
                    <Icon
                        name="images-outline"
                        size={40}
                        color="white"
                    />
                }
            />
            {/* <Button
                title="Pick an image from camera roll"
                onPress={pickImage}
            /> */}
            {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
        </View>
    );
}