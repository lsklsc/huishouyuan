<template>
	<view class="task-list">
		<view class="list">
			<view class="card" v-for="(item,index) in list" :key="index">
				<view class="top">
					<view class="top-left">{{item.action_order_type==10?'手动抢单':'系统派单'}}</view>
					<view class="top-right">--分钟内到达</view>
				</view>
				<view class="content">
					<!-- <image class="icon" src="../../../static/img/success.png" mode="aspectFit"></image> -->
					<view class="text">
						<view class="title">上门收运时间：{{item.reservation_date*1000 | momentFormateHMS}}</view>
						<view class="text-bottom">
							<view class="name">{{item.receipt_address_info.address}}</view>
							<!-- <view class="num">5.6</view> -->
						</view>
					</view>
				</view>
				<view class="button" @click="handleClick(item)">{{item.action_state == 20?'到达':'交易中'}}</view>
			</view>
		</view>
		<view style="margin-top: 100rpx;color: #999999;text-align: center;">我的派单是每日必须完成的订单哦</view>
	</view>
</template>

<script>
	import utils from '../../../common/utils.js'
	export default {
		components: {},
		data() {
			return {
				list: [],
				userInfo:JSON.parse(uni.getStorageSync('userInfo')),
				form:{
					page:1,
					page_size:5,
					total: 0,
				}
			}
		},
		filters: {
			momentFormateHMS: utils.momentFormateHMS
		},
		mounted() {
			this.loadData();
		},
		methods: {
			handleClick(item) {
				this.$showLoading()
				// 20已接单 25交易中
				if(item.action_state == 20){
					uni.navigateTo({
						url: '/pages/task-detail/task-detail?obj_id=' + encodeURIComponent(JSON.stringify(item.obj_id))
					})
				}else if(item.action_state == 25){
					uni.navigateTo({
						url: '/pages/task-detail/task-complete?obj_id=' + encodeURIComponent(JSON.stringify(item.obj_id))
					})
				}
			},
			// 获取数据
			addData() {
				this.$showLoading()
				let data ={
					// staff_task_uuid: this.userInfo.relation_id
					staff_filter_type:10
				}
				Object.assign(data,this.form)
				return this.$api.record(data).then(res => {
					if (res.data.code === 200) {
						this.form.total = res.data.data.count;
						return res.data.data.results;
					}
				}).catch(err => {
					console.log(err)
					uni.showToast({
						icon: 'error',
						title: '登录已过期'
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/reg/reg'
						})
					}, 1000)
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
				if (type === 'refresh') {
					uni.stopPullDownRefresh();
				}
				// console.log(this.list)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.task-list {
		width: 750rpx;
		padding: 28rpx;
		height: 100%;
		box-sizing: border-box;
		background: #F7F8F9;

		.list {
			width: 100%;

			.card {
				width: 100%;
				height: 352rpx;
				background: #FFFFFF;
				border-radius: 12rpx;
				margin: 28rpx auto;

				.top {
					display: flex;
					height: 60rpx;
					font-weight: 500;
					line-height: 60rpx;
					border-bottom: 1px solid #EFEFEF;

					.top-left {
						flex: 1;
						text-indent: 20rpx;
					}

					.top-right {
						flex: 1;
						text-align: right;
						padding-right: 20rpx;
					}
				}

				.icon {
					width: 144rpx;
					height: 144rpx;
				}

				.content {
					display: flex;
					flex-direction: row;
					padding: 16rpx 18rpx 22rpx 12rpx;
					box-sizing: border-box;

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

		}
	}
</style>
