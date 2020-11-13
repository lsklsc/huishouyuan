<template>
	<view class="content-wrap">
		<menus></menus>
		<order-list ref='order-list'></order-list>
		<my-task @refreshClick='refreshClick'></my-task>
		<login ref="open"></login>
	</view>
</template>

<script>
	import menus from "./homeChild/menus.vue"
	import login from '@/components/login';
	import orderList from "./homeChild/order-list.vue"
	import myTask from "./homeChild/my-task.vue"
	export default {
		components: {
			login,
			menus,
			orderList,
			myTask
		},
		onLoad(params) {
			let obj = decodeURIComponent(params.q);
			// this.$store.dispatch('getUserInfo');
		},

		data() {
			return {
				page_size: 6
			};
		},
		methods: {
			refreshClick(){
				this.$refs['order-list'].list=[]
				this.$refs['order-list'].loadData('refresh')
			},
			open() {
				// 需要在 popup 组件，指定 ref 为 popup
				this.$refs.open.open();
			},
			menuClick() {
				this.$refs.open.open();
			},
			//下拉刷新
			onPullDownRefresh() {
				console.log('下拉刷新下拉刷新下拉刷新下拉刷新下拉刷新')
				this.$refs['order-list'].loadData('refresh')
			},
			//加载更多
			onReachBottom() {
				console.log('加载更多加载更多加载更多加载更多加载更多')
				this.$refs['order-list'].loadData()
			},
		}
	};
</script>

<style lang="scss">
.content-wrap{
	width: 100%;
	background: #F7F8F9;
}
</style>
