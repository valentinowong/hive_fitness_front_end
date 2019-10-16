import { FETCH_PUBLIC_HELLO, FETCH_PRIVATE_HELLO } from './types';
import {AsyncStorage} from 'react-native';
import { IP } from '../adapters/BaseConfig'

export const fetchPublicHello = () => dispatch => {
    console.log('Public Fetching')
    fetch(`http://${IP}:3000/public/hello`)
        .then(res => res.json())
        .then(data => 
            dispatch({
                type: FETCH_PUBLIC_HELLO,
                payload: data
            })
        );
};

export const fetchPrivateHello = () => dispatch => {
    console.log('Private Fetching')
    fetch(`http://${IP}:3000/private/hello`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Accept": 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9VVkZNRU5CT1RsQlFVVkRRakZHTlRsR09ESXpRelV3UmpoRE1Ea3lRVGczTjBJd09UbEZOdyJ9.eyJpc3MiOiJodHRwczovL2hpdmVmaXRuZXNzLWRldi5hdXRoMC5jb20vIiwic3ViIjoiVklxT2t4NFpXZzlHRkxEMFdGeEJSWXNLeVpHV2xNd05AY2xpZW50cyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8iLCJpYXQiOjE1NzEwNjUzMjUsImV4cCI6MTU3MTE1MTcyNSwiYXpwIjoiVklxT2t4NFpXZzlHRkxEMFdGeEJSWXNLeVpHV2xNd04iLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.WEzmzrI1oW4ks5tAGzWWA3JlYO3VqFxy03Kzue7OttnqvD0-gUMQAzYXdMLwDrH-oSwi8wP2aFttyRUj1xztEAEqWyaV9ze2u_tmZNI3BnkvsAeOpVBskEaYCUqLXNeIaiMYm3B46l9Iz85leU85wRe9cc3etZE6PsRQCfc4kZpOoDGWGK3IqzJLQvMwJrPWPGI3865f5QWRQRJExkUzyilThI9cbJhA5NVNJtg35fsES7MDlURIp6LMkcNowVpcKCdySwt7tcYjGVduK4GJb2PgH7-l5eELP_PwhSZFDRQurU0MIvRjcFoUq1kDFzaflQDNu3-LoLLSS_CElkKGYA'
        }
    })
        .then(res => res.json())
        .then(data => 
            dispatch({
                type: FETCH_PRIVATE_HELLO,
                payload: data
            })
        );
}
