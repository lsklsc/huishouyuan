<template>
	<view class="content">
		<image src="../../static/img/login/login.png" mode="aspectFill" class="login-img"></image>
		<!-- #ifdef MP-WEIXIN -->
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">微信快捷登录</button>
		<!-- #endif -->
		<!-- #ifdef MP-ALIPAY -->
		<button open-type="getAuthorize" class="btn-login alipay" @getAuthorize="onGetAuthorize" @error="onAuthError" scope="userInfo">支付宝授权登录</button>
		<!-- #endif -->
	</view>
</template>

<script>
let _this = null;
export default {
	data() {
		return {
			code: '',
			authCode: ''
		};
	},
	onLoad() {
		_this = this;
	},
	methods: {
		onGetAuthorize(res) {
			my.getAuthCode({
				scopes: ['auth_base'],
				success: res => {
					console.log(res);
					this.authCode = res.authCode;
					console.log(this.authCode);
					my.getOpenUserInfo({
						fail: res => {},
						success: res => {
							let userInfo = JSON.parse(res.response).response; // 以下方的报文格式解析两层 response
							console.log(userInfo);
							this.alipaybindLogin(userInfo);
						}
					});
				}
			});
		},
		// 支付宝登录错误
		onAuthError(err) {
			console.log(err);
		},
		// 支付宝根据authCode 请求
		alipaybindLogin(options) {
			this.$showLoading();
			this.$api
				.alipayLogin({
					auth_code: this.authCode
				})
				.then(res => {
					uni.hideLoading();
					let bind = res.data.data.binding;
					let unionid = res.data.data.unionId;
					let nickname = options.nickName || '';
					let picture = options.avatar || '';
					if (bind == 0) {
						uni.navigateTo({
							url: '../bind/bind?unionid=' + unionid + '&nickname=' + nickname + '&picture=' + picture
						});
					} else {
						uni.setStorageSync('token', res.data.data.token);
						uni.setStorageSync('user_id', res.data.data.user_key_id);
						this.$store.dispatch('getUserInfo');
						uni.navigateBack();
					}
				})
				.catch(err => {
					console.log(err);
					uni.hideLoading();
				});
		},
		// 微信获取基本信息
		bindGetUserInfo(e) {
			this.$showLoading();
			console.log(e);
			let _this = this;
			wx.login({
				success(res) {
					if (res.code) {
						console.log('code:', res);
						_this.code = res.code;
						wx.getUserInfo({
							success: function(res) {
								_this.bindLogin(res);
							},
							fail() {
								uni.hideLoading();
							}
						});
					} else {
						uni.hideLoading();
						console.log('登录失败！' + res.errMsg);
					}
				}
			});
		},
		// 微信登录、注册
		bindLogin(options) {
			this.$api
				.miniLogin({
					code: _this.code,
					iv: options.iv,
					encryptedData: options.encryptedData
				})
				.then(res => {
					uni.hideLoading();
					console.log(res.data);
					if (res.data.code == 0) {
						let bind = res.data.data.binding;
						let unionid = res.data.data.unionId;
						let nickname = options.userInfo.nickName;
						let picture = options.userInfo.avatarUrl;
						if (bind == 0) {
							uni.navigateTo({
								url: '../bind/bind?unionid=' + unionid + '&nickname=' + nickname + '&picture=' + picture
							});
						} else {
							uni.setStorageSync('token', res.data.data.token);
							uni.setStorageSync('user_id', res.data.data.user_key_id);
							this.$store.dispatch('getUserInfo');
							uni.navigateBack();
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: '登录失败，请重新登录'
						});
					}
				})
				.catch(err => {
					console.log(err);
					uni.hideLoading();
				});
		}
	}
};
</script>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
}
.login-img {
	width: 324rpx;
	height: 272rpx;
}
.btn-login {
	width: 80%;
	border-radius: 100rpx;
	background: #1ba218;
	border: none;
}
.alipay {
	background: rgb(22, 120, 255);
	color: #fff;
}
</style>
