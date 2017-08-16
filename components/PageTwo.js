import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import AccountKit from 'react-native-facebook-account-kit';

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authToken: null,
      loggedAccount: null
    };
  }

  componentWillMount() {
    AccountKit.configure({
      countryWhitelist: ["CA", "US"],
      defaultCountry: "CA"
    });

    AccountKit.getCurrentAccessToken().then((token) => {
      if (token) {
        AccountKit.getCurrentAccount().then((account) => {
          this.setState({ authToken: token, loggedAccount: account });
          console.log('already logged in');
        })
      } else {
        console.log('No account logged in')
      }
    })
    .catch((e) => console.log('Access token request failed', e))
  }

  loginWithEmail() {
    AccountKit.loginWithEmail()
      .then((token) => {
        this.onLoginSuccess(token)
      })
      .catch((e) => {
        this.onLoginError(e)
      })
  }

  onLoginSuccess(token) {
    console.log('onLoginSuccess');
    if (!token) {
      console.warn('No token found')
      this.setState({})
    } else {
      AccountKit.getCurrentAccount()
        .then((account) => {
          this.setState({
            authToken: token,
            loggedAccount: account
          })
        })
    }
  }  


  onLoginError(error) {
    console.log('onLoginError');
  }

  renderUserDetails() {
    const {id, email} = this.state.loggedAccount;
    return (<Text>Account Kit User: {id}, {email}</Text>);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          This is Page Two!
        </Text>
        <Button title="Go Home"
          onPress={() => {
            this.props.navigator.pop();
          }} 
        />
        <Button title="Login with Email"
          onPress={() => {
            this.loginWithEmail();
          }}
        />
        { this.state.loggedAccount && this.renderUserDetails() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});