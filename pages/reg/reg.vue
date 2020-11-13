<template>
	<view class="content">
		<view class="login">
			<image src="../../static/newsimg/loginbanner.png" mode="widthFix"></image>
			<view class="titles">回收人员端</view>
			<view class="input-wrap">
				<view class="input-account">
					<!-- <text class="title">账号：</text> -->
					<input type="text" v-model="account" placeholder="请输入账号" />
				</view>
				<view class="input-password">
					<!-- <text class="title">密码：</text> -->
					<input type="password" v-model="password" placeholder="请输入密码" />
				</view>
			</view>
			<view class="loginBtn" @click="register">登录</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';

	export default {
		components: {},
		data() {
			return {
				account: '',
				password: '',
			}
		},
		mounted() {

		},
		methods: {
			register() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 */
				// if (this.account.length < 5) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '账号最短为 5 个字符'
				// 	});
				// 	return;
				// }
				// if (this.password.length < 6) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '密码最短为 6 个字符'
				// 	});
				// 	return;
				// }
				let data = {
					username: this.account,
					password: this.password,
				}
				this.$showLoading()
				this.$api.loginUser(data)
					.then(res => {
						if (res.data.code == 200) {
							uni.setStorageSync('token', res.data.data.token_data.token);
							uni.setStorageSync('userInfo', JSON.stringify(res.data.data));
							this.$store.commit('login', res.data.data);
							uni.navigateTo({
								url: "../home/home"
							})
						} else {
							uni.showToast({
								title: "账号或密码错误",
								icon: "none"
							})
						}
					})
					.catch(err => {
						uni.showToast({
							title: "登录失败",
							icon: "none"
						})
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		overflow: hidden;

		.login {
			&>image {
				width: 614rpx;
				height: 348rpx;
				display: block;
				margin: auto;
			}

			.titles {
				color: #203152;
				font-size: 52rpx;
				font-weight: 500;
				text-align: center;
			}

			.input-wrap {
				padding: 30rpx 100rpx;
				box-sizing: border-box;

				input {
					padding-left: 46rpx;
					box-sizing: border-box;
					width: 562rpx;
					height: 90rpx;
					border-radius: 400rpx;
					border: 1rpx solid #D8D8D8;

				}

				.input-account {
					display: flex;
				}

				.input-password {
					display: flex;
					margin-top: 30rpx;
				}
			}

			.loginBtn {
				width: 562rpx;
				height: 90rpx;
				margin: 56rpx auto;
				color: #FFFFFF;
				text-align: center;
				font-size: 28rpx;
				background: #06C687;
				box-shadow: 0px 12rpx 30rpx 0rpx rgba(6, 198, 135, 0.18);
				border-radius: 400rpx;
				line-height: 90rpx;

			}
		}
	}
</style>
