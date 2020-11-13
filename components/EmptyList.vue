<template>
	<view v-if="show" class="show">
		<view class="iconfont">&#xe61f;</view>
		<view class="empty">{{ title }}</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		title: {
			type: String,
			default: '空空如也'
		},
		show: {
			type:Boolean,
			default: true
		}
	}
};
</script>

<style lang="scss">
.show {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 200rpx 0;
	color: #666;
	.iconfont {
		font-size: 200rpx;
	}
	.empty {
		font-size: 35rpx;
	}
}
</style>
