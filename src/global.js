import Vue from 'vue';

export const userKey = '__knowledge_user';

export const baseApiUrl = 'http://localhost:3000';

export const showError = e => {
    
    if(e && e.response && e.response.data ){
        Vue.toasted.global.defaultError( e.response.data )
    }else if( typeof e === 'string'){
        
        Vue.toasted.global.defaultError(e)
    }else{
        Vue.toasted.global.defaultError()
    }

}

export default { baseApiUrl, showError, userKey }