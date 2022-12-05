import React, { useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import appFirebase from '../configFirebase';
const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const auth = getAuth(appFirebase);
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                navigation.navigate('Trang chủ', {
                    id: user.uid,
                    email: user.email,
                });
            })
            .then(() => {
                setEmail('');
                setPassword('');
            })
            .catch((error) => {
                const errorCode = error.code;
                alert(errorCode);
            });
    };
    return (
        <View className="w-full h-full">
            <View className="w-full h-1/3 justify-center items-center bg-main-color">
                <Text className="text-2xl font-bold text-white">
                    Edupops x Vương
                </Text>
            </View>
            <View className="flex-1 bg-white">
                <View className="w-full h-2/3 items-center p-2">
                    <View className="w-5/6 h-10 border border-neutral-400 rounded-md justify-center  items-center ">
                        <TextInput
                            className="w-full text-base ml-2"
                            placeholder="Nhập Email..."
                            onChangeText={setEmail}
                            value={email}
                        />
                    </View>
                    <View className="w-5/6 h-10 border border-neutral-400 rounded-md justify-center items-center mt-2">
                        <TextInput
                            className="w-full text-base ml-2"
                            onChangeText={setPassword}
                            placeholder="Nhập mật khẩu"
                            secureTextEntry={true}
                            value={password}
                        />
                    </View>
                    <TouchableOpacity
                        className="w-5/6 h-10 justify-center items-center mt-4 bg-main-color rounded-md"
                        onPress={handleLogin}
                    >
                        <Text className="text-base font-bold text-white">
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="w-full h-1/3 items-center">
                    <View className="w-3/5 h-px bg-slate-700"></View>
                    <TouchableOpacity
                        className="w-5/6 h-10 justify-center items-center mt-4 bg-fuchsia-200 rounded-md"
                        onPress={() => {
                            navigation.navigate('Đăng ký');
                        }}
                    >
                        <Text className="text-base font-bold text-main-color">
                            Tạo tài khoản mới
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Login;
