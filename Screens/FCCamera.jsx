import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';
import { Vibration } from 'react-native';


export default function FCCamera({ navigation, route }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [camera, setCamera] = useState(null);
    //#region Hide
    const [type, setType] = useState(Camera.Constants.Type.back);
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    //#endregion

    const snap = async () => {
        if (camera) {
            //let photo = await this.camera.takePictureAsync({ quality: 0.2 });
            let photo = await camera.takePictureAsync();
            Vibration.vibrate();
            //console.log(photo);
            //setImage({ photoUri: photo.uri });
            ///
            navigation.setOptions({ photo: photo });
            navigation.goBack();
            ///
        }
    };

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={type}
                ref={ref => {
                    setCamera(ref);
                }}
            >
                <View style={styles.buttonContainer}>
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column-reverse' }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                            <Text style={styles.text}> Flip </Text>
                        </TouchableOpacity>
                        <Button
                            title=""
                            buttonStyle={{ backgroundColor: "#fcaf17" }}
                            onPress={snap}
                            icon={
                                <Icon
                                    name="camera-outline"
                                    size={40}
                                    color="white"
                                />
                            }
                        />
                    </View>
                </View>
            </Camera>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});