import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';
import { auth0ClientId, auth0Domain, storeData, removeData } from '../redux/adapters/BaseConfig'
// import { logout } from '../redux/actions/userActions';


// import * as Random from 'expo-random';
// import * as Crypto from 'expo-crypto';

// Converts an object to a query string.
function toQueryString(params) {
    return '?' + Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {    
    return {
      title: "Hive Fitness",
      headerStyle: {
        backgroundColor: '#FCAB10',
      },
      headerTintColor: '#fff'
    };
  };

    state = {
      name: null,
    };


    login = async () => {

      // Retrieve the redirect URL, add this to the callback URL list
      // of your Auth0 application.
      const redirectUrl = AuthSession.getRedirectUrl();
      console.log(`Redirect URL: ${redirectUrl}`);

      // Create a Code Verifier
      // base64URLEncode = (str) => {
      //   return str.toString('base64')
      //       .replace(/\+/g, '-')
      //       .replace(/\//g, '_')
      //       .replace(/=/g, '');
      // }
    
      // const verifier = await base64URLEncode(await Random.getRandomBytesAsync(32));
      // console.log('Random: ',await Random.getRandomBytesAsync(32))
      // console.log('Verifier: ', verifier)

      // Create a Code Challenge
      // sha256 = async (buffer) => {
      //   const digest = await Crypto.digestStringAsync(
      //     Crypto.CryptoDigestAlgorithm.SHA256,
      //     buffer
      //   );
      //   console.log('Digest: ', digest);
      //   return digest;
      // }
      // const challenge = await base64URLEncode(await sha256(verifier));
      
      // console.log('Challenge: ', challenge)

      const verifier = 'JUXpxCThhT5AyTXvwJQt7AK4i21HEILHXp0FNL8HWim5CTGL5sb5S7oJsylldYVDZkwNLpIlXv7EAFrUIht1EFHj587ouIk3M1JHmzG3vBBbZbhWINN8gnpGdsVQTUdS'
      const challenge = 'pR-xxDadEgX-LHUTx2oFytbjjsqD_-chTyA4sp2uynA'

      // Structure the auth parameters and URL
      const queryParams = toQueryString({
        code_challenge: challenge,
        code_challenge_method: 'S256',
        client_id: auth0ClientId,
        redirect_uri: redirectUrl,
        response_type: 'code',
        scope: 'openid profile email',
        nonce: 'nonce', // ideally, this will be a random value
      });
      const authUrl = `${auth0Domain}/authorize` + queryParams;
      
      // Perform the Authentication to receive Authorization Code
      const response = await AuthSession.startAsync({ authUrl });
      console.log('Authentication response', response);
  
      if (response.type === 'success') {
        if (response.params.error) {
          Alert('Authentication error', response.error_description || 'something went wrong');
          return;
        }
        
        // Request Tokens using Authorization Code
        const code = response.params.code;
        const body = {
          grant_type: "authorization_code",
          client_id: auth0ClientId,
          code_verifier: verifier,
          code,
          redirect_uri: redirectUrl,
        };

        const resp = await fetch(`${auth0Domain}/oauth/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body),
        }).then(res=>res.json())
        .then(data=> {
          console.log('respJson=',data)

          const accessToken = data.access_token;
          const decodedAccessToken = jwtDecode(accessToken);
          storeData('token', accessToken);

          console.log('Decoded Access Token:', decodedAccessToken);
          this.props.navigation.navigate('Groups');
        })
        
      }
    };

  logout = async () => {
    const logoutUrl = `${auth0Domain}/v2/logout?federated`
    await WebBrowser.openBrowserAsync(logoutUrl)
    removeData('token');
    this.props.navigation.navigate('Login')
  }
  
  render() {
    const { currentUserId } = this.props.users
    const currentUser = this.props.users.usersArray.find(user => user.id === currentUserId)
    return (
      <View style={styles.container}>
        {
          currentUserId ?
          <View>
              <Text style={styles.title}>You are logged in, {`${currentUser.attributes.first_name} ${currentUser.attributes.last_name}`}!</Text>
              <Button title="Logout" onPress={this.logout} />
          </View> :
          <Button title="Log in with Auth0" onPress={this.login} />
        }
      </View>
    );
  }
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
});

const mapStateToProps = state => ({
  users: state.users
})

export default connect( mapStateToProps, null )(LoginScreen);