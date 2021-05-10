import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'


const module = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}

export default { module }