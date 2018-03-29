import React from 'react';
import { View, Button, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

export default class Landing extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../resources/images/ohmlogo2.png')}
                resizeMode="contain"
            />
            <TouchableOpacity
                style={styles.ButtonContainer}
                raised
                title="Login"
                onPress={() => this.props.navigation.navigate("Login")}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.ButtonContainer}
                raised
                title="Signup"
                onPress={() => this.props.navigation.navigate("Signup")}
            >
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexGrow: 1,
        backgroundColor: '#3c5459',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonContainer: {
        backgroundColor: '#29393d',
        paddingVertical: 10,
        marginTop: 10,
        borderRadius: 25,
        width: 200,
        alignItems: 'center'
    },
    logo: {
        width: 300
    },
    buttonText: {
        color: '#ffff',
        fontWeight: '700'
    }
});
