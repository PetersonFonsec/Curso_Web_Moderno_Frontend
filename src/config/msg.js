import Vue from 'vue'
import toasted from 'vue-toasted'

Vue.use(toasted,{
    iconPack: 'fontawesome',
    duration: 3000
})

Vue.toasted.register(
    'defaultSuccess',
    'Operação realizada com sucesso!',
    { type: 'success', icon: 'check' }
)
Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Ooops... erro inesperado' : payload.msg,
    { type: 'error', icon: 'times' }
)
