import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/index'


Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: {
				title: ""
			},
		},
		
	]
})

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title
	}
	next()
})
export default router;