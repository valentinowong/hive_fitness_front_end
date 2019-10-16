import { LOGOUT } from './types';
import * as WebBrowser from 'expo-web-browser';
import { auth0Domain, removeData } from '../redux/adapters/BaseConfig';
    
export const logout = async () => dispatch => {
  console.log('Logging Out');
  const logoutUrl = `${auth0Domain}/v2/logout?federated`
  await WebBrowser.openBrowserAsync(logoutUrl)
  removeData('token');
  dispatch({
    type: LOGOUT
  })
}
