import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    SafeAreaView,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import { HomeScreen } from '../home-screen/homeScreen.js';
import { WishScreen } from '../wish-screen/wishScreen.js';
import {useAuth} from '../../../AuthProvider.js';


const Stack = createStackNavigator();
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

export const App = () => {
    const { user, logOut } = useAuth();
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
                     <AuthProvider>
                        <SafeAreaView>
                            <View>
                                <NavigationContainer>
                                <Stack.Navigator>
                                <Stack.Screen name="Home" component={HomeScreen} />
                                <Stack.Screen name="WishScreen" component={WishScreen} />
                                </Stack.Navigator>
                                 </NavigationContainer>
                             </View>
                        </SafeAreaView>
                    </AuthProvider>

                </>)
        } else {
            return <AppIntroSlider
                data={slides}
                renderItem={this._renderItem}
                onDone={this._onDone}
                renderDoneButton={this._renderDoneButton}
                renderNextButton={this._renderNextButton}
            />;
        }

};


const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
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
