<template>
	<div id="app" :class="{ 'hideMenu' : !isMenuVisible || !user }">
		<Header title="Pet - conhecimento" :hideToggle="!user" :hideUserDropdown="!user"/>
		<Menu v-if="user"/>
		<Loading v-if="validatingToken" />
		<Content v-else/>
		<Footer/>
	</div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'
import { mapState } from 'vuex'
import Header  from '@/components/template/Header'
import Footer  from '@/components/template/Footer'
import Content from '@/components/template/Content'
import Loading from '@/components/template/Loading'
import Menu    from '@/components/Menu'

export default {
	name: "App",
	components:{ Header, Footer, Content, Menu, Loading },
	computed: mapState(['isMenuVisible', 'user']),
	data(){
		return{
			validatingToken: true
		}
	},
	methods: {
		async valdateToken(){
			this.validatingToken = true

			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			
			this.$store.commit('setUser', null)

			if(!userData){
				this.validatingToken = false
				return this.$router.push({ name: 'Auth', })
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

			if(res.data){
				this.$store.commit('setUser', res.data)
				
				if(this.$mq === 'xs' || this.$mq === 'sm'){
					this.$store.commit('toggleMenu', false)
				}
			}else{
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'Auth' })
			}

			this.validatingTokenl = true
		}
	},
	created(){
		this.valdateToken()
	}
}
</script>

<style>
	*{
		font-family: 'Lato', sans-serif;
	}
	body {
		margin: 0;
	}
	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas:
			"header header"
			"menu content"
			"menu footer";
	}
	#app.hideMenu{
		grid-template-areas:
			"header header"
			"content content"
			"footer footer";
	}
</style>