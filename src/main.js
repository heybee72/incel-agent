// src/main.js

import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import * as VueGoogleMaps from 'vue2-google-maps'
import {
	Vue2Dragula
} from 'vue2-dragula'
import VueQuillEditor from 'vue-quill-editor'
import wysiwyg from 'vue-wysiwyg'
import VueBreadcrumbs from 'vue2-breadcrumbs'
import VueResource from 'vue-resource'
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'
import Nprogress from 'nprogress'
import VueI18n from 'vue-i18n'
import VueTour from 'vue-tour'
import fullscreen from 'vue-fullscreen'
import InstantSearch from 'vue-instantsearch'
import VueVideoPlayer from 'vue-video-player';
import Croppa from 'vue-croppa';
// global components
import GlobalComponents from './globalComponents'
// router
import router from './router'

// store
import {
	store
} from './store/store';

// firebase
import './firebase'

// include all css files
import './lib/VuelyCss'

// messages
import messages from './lang';

Vue.config.productionTip = false

// navigation guards before each
router.beforeEach((to, from, next) => {
	Nprogress.start()
	if (to.matched.some(record => record.meta.requiresAuth)) {
		try {
			// this route requires auth, check if logged in
			// if not, redirect to login page.
			let currentDate = new Date();
			let date = localStorage.getItem('expiry') == null ? null : Date.parse(localStorage.getItem('expiry'));
			let token = localStorage.getItem('user');
			console.log(date)
			if (token == null || date == null || currentDate >= date) {
				next({
					path: '/session/login',
					query: {
						redirect: to.fullPath
					}
				})
			} else {
				next();
			}
		} catch (e) {
			console.log(e);
		}
	} else {
		next(); // make sure to always call next()!
	}
})

// navigation guard after each
router.afterEach(() => {
	Nprogress.done()
	setTimeout(() => {
		const contentWrapper = document.querySelector(".v-content__wrap");
		if (contentWrapper !== null) {
			contentWrapper.scrollTop = 0;
		}
		const boxedLayout = document.querySelector('.app-boxed-layout .app-content');
		if (boxedLayout !== null) {
			boxedLayout.scrollTop = 0;
		}
		const miniLayout = document.querySelector('.app-mini-layout .app-content');
		if (miniLayout !== null) {
			miniLayout.scrollTop = 0;
		}
	}, 200);
})

Vue.use(InstantSearch);
Vue.use(VueI18n)
Vue.use(VueTour)
Vue.use(Vue2Dragula)
Vue.use(VueQuillEditor)
Vue.use(VueResource)
Vue.use(wysiwyg, {})
Vue.use(VueBreadcrumbs)
Vue.use(Notifications, {
	velocity
})
Vue.use(fullscreen);
Vue.use(GlobalComponents);
Vue.use(VueVideoPlayer);
Vue.use(Croppa);
Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyBtdO5k6CRntAMJCF-H5uZjTCoSGX95cdk' // Add your here your google map api key
	}
})

const i18n = new VueI18n({
	locale: store.getters.selectedLocale.locale, // set locale
	messages, // set locale messages
})


new Vue({
	store,
	i18n,
	router,
	vuetify,
	render: h => h(App),
	components: {
		App
	}
}).$mount('#app')