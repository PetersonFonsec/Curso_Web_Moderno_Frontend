<template>
  <div class="article-admin">
    <b-form>
      <input type="hidden" v-model="article.id" />

      <b-form-group label="Nome" for="article-name">
        <b-input
          id="article-name"
          type="text"
          v-model="article.name" 
          :readonly="mode === 'remove'"
          placeholder="Informe o nome da Categoria"/>
      </b-form-group>
  
      <b-form-group 
        required
        label="Descrição"
        for="article-description">

        <b-input
          :readonly="mode === 'remove'"
          v-model="article.description"
          id="article-parent-name"
          type="text"
          placeholder="Informe a descrição do artigo"/>

      </b-form-group>

      <b-form-group 
        label="Imagem ( URL ):"
        for="article-imageUrl">

        <b-input
          required
          type="text"
          v-model="article.imageUrl"
          :readonly="mode === 'remove'"
          id="article-imageUrl"
          placeholder="Informe a URL da imagem"/>

      </b-form-group>

      <b-form-group 
        v-show="mode !== 'remove'"
        label="Categorias"
        for="article-categoryId">

        <b-form-select          
          v-model="article.categoryId"
          id="article-categoryId"
          :options="categories"/>

      </b-form-group>

      <b-form-group 
        v-show="mode !== 'remove'"
        label="Author"
        for="article-userId">

        <b-form-select          
          v-model="article.userId" 
          id="article-userId"
          :options="users"/>

      </b-form-group>
   
      <b-form-group label="Conteudo" for="category-content" v-show="mode !== 'remove'">
        <VueEditor v-model="article.content" placeholder="Informe o conteudo do Artigo..." />
      </b-form-group>
  
      <b-button variant="primary" v-if="mode === 'save'"   @click="save"> Salvar </b-button>
      <b-button variant="danger"  v-if="mode === 'remove'" @click="remove"> Excluir </b-button>
      
      <b-button @click="reset" class="ml-2"> Cancelar </b-button>
      
    </b-form>

    <hr>

    <b-table hover striped :items="articles" :fields="fields">
      
      <template slot="actions" slot-scope="data">
      
        <b-button variant="warning" @click="loadArticle(data.item)">
          <i class="fa fa-pencil"></i>
        </b-button>

        <b-button variant="danger" class="ml-2" @click="loadArticle(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      
      </template>

    </b-table>

    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { showError, baseApiUrl } from '@/global'
import axios from 'axios'

export default {
  name:'ArticleAdmin',
  components:{ VueEditor },
  data(){
    return{
      mode: 'save',
      article: {},
      articles: [],
      category: [],
      categories: [],
      user:[],
      users:[],
      page:1,
      count: 0,
      limit:0,
      fields:[
          {key: 'id', label: 'Código', sortable: true },
          {key: 'name', label: 'Nome', sortable: true },
          {
            key: 'description', label: 'Descrição', sortable: true,
          },
          { key: 'actions', label: 'Ações' },
      ]
    }
  },
  methods:{
    reset(){
      this.mode = 'save'
      this.article = {}
      this.loadArticles()
    },
    async loadArticles(){
      const url = `${baseApiUrl}/articles?page=${this.page}`
      const result = await axios.get(url)

      if(result.status === 200 ){
        this.articles = result.data.data
        this.count = result.data.count
        this.limit = result.data.limit
      }else{
        showError( result.data )
      }
    },
    async loadArticle(article, mode='save'){
      
      const result =  await axios.get(`${baseApiUrl}/articles/${article.id}`)
      this.article = result.data

      this.mode = mode
    },
    save(){
      const method = this.article.id ? 'put' : 'post'
      const id  = this.article.id ? `/${ this.article.id }` : ''
      const url = `${ baseApiUrl }/articles${ id }`
      
      axios[method]( url, this.article )
        .then( () => this.$toasted.global.defaultSuccess() && this.reset())
        .catch( showError )
    },
    remove(){
      const url = `${ baseApiUrl }/articles/${ this.article.id }`
      
      axios.delete( url )
        .then( () => this.$toasted.global.defaultSuccess() && this.reset())
        .catch( showError )
    },
    async loadUsers(){
      const result = await axios.get(`${baseApiUrl}/users`)
      
      this.users = result.data.map( c => ({  value: c.id, text: `${c.name} - ${c.email}` } ) )
    },
    async loadCategories(){
      const result = await axios.get(`${baseApiUrl}/categories`)
      
      this.categories = result.data.map( c => ({  value: c.id, text: c.path  }) )
    },
  },
  watch:{
    page(){
      this.loadArticles()
    }
  },
  mounted(){
    this.loadArticles()
    this.loadCategories()
    this.loadUsers()
  }
}
</script>

<style>

</style>