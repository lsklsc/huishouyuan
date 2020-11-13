<template>
	<view>
		<menus></menus>
		<taskList ref='order-list'></taskList>
	</view>
</template>

<script>
	import menus from "./mytaskChild/menus.vue"
	import taskList from "./mytaskChild/taskList.vue"
	export default {
		components: {
			menus,
			taskList
		},
		data() {
			return {

			};
		},
		methods: {
			//下拉刷新
			onPullDownRefresh() {
				// console.log('下拉刷新下拉刷新下拉刷新下拉刷新下拉刷新')
				this.$refs['order-list'].loadData('refresh')
			},
			//加载更多
			onReachBottom() {
				// console.log('加载更多加载更多加载更多加载更多加载更多')
				this.$refs['order-list'].loadData()
			},
		}

	}
</script>

<style lang="scss">

</style>
