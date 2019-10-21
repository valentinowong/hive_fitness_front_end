import {AsyncStorage} from 'react-native';

export const IP = `10.0.1.5`
export const BASE_URL = `http://${IP}:3000/api/v1/`

// Auth0 application specific Client ID
export const auth0ClientId = 'eM2nUD4q6hiYYmUEQxkkdDCJ0y5tSAq4';

// Auth0 tenant specific domain
export const auth0Domain = 'https://hivefitness-dev.auth0.com';

const getToken = async () => {
    let token = await AsyncStorage.getItem('token')
    return token
}

export const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key,value);
    } catch (error) {
      // Error saving data
    }
};

export const retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        return value;
      } else {
        console.log(`${key} Not Found`)
      }
    } catch (error) {
        console.log(error.message)
    }
};

export const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch(exception) {
      return false;
    }
}

export const config = (method, body) => {
    return {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body)
    }
  }
  
export const configWithAuth = (method, token, body) => {
    return {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    }
}
  
  export const configWithMultiPart = (data, token) => {
    return {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': token
      },
      method: 'POST',
      body: data
    }
  }
  
  export const jsonify = (res) => res.json()
