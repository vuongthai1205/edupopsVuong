import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import Register from './components/Register';
import Blog from './components/Blog';
import { Text } from 'react-native';

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Đăng nhập"
                    component={Login}
                />
                <Stack.Screen
                    name="Đăng ký"
                    component={Register}
                />
                <Stack.Screen
                    name="Trang chủ"
                    component={Blog}
                    options={{
                        headerLeft: () => <Text></Text>,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
