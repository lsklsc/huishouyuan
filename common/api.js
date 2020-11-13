import http from './request/interface'

let baseurl = null;
// const url = "http://172.16.1.205:8000"
if (process.env.NODE_ENV === 'development') { //开发环境
	// baseurl = "http://172.16.1.34:8000" //曹俊良
	// baseurl = 'http://dev-resources.ztbory.com'; //测试曹
	// baseurl = 'https://dev-resources.ztbory.com';
	baseurl = 'https://resources.ztbory.com'; //线上  
} else { //生产环境
	// baseurl = 'https://tzljpf.ztbory.com';
	baseurl = 'https://resources.ztbory.com'; //曹
}

http.config.baseUrl = baseurl;

// 下面这些API方法不需要验证token
let filterApi = [
	'mini/login',
	'mini/binding/user',
	'v1/users/login',
	'v1/record/rubbish_type',
	'v1/org/orgtype',
	'v1/base/coding',
	'v2/device/org_register',
	'v1/mini/gregister_send',
	'v1/mini/phoneLogin',
	'v2/device/org_2',
	'v1/news/record',
	'v1/shop/goods',
	'/v1/device/device_loc/',
	'/v1/shop/get_goods/',
	'/v1/shop/goods_type/',
	'/v2/device/get_class/',
	'/mini/alipayLogin/',
	//回收员
	'/v1/user/login/'
]
//设置请求前拦截器
http.interceptor.request = (config) => {
	// 过滤掉不需要验证的token的路由api
	let url = config.url;
	let exist = filterApi.every(n => {
		let value = url.indexOf(n);
		if (value < 0) {
			return true
		}
		return false;  
	})
	if (exist) {
		//添加通用参数
		let data = uni.getStorageSync('userInfo')?JSON.parse(uni.getStorageSync('userInfo')):''
		config.header = {
			'Authorization': 'Token ' + uni.getStorageSync('token'),
			"AppClient": data.role ? data.role : 'RenewableCollectionDriver'
		}
	}
}
//设置请求结束后拦截器
http.interceptor.response = (response) => {
	uni.hideLoading();
	//判断返回状态 执行相应操作
	return response;
}

