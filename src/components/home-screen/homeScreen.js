import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    StatusBar, Button, TextInput
} from 'react-native';
// import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';
import { Tile, Card } from 'react-native-elements';



import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import 'react-native-gesture-handler';


export const HomeScreen = ({ navigation, route, history }) => {
    const [name, setName] = useState('');
    
   
    return (
        <>
            <View style={styles.container}>
            <Card containerStyle={{borderRadius: 10}}>
  <Card.Title> Greetings </Card.Title>
  <Card.Divider/>
  <Card.Image source={require('../main/assets/bg-image.jpg')}>
    <Text style={{marginBottom: 10}}>
      The idea with React Native Elements is more about component structure than actual design.
    </Text>
    <Button
      icon={<Icon name='code' color='#ffffff' />}
      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='VIEW NOW' />
  </Card.Image>
</Card>
                {/* <Header /> */}
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                <View style={styles.body}>
                    {/* <Text>Hey {route.params.userName}!</Text> */}
                        <TextInput style={styles.input}
                            placeholder="Please enter your name"
                            placeholderTextColor="violet"
                            value={name}
                            onChangeText={(value) => setName(value)}
                        />
                        <Button
                            title="Wish me"
                            onPress={() => {
                            navigation.navigate('WishScreen', {"name" : name})
                            }
                            }
                        />
                    </View>
                </ScrollView>
                </View>
        </>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.red,
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
    input: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        color: '#333',
        fontSize: 20,
        padding: 10,
        margin: 50,
        borderRadius: 10,
    },

    wishTile: {
        borderRadius: 50,
    }
});
