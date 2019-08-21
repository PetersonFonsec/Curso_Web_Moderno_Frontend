<template>
  <div class="user-admin">
    
    <b-form>
      <input id="user-id" v-model="user.id" type='hidden' />

      <b-row>

        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for='user-name'>

            <b-form-input 
              required
              id="user-name"
              type="text" 
              v-model="user.name"
              :readonly="mode === 'remove'"
              placeholder="Informe o nome do usuário"/>

          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group label="Email:" label-for='user-email'>

            <b-form-input 
              id="user-email"
              type="email"
              v-model="user.email"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o nome do usuário"/>

          </b-form-group>
        </b-col>

      </b-row>

      <b-form-checkbox 
        v-show="mode === 'save'"
        id="user-admin"
        v-model="user.admin"
        class="mt-3 mb-3">
        Administrador ?
      </b-form-checkbox>

      <b-row v-show="mode === 'save'">

        <b-col md="6" sm="12">
          <b-form-group label="Senha:" label-for='user-password'>

            <b-form-input 
              required
              id="user-password"
              type="password" 
              v-model="user.password"
              placeholder="Informe a senha do usuário"/>

          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group label="Confirme a Senha:" label-for='user-confirm-password'>

            <b-form-input 
              id="user-confirm-password"
              type="password"
              v-model="user.confirmPassword"
              required
              placeholder="confirme a senha do usuário"/>

          </b-form-group>
        </b-col>

      </b-row>    

      <b-row>
        <b-col sm="12">
          <b-button 
            variant="primary"
            v-if="mode === 'save'"
            @click="save"> Salvar </b-button>

          <b-button 
            variant="danger"
            v-if="mode === 'remove'"
            @click="remove"> Excluir </b-button>

          <b-button class="ml-2"  @click="reset"> Cancelar </b-button>
        </b-col>
      </b-row>
    </b-form>

    <hr/>

    <b-table striped hover :items="users" :fields="fields" >
      <template slot="actions" slot-scope="data">

        <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>

        <b-button variant="danger" @click="loadUser(data.item, 'remove')" class="mr-2">
          <i class="fa fa-trash"></i>
        </b-button>

      </template>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, showError } from '@/global'

export default {
  name:'UserAdmin',
  data(){
    return {
      mode: 'save',
      users: [],
      user: {},
      fields: [
        { key:'id', label: 'Código', sortable: true },
        { key:'name', label: 'Nome'  , sortable: true },
        { key:'email', label: 'E-mail', sortable: true },
        { key:'admin', label: 'Adminitrador', sortable: true, formatter: valor => valor ? 'Sim' : 'Não' },
        { key:'actions', label: 'Ações'},
      ]
    }
  },
  methods: {
    async loadUsers(){
      const url = `${baseApiUrl}/users`
      const users = await axios.get(url)
      
      this.users = users.data

    },
    reset(){
      this.mode = 'save'
      this.user = {}
      this.loadUsers()
    },
    save(){
      const method = this.user.id ? 'put' : 'post'
      const id = this.user.id ? `/${this.user.id}` : ''
      const url =  `${baseApiUrl}/users${id}`    

      axios[method](url, this.user)
        .then( () => this.$toasted.global.defaultSuccess() && this.reset())
        .catch( showError )
    },
    remove(){
      const id = this.user.id 
      const url =  `${baseApiUrl}/users/${id}`

      axios.delete(url)
        .then( () => this.$toasted.global.defaultSuccess() && this.reset())
        .catch( showError )
    },
    loadUser(user, mode = 'save'){
      this.mode = mode
      this.user = { ...user }
    }
  },
  mounted(){
    this.loadUsers()
  }
}
</script>

<style>

</style>