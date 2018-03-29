import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, KeyboardAvoidingView, StatusBar, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import Login from './Login';


export default class Signup  extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    // Sign Up
    signupUser = (email, password) => {
        try {
            if (this.state.password.length < 6) {
                alert('Password must be greater than 6 characters')
                return;
            }
            firebase.auth().createUserWithEmailAndPassword(email, password)
        } catch(error) {
            console.log(error.toString())
        }
}

render() {
        return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View>
                <Image
                    style={styles.logo}
                    source={require('../resources/images/ohmlogo2.png')}
                    resizeMode="contain"
                />
            <Text style={styles.title}>Healthcare for the modern nomade</Text>
                <TextInput
                placeholder="email"
                onChangeText={ (email) => this.setState({ email }) }
                placeholderTextColor='rgba(255,255,255,0.2)'
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitatlize="none"
                autoCorrect={false}
                style={styles.input}
                />
                <TextInput
                placeholder="password"
                onChangeText={ (password) => this.setState({ password }) }
                placeholderTextColor='rgba(255,255,255,0.2)'
                secureTextEntry
                returnKeyType="go"
                style={styles.input}
                ref={(input) => this.passwordInput = input}
                />
            <TouchableOpacity style={styles.signupButtonContainer}
                onPress={() => this.signupUser(this.state.email, this.state.password)}>
                <Text style={styles.signupButtonText}>Signup</Text>
            </TouchableOpacity>

            <View style={styles.loginTextCont}>
                <Text>Already have an account yet?</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Login')}
                >
                    <Text style={styles.loginTextButton}>Login</Text>
                </TouchableOpacity>
            </View>
            </View>
        </KeyboardAvoidingView>
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

    logo: {
        width: 300
      },

      title: {
        color: '#D1D1D1',
        marginVertical: 10,
        textAlign: 'center',
        opacity: 0.9,
        fontSize: 15,
      },

      input: {
        height: 35,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: '#fff',
        paddingHorizontal: 5,
        textAlign: 'center',
        width: 250,
        borderRadius: 25,
        fontSize: 16,
        alignItems: 'center',
        marginLeft: 25

    },



    signupButtonContainer: {
        backgroundColor: '#29393d',
        paddingVertical: 10,
        marginTop: 10,
        borderRadius: 25,
        width: 200,
        marginLeft: 50,
        alignItems: 'center'

    },

    signupButtonText: {
        color: '#ffff',
        fontWeight: '700',
        fontSize: 14,

    },

    loginTextCont: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: 10,
        marginVertical: 30,
        marginRight: 40,

    },

    loginTextButton: {
        color: '#D1D1D1',
        marginVertical: 10,
        textAlign: 'center',
        opacity: 0.9,
        fontSize: 15,
        fontWeight: '700'

    },
});
