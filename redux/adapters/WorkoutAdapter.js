import {configWithAuth, BASE_URL } from './BaseConfig'

const WorkoutAdapter = {
    index: (token, selectedGroupId) => fetch(`${BASE_URL}groups/${selectedGroupId}/workouts`, configWithAuth("GET", token)).then(res=>res.json()),
    create: (token, data, selectedGroupId) => fetch(`${BASE_URL}groups/${selectedGroupId}/workouts`, configWithAuth("POST", token, data)).then(res=>res.json()),
    show: (id, token, selectedGroupId, body) => fetch(`${BASE_URL}groups/${selectedGroupId}/workouts/${id}`, configWithAuth("GET", body)).then(res=>res.json()),
    update: (id, token, selectedGroupId, body) => fetch(`${BASE_URL}groups/${selectedGroupId}/workouts/${id}`, configWithAuth("PUT", body)).then(res=>res.json()),
    destroy: (id, token,selectedGroupId, ) => fetch(`${BASE_URL}groups/${selectedGroupId}/workouts/${id}`, configWithAuth("DESTROY")).then(res=>res.json())
}
    
export default WorkoutAdapter;