import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native'
import * as firebase from 'firebase'

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorMessage: null
        }
    }

    handleLogin = () => {
        const { email, password } = this.state

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
                this.setState({
                    errorMessage: error.message
                })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.gretting}>
                    {`Hello again\nWelcome back`}
                </Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && (
                        <Text style={styles.error}>
                            {this.state.errorMessage}
                        </Text>
                    )}
                </View>

                <View style={styles.form}>
                    <View>
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
                    onPress={this.handleLogin}
                >
                    <Text style={styles.buttonTextMain}>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSecondary}>
                    <Text style={styles.buttonTextThird}>
                        New to Social App?{' '}
                        <Text style={styles.buttonTextSecondary}>Sign up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gretting: {
        marginTop: 32,
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
        marginTop: 32
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
    }
})
