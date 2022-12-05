import React, { useEffect, useState } from 'react';
import {
    Text,
    TextInput,
    View,
    ScrollView,
    Alert,
    Image,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import appFirebase from '../configFirebase';
import { getDatabase, ref, onValue, set, push } from 'firebase/database';
import PickImage from './PickImage';
import { linkImage, imageNull } from './PickImage';
const Blog = ({ navigation, route }) => {
    const [text, setText] = useState('');
    const [posts, setPosts] = useState([]);
    const handleSignout = () => {
        const auth = getAuth(appFirebase);
        signOut(auth)
            .then(() => {
                navigation.navigate('Đăng nhập');
            })
            .catch((error) => {
                // An error happened.
                alert(error);
            });
    };

    const createPost = () => {
        if (text.length <= 140) {
            setText();
            const db = getDatabase();
            const postListRef = ref(db, 'posts');
            const newPostRef = push(postListRef);
            if (linkImage) {
                set(newPostRef, {
                    image: linkImage,
                    email: route.params.email,
                    text: text,
                });
            } else {
                set(newPostRef, {
                    email: route.params.email,
                    text: text,
                });
            }
            imageNull();
        } else if (text.length > 140) {
            alert('Bạn viết quá nhiều ký tự cho phép');
        } else {
            alert('Bạn chưa nhập bài viết');
        }
    };
    const deletePost = (item) => {
        if (item.email === route.params.email) {
            Alert.alert(
                'Xóa',
                'Bạn có chắn muốn xóa bài viết?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            const dbPost = getDatabase();
                            set(ref(dbPost, 'posts/' + item.id), {
                                email: null,
                                text: null,
                            })
                                .then(() => {
                                    alert('Xóa thành công');
                                })
                                .catch((error) => {
                                    alert(error);
                                });
                        },
                    },
                ],
                {
                    type: 'secure-text',
                    cancelable: false,
                    defaultValue: 'test',
                    placeholder: 'placeholder',
                }
            );
        } else {
            alert('bạn không có quyền xóa bài viết người khác');
        }
    };
    const editPost = (item) => {
        if (item.email !== route.params.email) {
            alert('Không có quyền sửa bài viết người khác');
        } else {
            if (Platform.OS === 'android') {
                alert('Không sử dụng được trên android vui lòng dùng ios');
            }
            Alert.prompt('Sửa', 'Nhập nội dung cần sửa', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: (text) => {
                        if (text.length <= 140) {
                            const dbPost = getDatabase();
                            set(ref(dbPost, 'posts/' + item.id), {
                                text: text,
                                email: item.email,
                            })
                                .then(() => {
                                    alert('Sửa thành công');
                                })
                                .catch((error) => {
                                    alert(error);
                                });
                        } else if (text.length > 140) {
                            alert('Bạn nhập quá nhiều ký tự');
                        }
                    },
                },
            ]);
        }
    };
    useEffect(() => {
        const db = getDatabase();
        const postListRef = ref(db, 'posts/');
        onValue(postListRef, (snapshot) => {
            setPosts([]);
            snapshot.forEach((childSnapshot) => {
                const data = { id: childSnapshot.key, ...childSnapshot.val() };
                setPosts((posts) => [...posts, data]);
            });
        });
    }, []);
    return (
        <View className="w-full h-full bg-slate-200">
            <View className="w-full h-1/6 items-center">
                <View className="w-5/6 h-1/4  items-center justify-center">
                    <Text className="text-base font-bold">
                        Chào mừng {route.params.email}
                    </Text>
                </View>
                <View className="w-5/6 h-2/5 flex-row items-center">
                    <Image
                        source={require('../assets/avt.png')}
                        className="w-9 h-9 object-contain rounded-full"
                    />
                    <TextInput
                        onChangeText={setText}
                        placeholder="Bạn đang nghĩ gì?"
                        className="border-solid border border-slate-300 w-8/12 ml-1 pl-2 text-base rounded-xl"
                        value={text}
                    />
                    <PickImage />
                </View>
                <TouchableOpacity
                    className="flex-1 w-5/6 mt-1 justify-center items-center rounded-full bg-main-color"
                    onPress={createPost}
                >
                    <Text className="text-xl font-bold tracking-widest text-white">
                        Đăng
                    </Text>
                </TouchableOpacity>
            </View>
            <View className="w-full h-4/6 mt-1 shadow-inner">
                <ScrollView className="w-full px-2">
                    {posts.map((item, index) => {
                        return (
                            <View
                                key={index}
                                className="p-2 last:pb-52 mt-2 bg-white rounded-lg shadow-sm w-full"
                            >
                                <Text className="text-xs mb-2">
                                    {item.email} đã đăng
                                </Text>
                                <Text className="text-xl">{item.text}</Text>
                                {item.image && (
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{ width: 200, height: 200 }}
                                    />
                                )}
                                <View className="w-4/6 mt-2 self-center">
                                    <TouchableOpacity
                                        onPress={() => editPost(item)}
                                        className="w-full h-10 mb-2 rounded-2xl justify-center items-center bg-pink-300"
                                    >
                                        <Text className="text-base font-bold">
                                            Sửa bài viết
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="w-full h-10 rounded-2xl justify-center items-center bg-red-600"
                                        onPress={() => {
                                            deletePost(item);
                                        }}
                                    >
                                        <Text className="text-base font-bold text-white">
                                            Xóa bài viết
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
            <View className="w-full flex-1 border-t-4 border-main-color items-center justify-center">
                <TouchableOpacity
                    className="w-5/6 h-2/6 items-center justify-center rounded-3xl bg-fuchsia-400"
                    onPress={handleSignout}
                >
                    <Text className="text-base font-bold tracking-widest">
                        Đăng xuất
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default Blog;
