import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase'
import Icon from 'react-native-vector-icons/Ionicons';

export default class LogoutButton extends Component {
    _logoutUser = () => {
        console.log(this.props);
        const { navigate } = this.props.navigation;
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            navigate('Login')
        }, function(error) {
            // An error happened.
        });
    };

    render() {
        return (
            <TouchableOpacity onPress={this._logoutUser}>
                <Icon
                    style={styles.logout}
                    name="ios-exit-outline"
                    size={30}
                    color="#A6ACAF" />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    logout: {
        marginRight: 10
    }
});
