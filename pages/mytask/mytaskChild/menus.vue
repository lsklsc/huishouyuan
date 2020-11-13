<template>
	<view>
		<u-navbar :is-back="false" :background="background">
			<view class="slot-wrap">
				<view class="icon1 iconfont icon-zuojiantou" @click="handelClick"></view>
				<view class="button">我的任务</view>
				<view class="icon2" @click="recordClick">历史记录</view>
			</view>
		</u-navbar>
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
		methods: {
			menuClick() {
				uni.navigateTo({
					url: '../user/user'
				});
			},
			handelClick(){
				uni.navigateBack({
				    delta: 1
				});
			},
			recordClick(){
				uni.navigateTo({
					url: '../record/record'
				});
			}
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
		 color: #FFFFFF;
		.icon1{
			flex: 1;
		}
		.button {
			flex: 1;
			text-align: center;
		}
		
		.icon2 {
			flex: 1;
			text-align: right;
		}
	}
	
</style>
