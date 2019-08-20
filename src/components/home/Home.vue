<template>
  <div class="home">
    <PageTitle main="Dashboard" icon="fa fa-home" sub="Base de Conhecimento" />

    <div class="stats">
      <Stats title="Categorias" icon="fa fa-folder" :value="stats.categories" color="#d54d50" />
      <Stats title="Artigos"    icon="fa fa-file"   :value="stats.articles"   color="#3bc480" />
      <Stats title="Usuários"   icon="fa fa-user"   :value="stats.users"      color="#3282cd" />
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle'
import Stats from './Stats'
import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
    name: 'Home',
    components: { PageTitle, Stats },
    data(){
      return {
        stats:{}
      }
    },
    methods:{
      async getStats(){

        const stats = await axios.get(`${baseApiUrl}/stats`)

        this.stats = stats.data
      }
    },
    mounted(){
      this.getStats()
    }
}
</script>

<style>
  .stats{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
</style>