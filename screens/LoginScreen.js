import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';
import {AsyncStorage} from 'react-native';
import * as WebBrowser from 'expo-web-browser';

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
      
      // Structure the auth parameters and URL
      const queryParams = toQueryString({
        client_id: auth0ClientId,
        redirect_uri: redirectUrl,
        response_type: 'id_token', // id_token will return a JWT token
        scope: 'openid profile', // retrieve the user's profile
        nonce: 'nonce', // ideally, this will be a random value
      });
      const authUrl = `${auth0Domain}/authorize` + queryParams;
  
      // Perform the authentication
      const response = await AuthSession.startAsync({ authUrl });
      console.log('Authentication response', response);
  
      if (response.type === 'success') {
        this.handleResponse(response.params);
      }
    };
  
    handleResponse = (response) => {
      if (response.error) {
        Alert('Authentication error', response.error_description || 'something went wrong');
        return;
      }
  
      // Retrieve the JWT token and decode it
      const jwtToken = response.id_token;
      const decoded = jwtDecode(jwtToken);
  
      const { name } = decoded;
      this.setState({ name });

      this.storeData('token', jwtToken);
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