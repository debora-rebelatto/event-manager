import * as types from './mutations-types'
import auth from '@/services/modules/auth'

export const DoRegister = (user) => {
    return auth.register(user)
    .then(res => {
        return Promise.resolve(res);
    })
    .catch(err => {
        Promise.reject(err)
    })
}