import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';
import {AsyncStorage} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Random from 'expo-random';
import * as Crypto from 'expo-crypto';

const auth0ClientId = 'eM2nUD4q6hiYYmUEQxkkdDCJ0y5tSAq4';
const auth0Domain = 'https://hivefitness-dev.auth0.com';

/**
 * Converts an object to a query string.
 */
function toQueryString(params) {
    return '?' + Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}
  
export default class LoginScreen extends React.Component {
    state = {
      name: null,
    };

    storeData = async (key,value) => {
      try {
        await AsyncStorage.setItem(key,value);
      } catch (error) {
        // Error saving data
      }
    };

    retrieveData = async (key) => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          // We have data!!
          console.log('Retrieve Data',value);
        } else {
          console.log(`${key} Not Found`)
        } 
      } catch (error) {
        // Error retrieving data
      }
    };

    removeData = async (key) => {
      try {
        await AsyncStorage.removeItem(key);
        return true;
      }
      catch(exception) {
        return false;
      }
    }


    login = async () => {

      // Retrieve the redirect URL, add this to the callback URL list
      // of your Auth0 application.
      const redirectUrl = AuthSession.getRedirectUrl();
      console.log(`Redirect URL: ${redirectUrl}`);

      // Create a Code Verifier
      base64URLEncode = (str) => {
        return str.toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
      }
    
      verifier = base64URLEncode(await Random.getRandomBytesAsync(32));

      // Create a Code Challenge
      sha256 = async (buffer) => {
        const digest = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          buffer
        );
        console.log('Digest: ', digest);
        return digest;
      }
      const challenge = base64URLEncode(sha256(verifier));

      // Structure the auth parameters and URL
      const queryParams = toQueryString({
        code_challenge: challenge,
        code_challenge_method: 'S256',
        client_id: auth0ClientId,
        redirect_uri: redirectUrl,
        response_type: 'code', // id_token will return a JWT token
        scope: 'openid profile', // retrieve the user's profile
        nonce: 'nonce', // ideally, this will be a random value
      });
      const authUrl = `${auth0Domain}/authorize` + queryParams;
  
      // Perform the authentication
      const response = await AuthSession.startAsync({ authUrl });
      console.log('Authentication response', response, 'Verifier', verifier);
  
      if (response.type === 'success') {
        if (response.params.error) {
          Alert('Authentication error', response.error_description || 'something went wrong');
          return;
        }
  
        // Request Tokens using Authorization Code
        const code = response.params.code;
        fetch(`${auth0Domain}/oauth/token`,{
          method: "POST",
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: JSON.stringify({
            grant_type: 'authorization_code',
            client_id: auth0ClientId,
            code_verifier: verifier,
            code: code,
            redirect_uri: redirectUrl
          })
        }).then(res=>res.json())
        .then(data=>console.log('Response Fetch',data))
  
    
        // Retrieve the JWT token and decode it
        const jwtToken = response.params.id_token;
        const decoded = jwtDecode(jwtToken);
    
        const { name } = decoded;
        this.setState({ name });
  
        this.storeData('token', jwtToken);
      }
    };
  
    handleResponse = (response) => {
      
    };

    logout = async () => {
      const logoutUrl = `${auth0Domain}/v2/logout?federated`
      await WebBrowser.openBrowserAsync(logoutUrl)
      this.setState({name: null});
      this.removeData('token')
    }
  
    
    render() {
      this.retrieveData('token');
      const { name } = this.state;
  
      return (
        <View style={styles.container}>
          {
            name ?
            <View>
                <Text style={styles.title}>You are logged in, {name}!</Text>
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