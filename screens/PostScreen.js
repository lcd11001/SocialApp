import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import RequestPermission from '../utils/RequestPermissions'
import Fire from '../utils/Fire'

export default class PostScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            text: '',
            image: null
        }
    }

    componentDidMount() {
        RequestPermission.shared.getPhotoPermission()
    }

    handlePost = () => {
        Fire.shared
            .addPost({
                text: this.state.text.trim(),
                localUri: this.state.image
            })
            .then(ref => {
                this.setState({
                    text: '',
                    image: null
                })

                this.props.navigation.goBack()
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Ionicons
                            name="md-arrow-back"
                            size={24}
                            color="#D8D9DB"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handlePost}>
                        <Text style={{ fontWeight: '500' }}>Post</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Image
                        source={require('../assets/avatar.png')}
                        style={styles.avatar}
                    ></Image>
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={styles.input}
                        placeholder="Want to share something?"
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                    ></TextInput>
                </View>

                <TouchableOpacity
                    style={styles.photo}
                    onPress={() => {
                        RequestPermission.shared.pickImage().then(uri => {
                            if (uri != null) {
                                this.setState({
                                    image: uri
                                })
                            }
                        })
                    }}
                >
                    <Ionicons name="md-camera" size={32} color="#D8D9DB" />
                </TouchableOpacity>

                <View style={styles.photoContainer}>
                    <Image
                        source={{ uri: this.state.image }}
                        style={styles.photoPreview}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D9DB'
    },
    inputContainer: {
        margin: 32,
        flexDirection: 'row'
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16
        // borderColor: 'black',
        // borderWidth: 1
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#D8D9DB',
        borderRadius: 10,
        padding: 5
    },

    photo: {
        alignItems: 'flex-end',
        marginHorizontal: 32
    },
    photoContainer: {
        marginHorizontal: 32,
        marginTop: 32,
        height: 150
    },
    photoPreview: {
        width: '100%',
        height: '100%'
    }
})
