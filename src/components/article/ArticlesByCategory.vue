<template>
    <div class="articles-by-category">
        <PageTitle :main="category.name" icon='fa fa-folder-o'  sub="categoria"/>

        <ul>
            <li v-for="article in articles" :key="article.id">
                <ArticleItem :article="article" />
            </li>
        </ul>

        <div class="load-more">
            <button 
                v-if="loadMore"
                @click="getArticles"
                class="btn btn-outline-primary"> Carregar mais  Artigos</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl } from '@/global'
import PageTitle from '@/components/template/PageTitle'
import ArticleItem from './ArticleItem'

export default {
    name: 'ArticlesByCategory',
    components: { PageTitle, ArticleItem },
    data(){
        return {
            category: {},
            articles: [],
            page: 1,
            loadMore: true,
        }
    },
    methods:{
        async getCategory(){ 
            const url = `${baseApiUrl}/categories/${this.category.id}`
            const res = await axios(url)

            this.category = res.data
        },
        async getArticles(){ 
            const url = `${baseApiUrl}/categories/${this.category.id}/articles?pages=${this.page}`
            const res = await axios(url)

            this.articles = this.articles.concat(res.data)
            this.page++

            if(res.data.length === 0 ) this.loadMore = false
        }
    },
    watch:{
        $route(to){
            this.category.id = to.params.id,
            this.articles = [],
            this.page = 1,
            this.loadMore = true
            
            this.getCategory()
            this.getArticles()
        }
    },
    mounted(){
        this.category.id = this.$route.params.id
        this.getCategory()
        this.getArticles()
    }
}
</script>

<style>
    .articles-by-category ul {
        list-style: none;
        padding: 0px;
    }
    .articles-by-category .load-more{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>