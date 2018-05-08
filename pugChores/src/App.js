import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = {
        loggedIn: null
    }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyCL_rs84W4bUfuEx0weQZBvI1zaveZQxh0",
            authDomain: "pug-life-55e2e.firebaseapp.com",
            databaseURL: "https://pug-life-55e2e.firebaseio.com",
            projectId: "pug-life-55e2e",
            storageBucket: "pug-life-55e2e.appspot.com",
            messagingSenderId: "1094166238065"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true});
            } else {
                this.setState({ loggedIn: false});
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <View style={styles.viewStyle}>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </View>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />;
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

const styles = {
    viewStyle: {
        marginTop: 10,
        flexDirection: 'row'
    }
}

export default App;