import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    LayoutAnimation
} from 'react-native'
import * as firebase from 'firebase'

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            displayName: ''
        }
    }

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser
        this.setState({ email, displayName })
    }

    handleSignOut = () => {
        firebase.auth().signOut()
    }

    render() {
        LayoutAnimation.easeInEaseOut()

        return (
            <View style={styles.container}>
                <Text>
                    Hi{' '}
                    {this.state.displayName && this.state.displayName.length > 0
                        ? this.state.displayName
                        : this.state.email}
                    !
                </Text>

                <TouchableOpacity
                    style={styles.buttonLogout}
                    onPress={this.handleSignOut}
                >
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonLogout: {
        marginTop: 32
    }
})
