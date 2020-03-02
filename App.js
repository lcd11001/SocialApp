import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'

import * as firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: 'AIzaSyCS9b-ds_k_PVmfbPIN4Ogb6GAHNaQ-w0M',
    authDomain: 'reactnative-firebase-5d0f5.firebaseapp.com',
    databaseURL: 'https://reactnative-firebase-5d0f5.firebaseio.com',
    projectId: 'reactnative-firebase-5d0f5',
    storageBucket: 'reactnative-firebase-5d0f5.appspot.com',
    messagingSenderId: '849516217141',
    appId: '1:849516217141:web:574cfe21682b53a70f827c'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const AppStack = createStackNavigator({
    Home: HomeScreen
})

const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen
})

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading: LoadingScreen,
            App: AppStack,
            Auth: AuthStack
        },
        {
            initialRouteName: 'Loading'
        }
    )
)
