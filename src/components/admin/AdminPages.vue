<template>
  <div class="admin-pages">
      <PageTitle main="Administrção do sistema" icon="fa fa-cogs" sub="Cadastro & cia" />

      <div class="admin-pages-tabs">
        <b-card no-body>
          <b-tabs card>

            <b-tab title="Artigos" active> 
              <Article/>
            </b-tab>

            <b-tab title="Categorias" active> 
              <Category/>
            </b-tab>

            <b-tab title="Usuários" active> 
              <User/>
            </b-tab>

          </b-tabs>
        </b-card>
      </div>
  </div>
</template>

<script>
import Category from './CategoryAdmin'
import Article from './ArticleAdmin'
import User from './UserAdmin'

import PageTitle from '@/components/template/PageTitle'
export default {
    name: 'AdminPages',
    components: { PageTitle, Category, Article, User }
}
</script>

<style>

</style>