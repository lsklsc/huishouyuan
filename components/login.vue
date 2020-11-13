<template>
	<uni-popup ref="popup" type="center">
		<view class="login-box">
			<view class="title">您还未登录</view>
			<view class="login-content">请先登录开启您的环保之旅吧</view>
			<image src="/static/img/login/login.png" mode="aspectFill" class="login-img"></image>
			<view class="login-btn">
				<button class="btn btn1" hover-class="hover-class hover-class1" @click="close">暂不登录</button>
				<button class="btn btn2" hover-class="hover-class hover-class2" @click="login">立即登录</button>
				<!-- <button class="btn btn2" hover-class="hover-class hover-class2" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">立即登录</button> -->
			</view>
		</view>
	</uni-popup>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: { uniPopup },
	data() {
		return {
			
		};
	},
	onLoad() {},
	onReady() {
	},
	methods: {
		open() {
			// 需要在 popup 组件，指定 ref 为 popup
			this.$refs.popup.open();
		},
		close(){
			this.$refs.popup.close();
		},
		login(){
			let _this=this;
			uni.navigateTo({
				url: '../login/login',
				success() {
					_this.close();
				}
			});
		},
		// 暂时不用
		bindGetUserInfo(e) {
			this.$showLoading();
			console.log(e);
			let _this=this;
			wx.login({
				success(res) {
					if (res.code) {
						console.log(res);
						wx.getUserInfo({
							success: function(res) {
								console.log(res);
								_this.$refs.popup.close();
								uni.hideLoading()
							}
						});
					} else {
						uni.hideLoading()
						console.log('登录失败！' + res.errMsg);
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.login-box {
	width: 500rpx;
	// height: 600rpx;
	background: #fff;
	border-radius: 10rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 50rpx 0;
	.title {
		font-size: 40rpx;
		color: #333;
		font-weight: bold;
	}
	.login-content {
		font-size: 27rpx;
		color: #999;
	}
	.login-img {
		width: 324rpx;
		height: 272rpx;
		margin-top: 55rpx;
	}
	.login-btn {
		display: flex;
		margin: 50rpx 0 20rpx;
		width: 100%;
		justify-content: space-evenly;
		.btn {
			width: 200rpx;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 30rpx;
			border-radius: 35rpx;
			text-align: center;
		}
		.btn1 {
			border: 1px solid #c2c2c2;
			color: #c2c2c2;
			background: #fff;
		}
		.btn2 {
			background: #00d882;
			color: #fff;
		}
		.btn::after {
			border: none;
		}
	}
}
</style>
