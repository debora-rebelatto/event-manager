const URL = 'http://localhost:3000/'

export const headers = {
    'Authorization': `Bearer ${localStorage.getItem('user') ? localStorage.getItem('user').slice(1, -1) : ''}`
}

//Cadastro e autenticação
export const AUTH = `${URL}/auth/authenticate`
export const REGISTER = `${URL}/user/register`

//Event
export const EVENT = `${URL}/event`

//user
export const USER = `${URL}/user`
//participant

export const PARTICIPANT = `${URL}/participant`
