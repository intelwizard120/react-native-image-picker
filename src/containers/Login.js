import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, Text, KeyboardAvoidingView, StatusBar, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation'
import Profile from './Profile'
import Signup from './Signup'
import * as firebase from 'firebase'
import firebaseConfig from '../config/config';

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default class Login  extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    // LOGIN Function
    login = (email, password) => {
        // this.props.navigation.navigate('Profile');
        if (email == '' || password == '') {
            return;
        }

        try {
            firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
                this.props.navigation.navigate('Profile');
            })
        }
        catch(error){
            console.log(error.toString());
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Image
                    style={styles.logo}
                    resizeMode="contain"
                    source={require('../resources/images/ohmlogo2.png')}
                />
                <Text style={styles.title}>Healthcare for the modern nomade</Text>
                <View type="Login">
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
                    ref={ (input) => this.passwordInput = input }
                        />
                    <TouchableOpacity
                        style={styles.loginbuttonContainer}
                        onPress={ () => this.login(this.state.email, this.state.password) }>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>

                    <View style={styles.signupTextCont}>
                        <Text >Don't have an account yet?</Text>
                        <TouchableOpacity
                            title="Go to Signup"
                            onPress={() => this.props.navigation.navigate('Signup')}><Text style={styles.signupButtonText}>Signup</Text></TouchableOpacity>
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
        width: 300,
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
        marginLeft: 10
    },

    loginbuttonContainer: {
        backgroundColor: '#29393d',
        paddingVertical: 10,
        marginTop: 10,
        borderRadius: 25,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
    },

    loginButtonText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 14
    },

    signupTextCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        marginVertical: 30,
       },

    signupButtonText: {
        color: '#D1D1D1',
        marginVertical: 10,
        textAlign: 'center',
        opacity: 0.9,
        fontSize: 15,
        fontWeight: '700'
        },
});
