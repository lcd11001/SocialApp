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

export default class PostScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Ionicons
                            name="md-arrow-back"
                            size={24}
                            color="#D8D9DB"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
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
                        styles={styles.input}
                        placeholder="Want to share something?"
                    ></TextInput>
                </View>

                <TouchableOpacity style={styles.photo}>
                    <Ionicons name="md-camera" size={32} color="#D8D9DB" />
                </TouchableOpacity>
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
        flex: 1
    },
    photo: {
        alignItems: 'flex-end',
        marginHorizontal: 32
    }
})
