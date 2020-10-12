import 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native';
import StartScreen from "./components/StartScreen";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from "react-navigation-tabs";
import * as firebase from "firebase";
import FeedScreen from "./components/FeedScreen";
import * as React from "react";


const StackNavigator = createStackNavigator(
    {
        StartScreen: { screen: StartScreen },
        SignUp: { screen: SignUpForm },
        Login:{screen: LoginForm}
    },
    { initialRouteKey: 'StartScreen' }
);

const TabNavigator = createBottomTabNavigator({
    StartScreen:{
        screen: StackNavigator,
        tabBarLabel: "Start",

    },
    },
)
const AppContainer = createAppContainer (TabNavigator);

export default class App extends React.Component {
    state = {user:null}

    componentWillMount() {
        // web app's Firebase configuration
        const fireBaseConfig = {
            apiKey: "AIzaSyADHWvoWCW_7oF82o7r4rbJRG3EYv0hEwQ",
            authDomain: "petapp-fde09.firebaseapp.com",
            databaseURL: "https://petapp-fde09.firebaseio.com",
            projectId: "petapp-fde09",
            storageBucket: "petapp-fde09.appspot.com",
            messagingSenderId: "124160068330",
            appId: "1:124160068330:web:02dea0bb244dbe4a0de593"
        }
// Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(fireBaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            this.setState({user});
        });
    }



    render() {
        const {user} = this.state

        if(!user){
            return (
                <View style={styles.container}>
                    <AppContainer/>
                </View>
            )
        } else {
            return (

                <FeedScreen user={user}/>
            )
        }


    }
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },

});
