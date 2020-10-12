import {Image, View, Text, StyleSheet, KeyboardAvoidingView, Button} from "react-native-web";
import * as React from "react";


export default class StartScreen extends React.Component {

    static navigationOptions = {
        title: 'StartPage'
    }

    handleGoToSignUp = () => {
        //Når en komponent bliver mounted via navigation, får den en prop ved navn "navigation"
        this.props.navigation.navigate('SignUp');
    };

    handleGoToLogin = () => {
        //Når en komponent bliver mounted via navigation, får den en prop ved navn "navigation"
        this.props.navigation.navigate('Login');
    };

    render(){
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.container}>
                <Text style ={styles.welcometitle}>Welcome to PETPAL</Text>
                <View style={styles.logoContainer}>
                    <Image style ={styles.logo}
                           source={require('../../../Opgave 2 - Programmerings opgave/Softwareprogram/assets/pets.jpg')}/>
                    <Text style={styles.buttontitle}>Welcome. Here you can sign up or login</Text>
                </View>
                <View style={styles.formContainer}>
                    <Button style={styles.buttonContainer}
                            title="Go to Sign Up"
                            onPress={this.handleGoToSignUp}/>

                    <Button style={styles.buttonContainer}
                              title="Go to Login"
                            onPress={this.handleGoToLogin}/>
                </View>
            </View>
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '##2980b9',
        alignItems: 'center',
        justifyContent: 'center',

    },

    welcometitle:{
        justifyContent: 'center',
        fontWeight: 'bold',
        fontsize: 35,
    },

    logo: {
        width: 300,
        height: 300,
        opacity: 0.9,

    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',


    },

    buttontitle:{
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontsize: 16
    },

    formContainer:{
        alignContent: 'center',
        alignItems: 'center',


    },
    buttonContainer: {
        marginTop: 10,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        width: 400,

        backgroundColor: '##2980b9',


    },


});