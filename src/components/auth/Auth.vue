<template>
  <div class="auth-content">
      <div class="auth-modal">
          <img src="@/assets/logo.png" width='200' alt="logo" />
          <hr/>
          <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>          

          <input v-if="showSignup" v-model="user.name" placeholder="Nome" />
          <input v-model="user.email" placeholder="Email" />
          <input v-model="user.password" type="password" placeholder="Senha" />
          <input v-if="showSignup" v-model="user.confirmPassword" type="password" placeholder="Senha" />

          <button v-if="showSignup" @click="sinup">Cadastrar</button>
          <button v-else @click="sinin">Entrar</button>

          <a href @click.prevent="showSignup = !showSignup">
            <span v-if="showSignup">á tem cadastro? Acesseo Login!</span>
            <span v-else>Não tem cadastro? Registres-se aqui</span>
          </a>

      </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '@/global'
import axios from 'axios'
export default {
    name: 'Auth',
    data(){
        return {
            showSignup: false,
            user: {}
        }
    },
    methods:{
        sinin(){
            axios.post(`${baseApiUrl}/sinin`, this.user)
                .then( res => {
                    this.$store.commit('setUser', res.data)
                    
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    
                    this.$router.push({
                        path: '/'
                    })
                })
                .catch( showError )
        },
        sinup(){
            axios.post(`${baseApiUrl}/sinup`, this.user)
                .then( () => {
                    this.$toasted.global.defaultSuccess()
                    this.user = {}
                    this.showsinup = false
                })
                .catch( showError )
        }
    }
}
</script>

<style>
.auth-content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.auth-modal { 
    background-color: #fff;
    width: 350px;
    padding: 35px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.15);    
    display: flex;
    flex-direction: column;
    align-items: center;
}
.auth-title {
    font-size: 1.2rem;
    font-weight: 100;
    margin-top: 10px;
    margin-bottom: 15px;
}
.auth-modal input {
    border: 1px solid #BBB;
    width:100%;
    margin-bottom: 15px;
    padding: 3px 8px;
}
.auth-modal button{
    border: none;
    align-self: flex-end;
    background-color: #2460ae;
    color: #FFF;
    padding: 5px 15px;
}
.auth-modal a{
    margin-top: 35px;
}
</style>