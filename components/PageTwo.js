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