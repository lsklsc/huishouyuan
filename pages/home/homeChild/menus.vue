<template>
	<view>
		<view>
			<u-navbar :is-back="false" :background="background">
				<view class="slot-wrap">
					<view class="iconfont icon-cebianlandanchu" style="color: #FFFFFF;" @click="menuClick"></view>
					<view class="button">收工</view>
					<view class="icon2">
						<image src="../../../static/img/msg.png" mode="aspectFit"></image>
					</view>
				</view>
			</u-navbar>
		</view>

		<!-- <view class="menu">
			<view @click="menuClick">
				<view class="iconfont icon-cebianlandanchu" style="color: #FFFFFF;"></view>
			</view>
			<view class="button">收工</view>
			<image class="icon2" src="../../../static/img/msg.png" mode="aspectFit"></image>
		</view> -->
	</view>
</template>

<script>
	import login from '@/components/login';
	export default {
		components: {},
		data() {
			return {
				background: {
					backgroundColor: '#00CC7B',
					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',
					// 渐变色
					// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				}
			};
		},
		computed: {
			hasLogin() {
				return this.$store.state.hasLogin;
			},
			userInfo() {
				return this.$store.state.userInfo;
			}
		},
		methods: {
			menuClick() {
				uni.navigateTo({
					url: '../user/user'
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		 flex: 1; 
		/* 如果您想让slot内容与导航栏左右有空隙 */
		 padding: 0 30rpx;
		.icon-cebianlandanchu{
			flex: 1;
		}
		.button {
			width: 212rpx;
			height: 68rpx;
			line-height: 68rpx;
			background: #E7FFF7;
			border-radius: 5px;
			color: #04C485;
			flex: 1;
			text-align: center;
		}
		
		.icon2 {
			flex: 1;
			text-align: right;
			&>image{
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
</style>
