<template>
	<view class="empty" v-if="show">暂无记录</view>
</template>

<script>
export default {
	data() {
		return {
			initList: this.list
		};
	},
	props: ['list'],
	computed: {
		show() {
			return this.list.length ? false : true;
		}
	},
	watch: {
		// list(val) {
		// 	console.log(val);
		// 	this.initList = val;
		// }
	},
	methods: {}
};
</script>

<style>
.empty {
	display: flex;
	justify-content: center;
	padding: 20rpx 0;
	font-size: 26rpx;
	color: #aaa;
}
</style>
