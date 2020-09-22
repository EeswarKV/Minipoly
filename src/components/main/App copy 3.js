import React, { useState } from 'react';
import { StyleSheet, Image, SafeAreaView, View, StatusBar, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { useAuth } from '../../../AuthProvider.js';
import { LoginScreen } from '../login-screen/loginScreen.js';
import { AuthProvider } from '../../../AuthProvider.js';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import { HomeScreen } from '../home-screen/homeScreen.js';
import { WishScreen } from '../wish-screen/wishScreen.js';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Header } from '../header/header.js';
import { Notifications } from '../notifications/notifications.js';


export const App = () => {
    return (
        <AuthProvider>
            <AppBody />
        </AuthProvider>
    );
};

export const Navigator = () => {
    return (
        <NavigatorBody />
    );
};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function NotificationsScreen({ navigation }) {
    return (
        <Stack.Navigator >
            <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    headerLeft: (props) => (
                        <Icon
                            name="md-menu"
                            size={38}
                            color="black"
                            onPress={() => navigation.toggleDrawer()}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

function HomeStackScreen({ navigation }) {
    const { userName } = useAuth();

    const getDisplayName = (userNam) => {
        console.log("username", userNam)
        return `Hello ${userNam}`;
    }
    return (
        <Stack.Navigator>
            <Stack.Screen
                // name={getDisplayName(userName)} todo
                name="Home"
                component={HomeScreen}
                options={{
                    headerLeft: (props) => (
                        <Icon
                            name="md-menu"
                            size={38}
                            color="white"
                            onPress={() => navigation.toggleDrawer()}
                        />
                    ),
                    headerStyle: {
                        backgroundColor: '#ff6600',
                    },
                    headerHeight: 40,
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="WishScreen"
                component={WishScreen}
                options={{ tabBarLabel: 'WishScreen!' }}
            />
            {/* <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
                options={{ tabBarLabel: 'LoginScreen!' }}
            /> */}
        </Stack.Navigator>
    );
}

const slides = [
    {
        key: 1,
        title: 'Title 1',
        text: 'Welcome',
        backgroundColor: '#59b2ab',
        image: require('./assets/5.jpg'),
    },
    {
        key: 2,
        title: 'Title 2',
        text: 'Other cool stuff',
        image: require('./assets/2.jpg'),
        backgroundColor: 'blue',
    },
    {
        key: 3,
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: require('./assets/3.jpg'),
        backgroundColor: 'yellow',
    }
];


function NavigatorBody({ navigation }) {
    const { userName, logOut } = useAuth();

    // if (userName) { todo
        if (true) {
        return (
            <>
                <NavigationContainer>
                    <Drawer.Navigator
                        initialRouteName="LoginScreen"
                        drawerStyle={{
                        backgroundColor: '#ff6600',
                            width: 240,
                        }}
                        labelStyle = {{ fontWeight: 'normal', fontSize: 20 }}
                        drawerContentOptions={{
                            activeTintColor: '#ffffff',
                            inactiveTintColor: '#ffffff',
                            // itemStyle: { marginVertical: 30 },
                          }}
                        
                        drawerContent={props => {
                            return (
                                <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <SafeAreaView style={styles.drawerContainer} forceInset={{ top: 'always', horizontal: 'never' }}>
                                    <DrawerItemList {...props} />
                                        <DrawerItem label={() =>
                                        <TouchableOpacity style={{ bottom: 0, width: '100%' }}>
                                            <Text style={{ color: '#ff6600', fontSize: 15 }}>Logout</Text>
                                        </TouchableOpacity>} style={{ backgroundColor: '#ffffff' }} onPress={logOut} />
                                        </SafeAreaView>
                                </DrawerContentScrollView>
                            )
                        }}
                    >
                        <Drawer.Screen name="Home" component={HomeStackScreen} />
                        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
                    </Drawer.Navigator>
                </NavigationContainer>

            </>
        )
    } return <></>
}

function AppBody() {

    const { user, userName, logOut } = useAuth();
    const [showRealApp, setRealApp] = useState(false);

    _renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
                <Image style={styles.introImage} source={item.image} />
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    }

    _onDone = () => {
        setRealApp(true);
    }

    _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name="md-arrow-forward"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                />
            </View>
        );
    };
    _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name="md-checkmark"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                />
            </View>
        );
    };

    if (showRealApp) {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <ImageBackground source={require('./assets/bg-image.jpg')} style={styles.backgroundImage}>
                <View style={styles.container}>

                    {/* {user == null ? (<LoginScreen />) : ( todo */}
                    {false ? (<LoginScreen />) : (
                        <>
                            <NavigatorBody />
                        </>
                    )}

                    </View>
                </ImageBackground>
            </>
        );
    } else {
        return <AppIntroSlider
            data={slides}
            renderItem={this._renderItem}
            onDone={this._onDone}
            renderDoneButton={this._renderDoneButton}
            renderNextButton={this._renderNextButton}
        />
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'green',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    image: {
        width: 320,
        height: 320,
        marginVertical: 32,
    },
    text: {
        color: 'black',
        position: 'absolute',
        fontSize: 30,
        fontStyle: "italic",
        marginLeft: 100
    },
    backgroundImage: {
        width: '100%', height: '100%'
    },

    drawerContainer: {
        flex:1
    }
});

export default App;