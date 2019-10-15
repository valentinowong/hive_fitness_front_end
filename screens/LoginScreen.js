import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';
import {AsyncStorage} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Random from 'expo-random';
import * as Crypto from 'expo-crypto';


// Auth0 application specific Client ID
const auth0ClientId = 'eM2nUD4q6hiYYmUEQxkkdDCJ0y5tSAq4';

// Auth0 tenant specific domain
const auth0Domain = 'https://hivefitness-dev.auth0.com';

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
      // base64URLEncode = (str) => {
      //   return str.toString('base64')
      //       .replace(/\+/g, '-')
      //       .replace(/\//g, '_')
      //       .replace(/=/g, '');
      // }
    
      // const verifier = await base64URLEncode(await Random.getRandomBytesAsync(32));
      // console.log('Random: ',await Random.getRandomBytesAsync(32))
      // console.log('Verifier: ', verifier)

      // // // Create a Code Challenge
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
        response_type: 'code', // id_token will return a JWT token
        scope: 'openid profile email', // retrieve the user's profile
        nonce: 'nonce', // ideally, this will be a random value
      });
      const authUrl = `${auth0Domain}/authorize` + queryParams;
      
      console.log('Query Params: ', queryParams)

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
        console.log('Code: ', code)

        const body = {
          grant_type: "authorization_code",
          client_id: auth0ClientId,
          code_verifier: verifier,
          code,
          redirect_uri: redirectUrl,
        };
        console.log('Body: ', body)
        const resp = await fetch(`${auth0Domain}/oauth/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body),
        }).then(res=>res.json())
        .then(data=> {
          console.log('respJson=',data)
          const jwtTokenIdToken = data.id_token;
          const decodedIdToken = jwtDecode(jwtTokenIdToken);
          const { name } = decodedIdToken;
          this.setState({ name });
          
          this.storeData('token', jwtTokenIdToken);
          console.log('Decoded ID Token:', decodedIdToken)

          const accessToken = data.access_token;
          const decodedAccessToken = jwtDecode(accessToken);
          console.log('Decoded Access Token:', decodedAccessToken);
          fetch('http://localhost:3000/api/v1/groups', {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }).then(res=>res.json()).then(data=>console.log(data))
        })
        this.props.navigation.navigate('Main');
      }
    };

    logout = async () => {
      const logoutUrl = `${auth0Domain}/v2/logout?federated`
      await WebBrowser.openBrowserAsync(logoutUrl)
      this.setState({name: null});
      this.removeData('token')
    }
  
    // async componentDidMount() {
    //   try {
    //     const apiCall = await fetch('http://localhost:3000/public/hello', {
    //       headers: {
    //         'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9VVkZNRU5CT1RsQlFVVkRRakZHTlRsR09ESXpRelV3UmpoRE1Ea3lRVGczTjBJd09UbEZOdyJ9.eyJpc3MiOiJodHRwczovL2hpdmVmaXRuZXNzLWRldi5hdXRoMC5jb20vIiwic3ViIjoiVklxT2t4NFpXZzlHRkxEMFdGeEJSWXNLeVpHV2xNd05AY2xpZW50cyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8iLCJpYXQiOjE1NzEwNjUzMjUsImV4cCI6MTU3MTE1MTcyNSwiYXpwIjoiVklxT2t4NFpXZzlHRkxEMFdGeEJSWXNLeVpHV2xNd04iLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.WEzmzrI1oW4ks5tAGzWWA3JlYO3VqFxy03Kzue7OttnqvD0-gUMQAzYXdMLwDrH-oSwi8wP2aFttyRUj1xztEAEqWyaV9ze2u_tmZNI3BnkvsAeOpVBskEaYCUqLXNeIaiMYm3B46l9Iz85leU85wRe9cc3etZE6PsRQCfc4kZpOoDGWGK3IqzJLQvMwJrPWPGI3865f5QWRQRJExkUzyilThI9cbJhA5NVNJtg35fsES7MDlURIp6LMkcNowVpcKCdySwt7tcYjGVduK4GJb2PgH7-l5eELP_PwhSZFDRQurU0MIvRjcFoUq1kDFzaflQDNu3-LoLLSS_CElkKGYA'
    //       }
    //     });
    //     const results = await apiCall.json();
    //     console.log(results)
    //   } catch(err) {
    //     console.log("Error fetching data-----------", err);
    //   }
    // }

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

  export default LoginScreen