import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class CreateProfile extends Component {
    state = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
        loading: false
    };

    onButtonPress() {
        const { fullName, email, password, confirmPassword } = this.state;

        this.setState({ error: '', loading: true });

        var database = firebase.database();

        if (password !== confirmPassword) {
            this.missMatchPasswords();
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this.onLoginSuccess.bind(this))
                .catch(this.onLoginFail.bind(this));

            // var familyUsers = {
            //     fullName: fullName
            // };

            // database.ref(familyName).set(famliyUsers)
            //     .then(this.createFamilySuccess.bind(this));
        }
    }

    missMatchPasswords() {
        this.setState({
            error: 'Passwords do not match',
            loading: false
        });
    }

    createProfileFail() {
        this.setState({
            error: 'Create Profile Failed',
            loading: false
        });
    }

    createProfileSuccess() {
        this.setState({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: '',
            loading: false
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small"/>
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Create Profile
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="First and Last Name"
                        label="Full Name"
                        value={this.state.fulName}
                        onChangeText={fullName => this.setState({ fullname })}
                    />
                </CardSection>
                <CardSection> 
                    <Input 
                        placeholder="user@gmail.com"
                        label="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })} 
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder="Family Password"
                        label="Family Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder="Confirm Family Password"
                        label="Confirm Familly Password"
                        value={this.state.confirmPassword}
                        onChangeText={confirmPassword => this.setState({ confirmPassword })}
                    />
                </CardSection>
                
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default CreateProfile;