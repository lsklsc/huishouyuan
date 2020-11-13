<template>
	<view class="box">
		<view class="botton" @click="refreshClick">
			<image class="icon" src="../../../static/img/icon/refresh.png" mode="aspectFit"></image>
			刷新列表
		</view>
		<view class="task" @click="menuClick">
			<image class="icon" src="../../../static/img/icon/task.png" mode="aspectFit"></image>
			<view class="text">我的任务</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onShow() {
		},
		created() {
		},
		methods:{
			menuClick() {
				uni.navigateTo({
					url: '../mytask/mytask'
				});
			},
			refreshClick(){
				this.$showLoading("正在刷新中...");
				this.$emit('refreshClick')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 110rpx;
		background: #FFFFFF;
		box-shadow: 0px -2px 12px 0px rgba(0, 0, 0, 0.08);
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		.botton{
			width: 552rpx;
			height: 78rpx;
			background: #06C687;
			border-radius: 12rpx;
			text-align: center;
			line-height: 78rpx;
			color: #FFFFFF;
			.icon{
				vertical-align: middle;
				width: 36rpx;
				height: 32rpx;
				padding-right: 4rpx;
			}
		}
		.task{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.icon{
				width: 52rpx;
				height: 50rpx;
			}
			.text{
				color: #333333;
			}
		}
	}

</style>
