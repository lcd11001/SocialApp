import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
    LayoutAnimation
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as firebase from 'firebase'
import { ScrollView } from 'react-native-gesture-handler'

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            errorMessage: null
        }
    }

    handleSignUp = () => {
        const { email, password, name } = this.state

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: name
                })
            })
            .catch(error => {
                this.setState({
                    errorMessage: error.message
                })
            })
    }

    render() {
        LayoutAnimation.easeInEaseOut()

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <View style={styles.header}>
                    <Image
                        source={require('../assets/authHeader.png')}
                        style={styles.imageHeader}
                    />

                    <View style={styles.hello}>
                        <Image
                            source={require('../assets/hi.png')}
                            style={styles.imageHello}
                        />
                        <Text style={styles.gretting}>
                            {`Hello!\nSign up to get started`}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.buttonBack}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Ionicons
                            name="ios-arrow-round-back"
                            size={32}
                            color="#FFF"
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.content}>
                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && (
                            <Text style={styles.error}>
                                {this.state.errorMessage}
                            </Text>
                        )}
                    </View>

                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>Full name</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                onChangeText={name => {
                                    this.setState({ name })
                                }}
                                value={this.state.name}
                            ></TextInput>
                        </View>

                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Email address</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                onChangeText={email => {
                                    this.setState({ email })
                                }}
                                value={this.state.email}
                            ></TextInput>
                        </View>

                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Password</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                autoCapitalize="none"
                                onChangeText={password => {
                                    this.setState({ password })
                                }}
                                value={this.state.password}
                            ></TextInput>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.buttonMain}
                        onPress={this.handleSignUp}
                    >
                        <Text style={styles.buttonTextMain}>Sign up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonSecondary}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Text style={styles.buttonTextThird}>
                            New to Social App?{' '}
                            <Text style={styles.buttonTextSecondary}>
                                Login
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </ScrollView>

                <View style={styles.footer}>
                    <Image
                        source={require('../assets/authHeader.png')}
                        style={styles.imageFooter}
                    />
                </View>
            </View>
        )
    }
}

RegisterScreen.navigationOptions = {
    headerShown: false
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gretting: {
        marginTop: 0,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    error: {
        color: '#E9446A',
        fontWeight: '600',
        fontSize: 13,
        textAlign: 'center'
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        fontSize: 10,
        textTransform: 'uppercase',
        color: '#8A8F9E'
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        color: '#161F3D',
        height: 40,
        fontSize: 15
    },

    buttonMain: {
        marginHorizontal: 30,
        backgroundColor: '#E9446A',
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        borderRadius: 4
    },
    buttonSecondary: {
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 32
    },
    buttonBack: {
        position: 'absolute',
        left: 16,
        top: 16,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(21, 22, 48, 0.2)',
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonTextMain: {
        color: '#FFF',
        fontWeight: '500'
    },
    buttonTextSecondary: {
        color: '#E9446A',
        fontWeight: '500'
    },
    buttonTextThird: {
        color: '#414959',
        fontSize: 13
    },

    imageHeader: {
        // backgroundColor: 'rgba(255, 0, 0, 0.5)',
        width: '100%',
        height: 'calc(50% + 40px)',
        marginTop: -40,
        resizeMode: 'cover'
    },

    imageFooter: {
        width: '100%',
        height: 'calc(100% + 60px)',
        bottom: -40,
        resizeMode: 'cover',
        transform: [
            {
                rotate: '180deg'
            }
        ]
    },
    imageHello: {
        width: 50,
        height: 50,
        marginRight: 20
    },

    footer: {
        flex: 0.1,
        // backgroundColor: 'rgba(0, 255, 0, 0.5)',
        justifyContent: 'flex-end'
    },

    header: {
        flex: 0.3,
        // backgroundColor: 'rgba(255, 0, 0, 0.5)',
        justifyContent: 'flex-start',
        overflow: 'hidden'
    },

    content: {
        flex: 0.6
        // backgroundColor: 'rgba(0, 0, 255, 0.5)'
    },

    hello: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
