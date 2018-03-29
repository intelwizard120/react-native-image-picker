import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Platform, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import * as firebase from 'firebase';

import firebaseConfig from '../config/config';
import LogoutButton from '../components/buttons/LogoutButton';
import ProfileItem from '../components/listItems/ProfileItem';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class Profile extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Profile',
        headerTintColor: '#A6ACAF',
        headerStyle: {backgroundColor: '#294145'},
        headerLeft: null,
        headerRight: <LogoutButton navigation={navigation} />
    });

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            images: []
        };

        const userId = firebase.auth().currentUser.uid;
        this.userImagesRef = firebase.database().ref('/images/' + userId);

        const that = this;
        this.userImagesRef.on('value', function(snapshot) {
            var images = [];

            snapshot.forEach(function(childSnapshot) {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                images.push({ key: childKey, ...childData });
            });

            that.setState({
                loading: false,
                images: images
            });
        });
    };

    _keyExtractor = (item, index) => item.key;

    uploadImage = (imageInfo, mime = 'image/jpeg') => {
        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? imageInfo.uri.replace('file://', '') : imageInfo.uri;
            const sessionId = new Date().getTime()
            let uploadBlob = null;
            let fileTempName = imageInfo.uri.split('/');
            console.log(fileTempName);
            const imageRef = firebase.storage().ref('images/' + fileTempName[fileTempName.length - 1]);
            fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` })
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                var newImageRef = this.userImagesRef.push();
                var imageId = newImageRef.key;
                newImageRef.set({
                    _id: imageId,
                    uri: url,
                    width: imageInfo.width,
                    height: imageInfo.height
                });
                resolve(url);
            })
            .catch((error) => {
                reject(error)
            })
      })
    }

    _pickImage = async () => {
        // More info on all the options is below in the README...just some common use cases shown here
        const options = {
          mediaType: 'photo'
        };

        ImagePicker.launchImageLibrary(options, imageInfo  => {
            if (imageInfo.didCancel) {
                console.log('User cancelled image picker');
            } else if (imageInfo.error) {
                console.log('ImagePicker Error: ', imageInfo.error);
            } else {
                this.setState({ loading: true });
                this.uploadImage(imageInfo)
                .then(url => this.setState({ uploadURL: url }))
                .catch(error => console.log(error))
            }
        })
    };
    _renderItem = ({item, index}) => (
        <ProfileItem
            item={item}
            index={index}
            onPickImage={this._pickImage}
        />
    )

    render() {
        const images = [...this.state.images, {
            key: 'buttonKey',
            type: 'button'
        }];

        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    data={images}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
                {this.state.loading &&
                    <View style={styles.loading}>
                      <ActivityIndicator
                          color = '#bc2b78'
                          size = "large"
                      />
                    </View>
                }
            </View>
        );
     }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3c5459'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        flex: 1,
        backgroundColor: '#3c5459'
    },
    button: {
        height: 50,
        padding: 5,
        backgroundColor: '#29393d'
    }
});
