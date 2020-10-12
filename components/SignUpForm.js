import {View, Text, StyleSheet, TextInput, Button, ActivityIndicator} from "react-native-web";
import * as React from "react";
import * as firebase from "firebase";


export default class SignUpForm extends React.Component{
    state = {
        email: '',
        password: '',
        isLoading: false,
        isCompleted: false,
        errorMessage: null,
    };
    //funktioner der sætter states til en default value
    startLoading = () => this.setState({ isLoading: true });
    endLoading = () => this.setState({ isLoading: false });
    setError = errorMessage => this.setState({ errorMessage });
    clearError = () => this.setState({ errorMessage: null });

    //funktion der gør at man kan sætte email og password
    handleChangeEmail = email => this.setState({ email });
    handleChangePassword = password => this.setState({ password });

    //funktion der laver asykront kald til db og submitter
    handleSubmit = async () => {
        const {email, password} = this.state;
        try {
            this.startLoading();
            this.clearError();
            const result = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
            console.log(result);
            this.endLoading();
            this.setState({ isCompleted: true });
        } catch (error) {
            // Vi sender `message` feltet fra den error der modtages, videre.
            this.setError(error.message);
            this.endLoading();
        }
    };
    render = () =>{
        const { errorMessage, email, password, isCompleted } = this.state;
        if (isCompleted) {
            return <Text>You are now signed up</Text>;
        }
        return (
            <View style={styles.container}>
                <Text style={styles.welcometitle}>Sign up here to continue your way towards getting a new pet!</Text>
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
        );
    };
    renderButton = () => {
        const { isLoading } = this.state;
        if (isLoading) {
            return <ActivityIndicator/>;
        }
        return <Button onPress={this.handleSubmit} title="Sign up"/>;
    };
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#ecf0f1'
    },
    error: {
        color: 'red',
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
});
