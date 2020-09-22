import React, { useState } from 'react';
import {StyleSheet, Image, SafeAreaView, View, StatusBar, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {useAuth} from '../../../AuthProvider.js';
import {LoginScreen} from '../login-screen/loginScreen.js';
import {AuthProvider} from '../../../AuthProvider.js';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import { HomeScreen } from '../home-screen/homeScreen.js';
import { WishScreen } from '../wish-screen/wishScreen.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigator, DrawerNavigator } from 'react-navigation'


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
  
const DrawerStack = DrawerNavigator({
    Home: { screen: Home },
    WishScreen: { screen: WishScreen }
})
  

const Drawer = createDrawerNavigator();
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


function NavigatorBody() {
    const { userName } = useAuth();
    // if (userName) { todo

    if (true) {
        return (
            <>
                <NavigationContainer>
                    <Drawer.Navigator initialRouteName="Home" backBehavior>
                        <Drawer.Screen name="Home" component={HomeScreen} initialParams={{ userName }} />
                        <Drawer.Screen name="WishScreen" component={WishScreen} />
                    </Drawer.Navigator>
                </NavigationContainer>
            </>
        )
    }return <></>
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
                <View style={styles.container}>
                {/* {user == null ? ( todo*/}
                    {false ? (
                        <LoginScreen />
                    ) : (
                            <>
                            <NavigatorBody />
                                <Button onPress={logOut} title="Log Out" />
                                </>
                            )}
                    </View>
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
        justifyContent: 'center'
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
    }
});

export default App;