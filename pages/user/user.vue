<template>
	<view class="user">
		<view class="user-wrap">
			<!-- 个人信息 -->
			<view class="user-info">
				<view class="user-left">
					<view class="user-img">
						<image src="../../static/img/user/avatar.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="user-right">
					<view class="user-name">{{userInfo.username}}</view>
					<view class="user-ionpe"></view>
				</view>
			</view>
			<!-- 订单量 -->
			<view class="cart-wrap">
				<view class="cart-top">
					<view class="cart-title">本周成就</view>
					<view class="cart-detail">了解更多>></view>
				</view>
				<view class="order-wrap">
					<view class="order-left">
						<view class="order-num"></view>
						<view class="order-name">完成单量</view>
					</view>
					<view class="order-left">
						<view class="order-num"></view>
						<view class="order-name">成交金额</view>
					</view>
				</view>
			</view>
		</view>

		<!-- menu菜单 -->
		<view class="menu-wrap">
			<view class="menu-item" v-for="(item,index) in menus" :key="index" @click="handleMenu(item)">
				<image :src="item.img" mode="aspectFit" class="img"></image>
				<view class="menu-name">
					<view class="title">{{item.title}}</view>
				</view>
				<view class="iconImg">
					<image :src="item.icon" mode="aspectFit" class="icon"></image>
				</view>
			</view>
		</view>

		<view class="btns" @click="deletLogin">退出登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// menus: [{
				// 	url: "../userInfo/userInfo1.vue",
				// 	icon: '../../static/newsimg/Rectangle.png',
				// 	title: '个人信息',
				// 	img:"../../static/newsimg/user.png"
				// }]
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo;
			}
		},
		mounted() {},
		methods: {
			deletLogin() {
				this.$store.dispatch('logoutAction');
				uni.showModal({
					title: '提示',
					content: '确认退出',
					success: function(res) {
						if (res.confirm) {
							uni.reLaunch({
								url: "../reg/reg"
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			handleMenu(item) {
				uni.navigateTo({
					url: "../userInfo/userInfo1"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btns {
		width: 626rpx;
		height: 78rpx;
		background: #05B877;
		border-radius: 12rpx;
		position: absolute;
		bottom: 50rpx;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		line-height: 78rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}

	.user-wrap {
		width: 750rpx;
		height: 360rpx;
		background: #00CC7B;
		padding: 46rpx;
		box-sizing: border-box;
		position: relative;

		.user-info {
			display: flex;
			position: relative;

			.user-left {
				.user-img {
					width: 144rpx;
					height: 144rpx;
					border-radius: 50%;

					&>image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.user-right {
				font-size: 36rpx;
				padding-left: 20rpx;
				color: #FFFFFF;

				.user-name {
					padding-top: 23rpx;
				}

				.user-ionpe {
					font-size: 26rpx;
				}
			}
		}

		.cart-wrap {
			width: 660rpx;
			height: 220rpx;
			background: linear-gradient(139deg, #FFE67A 0%, #FFD727 100%);
			border-radius: 5px;
			position: absolute;
			top: 220rpx;
			left: 50%;
			transform: translateX(-50%);

			.cart-top {
				display: flex;
				font-size: 32rpx;
				color: #512C0B;
				padding: 8rpx 0;
				border-bottom: 1rpx solid #512C0B;

				.cart-title {
					flex: 1;
					text-indent: 20rpx;
					font-weight: 800;
				}

				.cart-detail {
					flex: 1;
					text-align: right;
					padding-right: 20rpx;
					font-size: 24rpx;
					box-sizing: border-box;
				}
			}

			.order-wrap {
				display: flex;
				padding-top: 20rpx;
				box-sizing: border-box;

				.order-left {
					text-align: center;
					flex: 1;
					color: #512C0B;

					.order-num {
						font-weight: bold;
						font-size: 60rpx;
						line-height: 60rpx;
					}

					.order-name {
						font-size: 26rpx;
					}
				}
			}

		}

	}

	.menu-wrap {
		margin-top: 120rpx;

		.menu-item {
			display: flex;
			align-items: center;
			padding: 0 36rpx;

			.img {
				width: 40rpx;
				height: 40rpx;
			}

			.menu-name {
				flex: 1;
				text-indent: 20rpx;
			}

			.iconImg {
				text-align: right;
				flex: 1;

				.icon {
					width: 20rpx;
					height: 20rpx;
				}
			}

		}
	}
</style>
