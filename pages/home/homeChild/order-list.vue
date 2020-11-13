<template>
	<view class="box">
		<view class="list">
			<view class="card" v-for="(item,index) in list" :key="index">
				<view class="top">--分钟内到达</view>
				<view class="content">
					<!-- <image class="icon" :src="img('static/workflow/20200616112125_24.jpg')" mode="aspectFit"></image> -->
					<view class="text">
						<view class="title">上门收运时间：{{item.reservation_date*1000 | momentFormateHMS}}</view>
						<view class="text-bottom">
							<view class="name">{{item.receipt_address_info.address}}</view>
							<!-- <view class="num">5.6公里</view> -->
						</view>
					</view>
				</view>
				<view class="button" @click="handleClick(item.obj_id)">接单</view>
			</view>
		</view>
		<!-- <uni-load-more v-if="!noData" :status="loadingType"></uni-load-more> -->
		<uni-load-more v-if="!noData" :status="loadingType"></uni-load-more>
		<view v-if="noData" style="font-size: 38rpx;text-align: center;color: #999999;line-height: 300rpx;">暂无记录</view>
		<!-- <empty-list v-if="noData" title="暂无记录"></empty-list> -->
	</view>
</template>

<script>
	import utils from '../../../common/utils.js'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import EmptyList from '@/components/EmptyList.vue';
	export default {
		components: {
			uniLoadMore,
			EmptyList
		},
		data() {
			return {
				noData: false,
				loadingType: 'loading', //加载更多状态 more nomore loading
				form: {
					page: 1,
					page_size: 5,
					total: 0,
				},
				list: [],
				userInfo: {}
			}
		},
		filters: {
			momentFormateHMS: utils.momentFormateHMS
		},
		onLoad() {
			// if (!uni.getStorageSync('userInfo')) {
			// 	uni.navigateTo({
			// 		url: '/pages/reg/reg'
			// 	})
			// 	return
			// }
		},

		mounted() {
			// this.userInfo = JSON.parse(uni.getStorageSync('userInfo'));
			// this.$store.commit('login', this.userInfo);
			this.loadData();
		},

		methods: {
			img(pic) {
				return this.$api.img + pic;
			},
			handleClick(obj_id) {
				uni.navigateTo({
					url: '/pages/task-detail/task-detail?obj_id=' + encodeURIComponent(JSON.stringify(obj_id))
				})
			},
			// 加载逻辑
			async loadData(type = 'add') {
				console.log(type)
				//没有更多直接返回
				if (type === 'add') {
					if (this.loadingType === 'nomore') {
						return;
					}
					this.loadingType = 'loading';
				} else {
					this.loadingType = 'more';
					this.form.page = 1;
				}
				// 获取数据
				let data = await this.addData();

				if (type === 'refresh') {
					this.list = [];
				}
				// 合并数组
				this.list = this.list.concat(data);
				// 暂无数据
				if (!this.list.length && this.form.page === 1) {
					this.noData = true;
				} else {
					this.noData = false;
				}
				// 页码+1
				this.form.page++;
				//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
				this.loadingType = this.list.length >= this.form.total ? 'nomore' : 'more';
				// 停止刷新
				// if (type === 'refresh') {
				// 	uni.stopPullDownRefresh();
				// }
				console.log(this.list)
			},
			// 获取数据
			addData() {
				let data ={
					// staff_uuid: this.userInfo.relation_id
					staff_filter_type:30
				}
				Object.assign(data,this.form)
				return this.$api.record(data).then(res => {
					if (res.data.code === 200) {
						this.form.total = res.data.data.count;
						return res.data.data.results;
					}
				})
				.catch(err => {
					console.log(err)
					uni.showToast({
						icon: 'none',
						title: '登录已过期'
					})
					uni.reLaunch({
						duration:3000,
						url: '/pages/reg/reg'
					})
				})
			},

		},
	}
</script>

<style lang="scss">
	.box {
		width: 100%;
		padding: 28rpx;
		box-sizing: border-box;
	}

	.list {
		margin-bottom: 120rpx;
	}

	.card {
		width: 100%;
		height: 352rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
		margin: 28rpx auto;

		.top {
			text-align: right;
			height: 60rpx;
			line-height: 60rpx;
			border-bottom: 1px solid #EFEFEF;
			padding-right: 18rpx;
		}

		.icon {
			width: 144rpx;
			height: 144rpx;
		}

		.content {
			display: flex;
			flex-direction: row;
			padding: 16rpx 18rpx 22rpx 12rpx;

			.text {
				margin-left: 26rpx;
				padding-top: 10rpx;

				.title {
					color: #999999;
				}

				.text-bottom {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					padding-top: 22rpx;

					.name {
						color: #333333;
					}

					.num {
						color: #06C687;
					}
				}
			}
		}
	}

	.button {
		width: 644rpx;
		height: 76rpx;
		background: #06C687;
		border-radius: 12rpx;
		font-size: 14px;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 76rpx;
		text-align: center;
		margin: 0 auto;
	}
</style>
