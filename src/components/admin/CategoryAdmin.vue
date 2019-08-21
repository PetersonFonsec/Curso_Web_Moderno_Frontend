<template>
  <div class="category-admin">
    <b-form>
      <input type="hidden" v-model="category.id" />
      <b-row>
        <b-col xs='12'>
          <b-form-group label="Nome" for="category-name">
            <b-input
              id="category-name"
              type="text"
              v-model="category.name" 
              placeholder="Informe o nome da Categoria"/>
          </b-form-group>
        </b-col>
      </b-row>
     
      <b-row>
        <b-col xs='12'>
          <b-form-group label="Categoria Pai" for="category-parent-name">
            <b-form-select
              v-model="category.parantId"
              id="category-parent-name"
              type="text"
              :options="options" 
              placeholder="Informe o nome do pai da Categoria"/>
          </b-form-group>
        </b-col>

      </b-row>

      <b-row>
        <b-col sm="12">
          <b-button variant="primary" v-if="mode === 'save'"   @click="save"> Salvar </b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove"> Excluir </b-button>
          
          <b-button @click="reset" class="ml-2"> Cancelar </b-button>
        </b-col>
      </b-row>

    </b-form>

    <hr>

    <b-table hover striped :items="categories" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadCategory(data.item)">
          <i class="fa fa-pencil"></i>
        </b-button>

        <b-button variant="danger" class="ml-2" @click="loadCategory(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { showError, baseApiUrl } from '@/global'
import axios from 'axios'

export default {
  name:'categoriAdmin',
  data(){
    return{
      mode: 'save',
      category: {},
      categories: [],
      options: [],
      fields:[
          {key: 'id', label: 'Código', sortable: true },
          {key: 'name', label: 'Nome', sortable: true },
          {
            key: 'path',
            label: 'Caminho',
            sortable: true,
            formatter: valor => valor.replace('>', ' > ')
          },
          { key: 'actions', label: 'Ações' },
      ]
    }
  },
  methods:{
    reset(){
      this.mode = 'save'
      this.category = {}
      this.loadCategories()
    },
    async loadCategories(){
      const url = `${baseApiUrl}/categories`
      
      const categories = await axios.get(url)

      if(categories.status === 200 ){
        this.categories = categories.data
        this.createOptions(categories.data)
      }else{
        showError( categories.data )
      }     
      
    },
    loadCategory(category, mode='save'){
      this.category = { ...category }
      this.mode = mode
    },
    createOptions(categories){
      this.options = categories.map( c => ({ value: c.id, text: c.name  }) )
    },
    save(){
      const method = this.category.id ? 'put' : 'post'
      const id  = this.category.id ? `/${ this.category.id }` : ''
      const url = `${ baseApiUrl }/categories${ id }`
      
      axios[method]( url, this.category )
        .then( () => this.$toasted.global.defaultSuccess() && this.reset())
        .catch( err => showError(err.msg) )
    },
    remove(){
      const url = `${ baseApiUrl }/categories/${ this.category.id }`
      
      axios.delete( url )
        .then( () => this.$toasted.global.defaultSuccess() && this.reset())
        .catch( err => showError(err.msg) )
    },
  },
  mounted(){
    this.loadCategories()
  }
}
</script>

<style>

</style>