import login from './login'

const vuex = {
    login
}

const keys = Object.keys(vuex)

const modules = keys.reduce((acc, key) => ({ ...acc, [keys]: vuex[key].module}), {})

export default { modules }