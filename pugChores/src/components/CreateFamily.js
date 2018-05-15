import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';
import CreateProfile from "./CreateProfile";

class CreateFamily extends Component {
    state = {
        familyName: '',
        password: '',
        confirmPassword: '',
        error: '',
        loading: false,
        next: false
    };

    onButtonPress() {
        const { familyName, password, confirmPassword } = this.state;

        this.setState({ error: '', loading: true });

        var database = firebase.database();

        if (password !== confirmPassword) {
            this.missMatchPasswords();
        } else {
            var familyObject = {
                familyName: familyName,
                familyNamePassword: confirmPassword
            };

            database.ref(familyName).set(familyObject)
                .then(this.createFamilySuccess.bind(this))
                .then(this.setState({next: true}));
           
        }
    }

    renderContent() {
        switch (this.state.next) {
            case true:
                return <CreateProfile />; 
            case false:
                return (
                    <Card>
                        <CardSection>
                            <Input
                                placeholder="Family Name"
                                label="Family Name"
                                value={this.state.familyName}
                                onChangeText={familyName => this.setState({ familyName })}
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

    missMatchPasswords() {
        this.setState({
            error: 'Passwords do not match',
            loading: false
        });
    }

    createFamilySuccess() {
        this.setState({
            familyName: '',
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
                Next
            </Button>
        );
    }

    render() {
        return (
            <View>
                {this.renderContent()}
            </View>
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

export default CreateFamily;