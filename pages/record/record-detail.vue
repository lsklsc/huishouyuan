<template>
	<view class="content" v-if='info'>
		<!-- 预约时间 -->
		<view class="list-wrap">
			<view class="list">
				<view class="list-item">
					<view class="item-left">预约时间</view>
					<view class="item-right">{{info.reservation_date*1000 | momentFormateHMS}}</view>
				</view>
				<view class="list-item">
					<view class="item-left">联系人</view>
					<view class="item-right">{{info.receipt_address_info.name}}</view>
				</view>
				<view class="list-item">
					<view class="item-left">手机号</view>
					<view class="item-right">{{info.receipt_address_info.phone}}</view>
				</view>
				<view class="list-item">
					<view class="item-left">地址</view>
					<view class="item-right">{{info.receipt_address_info.address}}</view>
				</view>
			</view>
		</view>
		<!-- 垃圾类型 -->
		<view class="list-wrap">
			<view class="list">
				<view class="list-item">
					<view class="item-left">垃圾类型</view>
					<view class="item-right">{{info.rubbish_name}}</view>
				</view>
				<view class="list-item">
					<view class="item-left">详细</view>
					<view class="item-right">{{info.company_rubbish_price_name}}</view>
				</view>
				<view class="list-item">
					<view class="item-left">重量</view>
					<view class="item-right">{{info.weight/1000 || 0}}kg</view>
				</view>
				<view class="list-item">
					<view class="item-left">出售价格</view>
					<view class="item-right">{{info.money/1000 || 0}}元</view>
				</view>
				<view class="list-item" style="border-bottom: none;">
					<view class="">
						<view>上传照片</view>
						<view class="imgs" v-for="(i,index) in imgs" :key='index' style="width: 100%;display: flex;">
							<view class="imgitem" style="width: 164rpx;height: 164rpx;">
								<image :src="i" :data-src="imgs" @tap="previewImage" mode="widthFix" style="width: 100%;height: 100%;"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import utils from '../../common/utils.js'
	// 	import robbyImageUpload from '../../components/robby-image-upload/robby-image-upload.vue'
	export default {
		data() {
			return {
				info: null,
				imgs: []
			}
		},
		filters: {
			momentFormateHMS: utils.momentFormateHMS
		},
		onLoad(option) {
			let obj_id = JSON.parse(decodeURIComponent(option.obj_id));
			this.getDetail(obj_id)
		},
		methods: {
			previewImage(e) {
				let url = e.target.dataset.src
				uni.previewImage({
					current: url,
					urls: this.imgs
				})
			},
			// img(pic) {
			// 	return this.$api.img + pic;
			// },
			getDetail(id) {
				this.$showLoading();
				this.$api.detail(id, {}).then(res => {
					if (res.data.code == 200) {
						this.info = res.data.data;
						let dataImg = []
						dataImg = res.data.data.image.split(',')
						if(dataImg.length){
							this.imgs = dataImg.map(i => {
								return this.$api.img + i
							})
						}
					}
				});
			},
		},


	}
</script>

<style lang="scss" scoped>
	

	.content {
		width: 100%;
		background: #F7F8F9;

		.list-wrap {
			padding: 24rpx;
			box-sizing: border-box;

			.list {
				width: 100%;
				padding: 10rpx 0;
				background: #FFFFFF;
				border-radius: 12px;

				.list-item {
					padding: 20rpx 20rpx;
					box-sizing: border-box;
					display: flex;
					color: #333333;
					font-size: 28rpx;
					border-bottom: 1rpx solid #EFEFEF;
					
					.item-left {
						flex: 1;
						text-indent: 6rpx;
					}

					.item-right {
						flex: 1;
						text-align: right;
					}
				}
			}
		}




		.detail-top {
			width: 100%;
			height: 92rpx;
			background: #FFFFFF;
			padding: 0 30rpx;
			box-sizing: border-box;
			display: flex;

			.title {
				flex: 1;
				line-height: 92rpx;
				font-weight: 400;
			}

			.pingjia {
				flex: 1;
				background-color: #FFFFFF;
				color: #FFFFFF;

				.pj {
					width: 146rpx;
					height: 58rpx;
					background: #05C586;
					float: right;
					border-radius: 28rpx;
					margin-top: 20rpx;
					text-align: center;
					line-height: 58rpx;
				}
			}
		}

	}
</style>