const api = {
	// 基础url
	baseurl,
	scanurl: 'https://tzljpf.ztbory.com',
	// 图片访问服务器
	img: 'https://resources.ztbory.com/',
	// 图片上传接口
	uploadurl: baseurl + '/v1/file/file/',
	//以下回收人员端接口
	//回收人员登录
	loginUser(data) {
		return http.post('/v1/user/login/', data);
	},
	//回收人员信息
	User(id, data) {
		return http.get('/v1/user/collection_staff', data);
	},
	//订单列表
	record(data) {
		return http.get('/v1/order/order', data);
	},
	getUserInfo: (id, data) => {
		return http.get(id ? '/v1/user/get_user_info/' + id + '/' : '/v1/user/get_user_info/', data);
	},
	//列表详情
	detail(id, data) {
		return http.get(id ? '/v1/order/order/' + id + '/' : '/v1/order/order/', data);
	},
	//修改订单状态
	editOrder(id, data) {
		return http.put(id ? '/v1/order/order/' + id + '/' : '/v1/order/order/', data);
	},
	//垃圾分类列表
	rubbishList(data) {
		return http.get('/v1/rubbish/company_rubbish_price/', data);
	},
	//失败原因列表
	reasonList(data) {
		return http.get('/v1/mark/failure_info/', data);
	},
	//标记失败
	markError(data) {
		return http.post('/v1/mark/mark_error/', data);
	},
	//版本更新
	version(data) {
		return http.post('/v1/base/version/', data);
	},

	//http://172.16.1.34:8000/v1/base/version/再生资源回收人员app/














	//以下潞晓芬居民端接口
	// 扫码提交
	scanSubmit(data) {
		return http.post('/v2/device/saoma_response/', data);
	},
	// 居民微信登录
	miniLogin: (data) => {
		return http.get('/v1/mini/login/', data);
	},
	// 居民微信登录-支付宝
	alipayLogin: (data) => {
		return http.post('/v1/mini/alipayLogin/', data);
	},
	// 用户信息
	// getUserInfo: (id, data) => {
	// 	return http.get(id ? '/v1/mini/get_user_info/' + id + '/' : '/v1/mini/get_user_info/', data);
	// },
	// 绑定积分卡/补录信息
	bindUser: (data) => {
		return http.post('/v1/mini/binding/user/', data);
	},
	// coding
	getCoding(data) {
		return http.get('/v1/base/coding/', data);
	},
	// 查小区
	getXq(data) {
		return http.get('/v2/device/org_2/', data);
	},
	// 新闻资讯列表
	news_list: (id, data) => {
		return http.get(id ? '/v1/news/record/' + id + '/' : '/v1/news/record/', data)
	},
	// 添加订单
	order_add: (data) => {
		return http.post('/v1/record/technological_process/', data);
	},
	// 订单列表
	order_list: (data) => {
		return http.get('/v1/record/technological_process/', data);
	},
	// 订单详情
	order_detail: (id) => {
		return http.get('/v1/record/technological_process/' + id + "/")
	},
	// 修改订单状态
	order_update: (id, data) => {
		return http.put('/v1/record/technological_process/' + id + "/", data)
	},
	// 商品类型
	goods_type: (id) => {
		return http.get(id ? '/v1/shop/goods_type/' + id + '/' : '/v1/shop/goods_type/')
	},
	// 商品列表
	goods_list: (data) => {
		return http.get('/v1/shop/goods/', data)
	},
	// 热门活动
	activity: (data) => {
		return http.get('/v1/miniProgram_newfunc/activity/', data);
	},
	// 获取投诉类型
	t_type: (data) => {
		return http.get('/v1/supervise/suggestionType/', data)
	},
	// 获取投诉列表
	t_list: (data, id) => {
		return http.get(id ? '/v1/supervise/tousu/' + id + '/' : '/v1/supervise/tousu/', data)
	},
	// 获取收运公司
	compeny_list: (data) => {
		return http.get('/v1/org/transport/', data)
	},
	// 提交投诉
	commit_t: (data) => {
		return http.post('/v1/supervise/tousu/', data)
	},
	// 积分兑换
	exchange(data) {
		return http.post('/v1/shop/order/', data);
	},
	// 兑换记录
	exchangeHistory(data) {
		return http.get('/v1/shop/order/', data);
	},
	// 附近的垃圾桶
	nearbyMarkers(data) {
		return http.get('/v1/device/device_loc/', data)
	},
	// 附近的公厕
	nearbyToilet(data) {
		return http.get('/v1/org/get_wc/', data)
	},
	// 居民积分明细
	getScoreList(data) {
		return http.get('/v1/score/get_score_change/', data);
	},
	// 用户投放记录
	getScore(data) {
		return http.get('/v1/score/record_score_change/', data)
	},
	// 获取答题题目与答案
	subject(data) {
		return http.get('/v2/device/subject/', data);
	},
	// 提交答案
	submitAnswer(data) {
		return http.post('/v2/device/answer_record/', data);
	},
	// 收运资质单位
	transport(data) {
		return http.get('/v1/org/transport/', data);
	},
	// 分类常识-垃圾类型
	smallRubbish(data) {
		return http.get('/v2/device/classification/', data);
	},
	// 垃圾类型
	rubbishType(data = {}) {
		return http.get('/v1/record/rubbish_type/', data)
	},
	// 分类常识
	category(data = {}) {
		return http.get('/v2/device/get_class/', data)
	},
	// 新商城获取大类
	goodsType(data = {
		grade: 1
	}) {
		return http.get('/v1/shop/goods_type/', data)
	},
	// 新商城获取商品
	goods(data = {}) {
		return http.get('/v1/shop/get_goods/', data)
	},
	// 获取积分卡家庭成员
	familyInfo(data = {}) {
		return http.get('/v1/mini/get_family_user/', data)
	},
	// 解除绑定积分卡
	unbind(data) {
		return http.post('/v1/mini/unbound_cad_num/', data);
	},
	// 修改基本信息
	updateInfo(data) {
		return http.post('/v1/mini/update_user/', data);
	}
}


export default api
