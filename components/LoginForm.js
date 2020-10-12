import {View, Text, StyleSheet, TextInput, Button, ActivityIndicator} from "react-native-web";
import {StatusBar} from "expo-status-bar";
import * as firebase from "firebase";
import * as React from "react";



export default class LoginForm extends React.Component{
    state = {
        email: '',
        password: '',
        isLoading: false,
        isCompleted: false,
        errorMessage: null,
    };

    startLoading = () => this.setState({ isLoading: true });
    endLoading = () => this.setState({ isLoading: false });
    setError = errorMessage => this.setState({ errorMessage });
    clearError = () => this.setState({ errorMessage: null });

    handleChangeEmail = email => this.setState({ email });
    handleChangePassword = password => this.setState({ password });

    handleSubmit = async () => {
        const { email, password } = this.state;
        try {
            this.startLoading();
            this.clearError();
            const result = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log(result);
            this.endLoading();
            this.setState({ isCompleted: true });
        } catch (error) {
            this.setError(error.message);
            this.endLoading();
        }
    };

    render(){
        const { errorMessage, email, password, isCompleted } = this.state;
        if (isCompleted) {
            return <Text>You are now logged in</Text>;
        }
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <Text>Login - Ready to look at all the cute pets?</Text>
               <TextInput placeholder ="Email"
                           value={email}
                           onChangeText={this.handleChangeEmail}
                           placeholderTextColor ="#ecf0f1"
                           returnKeyType= "next"
                           onSubmitEditing={()=> this.passwordInput.focus()}
                           keyboardType="email-address"
                           style={styles.input}/>
                <TextInput placeholder ="Password"
                           value={password}
                           onChangeText={this.handleChangePassword}
                           placeholderTextColor ="#ecf0f1"
                           returnKeyType= "go"
                           secureTextEntry
                           ref={(input)=> this.passwordInput = input}
                           style={styles.input}/>
                {errorMessage && (
                    <Text style={styles.error}>Error: {errorMessage}</Text>
                )}

                {this.renderButton()}

            </View>
        )
    }
    renderButton = () => {
        const { isLoading } = this.state;
        if (isLoading) {
            return <ActivityIndicator />;
        }
        return <Button onPress={this.handleSubmit} title="Login" />;
    };
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#ecf0f1'
    },
    input: {
        height: 40,
        backgroundColor: '#16a085',
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    buttonContainer:{

    }
})