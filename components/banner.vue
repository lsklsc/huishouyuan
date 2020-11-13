<template>
	<view class="my-swiper my-center">
		<swiper class="swiper my-center" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item, index) in list" :key="index">
				<view class="swiper-item my-center"><image :src="item" mode="aspectFill"></image></view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {
			indicatorDots: false,
			autoplay: false,
			interval: 2000,
			duration: 500
		};
	},
	props: {
		list: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.my-swiper {
	margin-top: 28rpx;
}
.swiper {
	width: 690rpx;
	height: 260rpx;
	.swiper-item {
		width: 100%;
		height: 100%;
	}
	image {
		width: 100%;
		height: 100%;
	}
}
</style>
