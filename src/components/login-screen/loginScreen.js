import React, { useState } from 'react';
import { Button, Text, Input } from 'react-native-elements';
import { useAuth } from '../../../AuthProvider.js';
import { StyleSheet, View, Image } from 'react-native';

// This view has an input for email and password and logs in the user when the
// login button is pressed.
export function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const [userName, setUserName] = useState('');


    const { logIn, registerUser } = useAuth();

    const [authMode, setAuthMode] = useState('Login');

    return (
        <>
            <View style={styles.container}>
            <Text h3 style={styles.textHeader}>{authMode}</Text>
            <Input
                autoCapitalize="none"
                placeholder="User Name"
                value={userName}
                onChangeText={(value) => setUserName(value)}
            />
            <Input
                autoCapitalize="none"
                placeholder="email"
                onChangeText={setEmail}
            />
            <Input
                secureTextEntry={true}
                placeholder="password"
                onChangeText={setPassword}
            />
            <Button
                onPress={async () => {
                    console.log(`${authMode} button pressed with email ${email}`);
                    setError(null);
                    try {
                        if (authMode === 'Login') {

                            await logIn(email, password, userName);

                        } else {

                            await registerUser(email, password);

                            setAuthMode('Login');
                        }
                    } catch (e) {
                        setError(`Operation failed: ${e.message}`);
                    }
                }}
                title={authMode}
            />
            <Text>{error}</Text>
                <ToggleAuthModeComponent setAuthMode={setAuthMode} authMode={authMode} />
                </View>
        </>
    );
}

const ToggleAuthModeComponent = ({ authMode, setAuthMode }) => {
    if (authMode === 'Login') {
        return (
            <Button
                style={styles.registerText}
                title="Haven't created an account yet? Register"
                type="outline"
                onPress={async () => {
                    setAuthMode('Register');
                }}
            />
        );
    } else {
        return (
            <Button
                style={styles.LoginText}
                title="Have an account already? Login"
                type="outline"
                onPress={async () => {
                    setAuthMode('Login');
                }}
            />
        );
    }
};

const styles = StyleSheet.create({
    textHeader: {
        color: '#ff6600',
        textAlign: 'center'
    },

    LoginText: {
        color: 'red',
        fontSize: 40,
    }
  });