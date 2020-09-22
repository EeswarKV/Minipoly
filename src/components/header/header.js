import React from 'react';
import {Text, Button} from 'react-native';


export const Header = ({ navigation }) => { 
    return (
        <>
            <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
            <Text>Hello</Text>
        </>
    )
}