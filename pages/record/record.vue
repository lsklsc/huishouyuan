<template>
	<view class="record">
		<!-- <view class="record-top">
			<view class="left" @click="showPop">
				<view class="riqi"><text class="iconfont icon-rili"></text>请选择日期</view>
			</view>
			<view class="right">
				<view class="money">现金<text class="iconfont"></text></view>
			</view>
		</view> -->
		<view class="item-wrap">
			<!-- 交易成功 -->
			<view class="item" v-for="(item,index) in listItem" @click="itemDetail(item)">
				<view class="item-left">
					<view class="img">
						<image src="../../static/img/user/avatar.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="item-right">
					<view class="name">
						<view class="name-title">{{item.receipt_address_info.name}}</view>
						<view class="cg" :style="item.action_state==40?'color:#FF0000':item.action_state==30?'color:#FF9900':'color:#05C686'">
							{{item.action_state==40?'交易失败':item.action_state==30?'取消交易':'交易成功'}}
							<!-- {{item.action_state | stateName}} -->
						</view>
					</view>
					<view class="times">上门收运时间：{{item.reservation_date*1000 | momentFormateHMS}}</view>
					<view class="address">{{item.receipt_address_info.address}}</view>
				</view>
				<view class="iconfont icon-zuojiantou icons"></view>
			</view>
			
			<!-- 交易失败 -->
			<!-- <view class="item">
				<view class="item-left">
					<view class="img"><image src="../../static/img/user/avatar.png" mode="aspectFill"></image></view>
				</view>
				<view class="item-right">
					<view class="name">
						<view class="name-title">刘书坤</view>
						<view class="cg quxiao">交易失败</view>
					</view>
					<view class="times">上门收运时间：2020年9月13日 12:00</view>
					<view class="address">北京市通州区玉桥北里</view>
				</view>
				<view class="iconfont icon-zuojiantou icons"></view>
			</view> -->

			<!-- 取消交易 -->
			<!-- <view class="item">
				<view class="item-left">
					<view class="img"><image src="../../static/img/user/avatar.png" mode="aspectFill"></image></view>
				</view>
				<view class="item-right">
					<view class="name">
						<view class="name-title">刘书坤</view>
						<view class="cg quxiao">取消交易</view>
					</view>
					<view class="times">上门收运时间：2020年9月13日 12:00</view>
					<view class="address">北京市通州区玉桥北里</view>
				</view>
				<view class="iconfont icon-zuojiantou icons"></view>
			</view> -->
			
		</view>
		<view class="isShow" v-if="listItem.length == 0">
			暂无记录
		</view>
		<!-- 日历 -->
		<min-popup heightSize="500" :show="show" @close='close'>
			<min-picker :endTime="endTime" :startTime="startTimes" @cancel="cancel" @sure="sure">
			</min-picker>
		</min-popup>
	</view>
</template>

<script>
	import utils from '../../common/utils.js'
	import minPicker from "../../components/min-picker/min-picker.vue"
	import minPopup from "../../components/min-picker/min-popup.vue"
	export default {
		components: {
			minPopup,
			minPicker
		},
		data() {
			return {
				listItem: [],
				userInfo: JSON.parse(uni.getStorageSync('userInfo')),
				startTimes: [2010, 6, 1],
				endTime: 2046,
				show: false,
				params:{
	　　　　　　　　page:1,
	　　　　　　　　num:10,
	　　　　　　},
				count:'',
				totlePage:'',
				showTxt:'',
			}
		},
		onLoad() {
			this.itemList()
		},
		filters: {
			momentFormateHMS: utils.momentFormateHMS
		},
		methods: {
			confirm(e) {
				console.log(e);
			},
			itemList(){
				let data = {
					// staff_history_uuid: this.userInfo.relation_id,
					staff_filter_type:20,
					page: this.params.page,
					num: this.params.num,
				}
				this.$showLoading()
				this.$api.record(data).then(res => {
					this.count = res.data.data.count;
					// console.log(this.count)
					this.listItem = this.listItem.concat(res.data.data.results)
				})
			},	
			fenye(){
				this.totlePage = Math.ceil(this.count / this.params.num);
				if(this.params.page >= this.totlePage){
					this.showTxt = '加载完成';
					return;
				}
				this.showTxt = '加载中...';
				this.params.page ++;
				this.itemList()
			},
			
			itemDetail(item) {
				uni.navigateTo({
					url: '/pages/record/record-detail?obj_id=' + encodeURIComponent(JSON.stringify(item.obj_id))
				})
			},
			
			// 取消事件
			cancel() {
				this.close()
			},
			// 确认事件
			sure(e) {
				console.log(e)
				// 输出 { year: 2020,month: 3,day: 23}
			},
			// picker显示
			showPop() {
				this.show = true
			},
			// 关闭picker
			close() {
				this.show = false
			}
		},
		//加载更多
		onReachBottom() {
			this.fenye()
		},
	}
</script>

<style lang="scss" scoped>
	.record {
		width: 100%;
		background: #F7F8F9;
		.isShow{
			text-align: center;
			line-height: 300rpx;
			font-size: 36rpx;
			color: #888888;
		}
		.record-top {
			width: 100%;
			height: 90rpx;
			background: #FFFFFF;
			display: flex;
			text-align: center;
			line-height: 90rpx;
			color: #333333;

			.left {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;

				.riqi {
					font-size: 24rpx;
					color: #333333;
					width: 202rpx;
					height: 54rpx;
					background: #F0F0F0;
					border-radius: 4rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}

			.right {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;

				.money {
					width: 154rpx;
					height: 54rpx;
					background: #F0F0F0;
					border-radius: 4rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}

		.item-wrap {
			padding: 0 28rpx;
			box-sizing: border-box;

			.item {
				width: 100%;
				height: 214rpx;
				background-color: #FFFFFF;
				margin: 29rpx 0;
				padding: 22rpx 20rpx;
				box-sizing: border-box;
				display: flex;

				.item-left {
					display: flex;
					align-items: center;
					justify-content: center;

					.img {
						width: 110rpx;
						height: 110rpx;
						border-radius: 50%;

						&>image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
				}

				.item-right {
					padding-left: 16rpx;
					flex: 2;
					box-sizing: border-box;

					.name {
						display: flex;
						color: #333333;
						font-size: 28rpx;

						.name-title {
							flex: 1;
						}

						.cg {
							flex: 1;
							text-align: right;
							color: #05C686;
						}

						.quxiao {
							color: red;
						}
					}

					.times {}

					.address {}
				}

				.icons {
					font-size: 20rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					transform: rotate(180deg);
					font-weight: bold;
					padding-right: 10rpx;
					box-sizing: border-box;
				}
			}

		}


	}
</style>
