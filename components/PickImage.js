import React, { useState } from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
export let linkImage;
export let imageNull;
export default function PickImage() {
    const [image, setImage] = useState(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
        upLoadImage(result.assets[0].uri);
    };
    imageNull = () => {
        setImage(null);
    };
    const upLoadImage = async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const storage = getStorage();
        const fileName = image.substring(image.lastIndexOf('/') + 1);
        const storageRef = ref(storage, 'images/' + fileName);
        await uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
        await getDownloadURL(ref(storage, 'images/' + fileName))
            .then((url) => {
                linkImage = url;
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <View className="flex-1 ml-1 h-full justify-center items-center ">
            <TouchableOpacity
                onPress={pickImage}
                className="h-3/4 border w-full justify-center items-center rounded-xl"
            >
                <Text className="text-base font-bold">Hình</Text>
            </TouchableOpacity>

            {image && <Text>Đã đính kèm ảnh</Text>}
        </View>
    );
}
