<template>
  <aside class="menu" v-show="isMenuVisible">
      <div class="menu-filter">
        <i class="fa fa-search fa-lg"></i>
        <input type="text" placeholder="digite para filtrar..." 
            class="filter-field"
            v-model="treeFilter"/>
      </div>
    
      <Tree :data="treeData" :filter="treeFilter" :options="treeOptions" ref='tree'/>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import { baseApiUrl } from '@/global'
import Tree from 'liquor-tree'
import axios from 'axios'

export default {
    name: 'Menu',
    components: { Tree },
    computed: mapState(['isMenuVisible']),
    data(){
        return {
            treeFilter: '',
            treeData: this.getTreeData(),
            treeOptions: {
                propertyNames:{ 'text' : 'name' },
                filter:{ emptyText: 'Categoria não encontrada'  }
            }
        }
    },
    methods:{
        async getTreeData(){
            const result = await axios(`${baseApiUrl}/categories/tree`)
            return result.data
        },
        onNodeSelect(node){
            this.$router.push({
                name: 'ArticlesByCategory',
                params: { id: node.id }
            })

            if(this.$mq === 'xs' || this.$mq === 'sm'){
                this.$store.commit('toggleMenu', false)
            }
        }
    },
    mounted(){
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    }
}
</script>

<style>
    .menu{
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);
        display: flex;
        flex-direction:column;
        flex-wrap: wrap;
    }
    .menu a,.menu a:hover{
        color: #fff;
        background: transparent;
        text-decoration: none;
    }
    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover{
        background-color: rgba(255,255,255,0.2) ;
    }
    .tree-arrow.has-child{
        filter: brightness(2);
    }
    .menu .menu-filter {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #AAA;
    }
    .menu .menu-filter i { 
        color: #AAA;
        margin-right: 10px;
    }
    .menu input {
        color: #CCC;
        font-size: 1.3rem;
        border: 0;
        outline: 0;
        width: 100%;
        background-color: transparent;
    }
    .menu .tree-filter-empty{
        color: #CCC;
        font-size: 1.1rem;
        margin-left: 20px;

    }
</style>