import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native';
import Swipeout from 'react-native-swipeout';
import * as firebase from 'firebase';

export default class ProfileItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRowKey: null
        }
    }

    render() {
        const { item } = this.props;
        const userId = firebase.auth().currentUser.uid;
        const heightStyle = {
            height: (Dimensions.get('window').width - 20) * (item.height / item.width)
        };
        const swipSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if (this.state.activeRowKey != null) {
                    this.setState({activeRowKey: null});
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({activeRowKey: item.key});
            },
            right: [
                {
                    onPress: () => {
                        Alert.alert (
                            'Alert',
                            'Are you sure you want to delete?',
                            [
                                {text: 'No', onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel'
                                },
                                {text: 'Yes', onPress: () => {
                                    firebase.database().ref('/images/' + userId).child(item._id).set(null);
                                }},
                            ]
                        )
                    },
                    text: 'Delete',
                    type: 'delete',
                    style: {backgroundColor: 'red', color: 'white'}
                },
            ],
            rowId: this.props.index,
            sectionId: 1
        };
        if (item.type && item.type === 'button') {
            return (
                <TouchableOpacity
                    style={styles.addImageButtonContainer}
                    onPress={this.props.onPickImage}
                >
                    <Text style={styles.addImageButtonText}>Add Image</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <Swipeout {...swipSettings} style={styles.image}>
                    <Image
                        style={[styles.image, heightStyle]}
                        source={{uri: item.uri}}
                    />
                </Swipeout>
            );
        }
    }
}

const styles = StyleSheet.create({
    addImageButtonContainer: {
        backgroundColor: '#29393d',
        paddingVertical: 10,
        marginLeft: 45,
        marginRight: 45,
        marginTop: 30,
        marginBottom: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addImageButtonText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 18
    },
    image: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#3c5459'
    }
});
