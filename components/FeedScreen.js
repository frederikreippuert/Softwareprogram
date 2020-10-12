import * as React from "react";
import { View, Text, Button } from 'react-native';
import * as firebase from "firebase";
import {StyleSheet} from "react-native-web";

export default class FeedScreen extends React.Component {
    componentDidMount = () => {
        const { user } = firebase.auth();
        this.setState({ user });
    };

    handleLogOut = async () => {
        await firebase.auth().signOut();
    };

    render() {
        const { user } = this.props;
        // Hvis der ikke er en bruger logget ind, vises der ingenting
        if (!user) {
            return null;
        }

        return (
            <View style={styles.container}>
                <Text>Current user: {user.email}</Text>

                        <Text>Her skal feedet til pet portalen være. Her skal man kunne sætte kæledyr til salg og se hvilke der er til salg</Text>
                <Button styles ={styles.buttonContainer}
                        onPress={this.handleLogOut} title="Log out"/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonContainer:{

    }
})