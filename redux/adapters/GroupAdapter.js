import {configWithAuth, BASE_URL } from './BaseConfig'

const GroupAdapter = {
    index: (token) => fetch(`${BASE_URL}groups`, configWithAuth("GET", token)).then(res=>res.json()),
    create: (data) => fetch(`${BASE_URL}groups`, configWithMultiPart(data)).then(res=>res.json()),
    show: (id, token) => fetch(`${BASE_URL}groups/${id}`, configWithAuth("GET", token)).then(res=>res.json()),
    update: (id, body) => fetch(`${BASE_URL}groups/${id}`, config("PUT", body)).then(res=>res.json()),
    destroy: (id) => fetch(`${BASE_URL}groups/${id}`, config("DESTROY")).then(res=>res.json())
}

export default GroupAdapter