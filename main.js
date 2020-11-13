import Vue from 'vue'
import App from './App'
import api from './common/api.js' //api接口
import * as filters from './common/filters.js'//过滤
import store from './store'
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false


// showToast
Vue.prototype.$showToast = (title, mask = false, duration = 1500, icon = 'none') => {
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

// 开启loading
Vue.prototype.$showLoading = (content = '加载中') => {
	uni.showLoading({
		title: `${content}`,
		mask: true
	})
};
// modal
Vue.prototype.$showModal = (content = '成功', callback = function() {}, title = '') => {
	uni.showModal({
		title: `${title}`,
		content: `${content}`,
		showCancel: false,
		cancelText: '',
		confirmText: '确定',
		success: res => {
			callback();
		}
	});
}
// 静态图片
Vue.prototype.$img = (pic) => {
	return api.img + pic;
}

// api
Vue.prototype.$api = {
	...api
};

// 全局过滤
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// vuex
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
