<template>
	<view class="map-box" v-if="orderInfo">
		<menus></menus>
		<view class="map">
			<map :latitude="latitude" :longitude="longitude" :scale="scale">
				<cover-image class="dhImg" @click="dhBtn" src="../../static/newsimg/daohang.png"></cover-image>
			</map>
		</view>
		<view class="detail"> <!-- :class="isShow?'transfrom':'istransfrom'" @click="isShow=!isShow" -->
			<!-- <view class="triangle" :class="isShow?'triangle':'istriangle'" @click="isShow=!isShow"></view> -->
			<!-- <view class="time">预约时间：60分钟内到达</view> -->
			<view class="time-detail">
				<view class="">预约时间：{{orderInfo.reservation_date*1000 | momentFormateHMS}}</view>
				<view class="">联系人：{{orderInfo.receipt_address_info.name}}</view>
				<view class="">手机号：{{orderInfo.receipt_address_info.phone}}</view>
				<view class="">地址：{{orderInfo.receipt_address_info.address}}</view>
				<view class="">订单号：{{orderInfo.obj_id}}</view>
			</view>
			<view class="category">垃圾类型：{{orderInfo.rubbish_name}}</view>
		</view>
		<view class="bottomBtn">
			<view class="detailBtn" v-if='orderInfo.action_state ==10' @click="orderBtn(20)">立即接单</view>
			<view class="detailBtn" v-if='orderInfo.action_state ==20' @click="orderBtn(25)">到达</view>
		</view>
	</view>
</template>

<script>
	import menus from "./menus/menu.vue"
	import utils from '../../common/utils.js'
	export default {
		components:{menus},
		data() {
			return {
				isShow: false,
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.9,
				longitude: 116.396,
				scale: 18,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../static/img/userHL.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '../../static/img/userHL.png'
				}],
				detailList: [],
				orderInfo: null,
				obj_id: '',
				rubbishList: [],
				form: {

				}

			};
		},
		filters: {
			momentFormateHMS: utils.momentFormateHMS
		},
		onLoad(option) {
			if (option.obj_id) {
				this.obj_id = JSON.parse(decodeURIComponent(option.obj_id));
				this.detail(this.obj_id)
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo;
			}
		},
		methods: {
			// 选择垃圾类型
			garbageType() {
				let _this = this;
				let arr = this.rubbishList.map(o => {
					return o.name
				})
				uni.showActionSheet({
					itemList: arr,
					success: function(res) {
						let index = res.tapIndex;
						console.log(index)
						_this.form.rubbish_type_name = _this.rubbishList[index].name;
						_this.form.rubbish_uuid = _this.rubbishList[index].uuid;
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			//获取垃圾分类列表
			getRubbishList() {
				let data = {
					// 需要后台审核
					company_uuid:this.orderInfo.company_uuid,
					rubbish_uuid:this.orderInfo.rubbish_uuid
				}
				this.$api.rubbishList(data).then(res => {
					this.rubbishList = res.data.data
					console.log(this.rubbishList)
				})
			},
			orderBtn(val) {
				this.orderInfo.action_state = val
				this.orderInfo.personnel_uuid = this.userInfo.relation_id
				this.orderInfo.action_order_type = 10
				this.$showLoading()
				this.$api.editOrder(this.orderInfo.obj_id, this.orderInfo).then(res => {
					this.$showLoading()
					if (res.data.code == 200) {
						uni.showToast({
							title: val == 20 ? "接单成功" : '到达成功',
							icon: "success",
						})
						if (val== 20) {
							this.detail(this.obj_id)
							// uni.navigateBack()
						} else {
							this.$showLoading() 
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/task-detail/task-complete?obj_id=' + encodeURIComponent(JSON.stringify(this.obj_id))
								})
							}, 500)
						}
					}
					else{
						uni.showToast({
							duration:3000,
							title:res.data.msg,
							icon:"none"
						})
						setTimeout(() => {
							uni.navigateTo({
								url:'/pages/home/home'
							})
						}, 2000)
					}
				});
			},
			//列表详情
			detail(obj_id) {
				this.$showLoading()
				console.log(obj_id)
				this.$api.detail(obj_id, {}).then(res => {
					this.orderInfo = res.data.data
					console.log(this.orderInfo)
					if(res.data.data.action_state == 30){
						uni.showToast({
							duration:3500,
							title:"该订单用户已撤销",
							icon:"none"
						})
						setTimeout(() => {
							uni.reLaunch({
							    url:'/pages/home/home'
							}); 
						},2000)
					}
					this.getRubbishList()
				})
			},

			dhBtn() {//调用高德地图
				var packageName = 'com.autonavi.minimap';
				var main = plus.android.runtimeMainActivity();
				var packageManager = main.getPackageManager();
				var PackageManager = plus.android.importClass(packageManager)
				var packageInfo = packageManager.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES);
				if (packageInfo) {
					var Uri = plus.android.importClass("android.net.Uri");
					var url = "amapuri://route/plan?sourceApplication=maxuslife" +
						"&sid=A&slat=36.702558&slon=116.876678&sname=起始地点" +
						"&did=B&dlat=36.649415&dlon=117.122497&dname=结束地点&dev=0&t=0";
					var Intent = plus.android.importClass('android.content.Intent');
					var intent = new Intent();
					intent.setAction(Intent.ACTION_VIEW);
					intent.addCategory(Intent.CATEGORY_DEFAULT);
					var uri = Uri.parse(url);
					//将功能Scheme以URI的方式传入data  
					intent.setData(uri);
					intent.setPackage("com.autonavi.minimap");
					var main = plus.android.runtimeMainActivity();
					main.startActivity(intent);
				} else {
					// alert('未安装' + packageName + '')
					uni.showToast({
						title: '目前导航暂只支持高德地图',
						icon:"none",
						duration:3000
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.map-box {
		width: 100%;
		position: relative;
		overflow: hidden;
		.map {
			width: 100%;
			height: 500rpx;
			map{ 
				width: 100%;
				height: 500rpx;
			}
			.dhImg {
				width: 138rpx;
				height: 66rpx;
				position: absolute;
				top: 400rpx;
				left: 30rpx;
			}
		}

		

		.detail {
			padding-top: 30rpx;
			z-index: 2;
			position: absolute;
			bottom: 0;
			width: 100%;
			background: #FFFFFF;
			border-radius: 16px 16px 0px 0px;
			height: 1130rpx;
			color: #333333;
			font-size: 28rpx;
			transform: translateY(40%);

			.time {
				color: #333333;
				font-weight: bold;
				text-indent: 30rpx;
				font-size: 32rpx;
				// border-bottom: 1rpx solid #CCCCCC;
				line-height: 90rpx;
			}

			.time-detail {
				text-indent: 30rpx;
				margin-top: 20rpx;
				line-height: 60rpx;
				border-bottom: 1rpx solid #CCCCCC;
				padding-bottom: 20rpx;
			}
		}

		.category {
			text-indent: 30rpx;
			margin-top: 22rpx;

		}

		.bottomBtn {
			position: absolute;
			bottom: 0;
			z-index: 3;
			height: 160rpx;
			width: 100%;
			display: flex;
			align-items: center;
			background-color: #FFFFFF;

			.detailBtn {
				width: 624rpx;
				height: 76rpx;
				background: #06C687;
				border-radius: 6px;
				margin: 0 auto;
				text-align: center;
				color: #FFFFFF;
				margin: auto;
				line-height: 76rpx;
			}
		}

		.transfrom {
			transform: translateY(0%);
			transition: 0.6s;
		}

		.istransfrom {
			transform: translateY(40%);
			transition: 0.6s;
		}

		.triangle {
			width: 0;
			height: 0;
			border: 15rpx solid transparent;
			border-top-color: #CCCCCC;
			transform: rotate(0deg);
			transition: 0.6s;
			margin: auto;
			position: relative;
		}

		.triangle:after {
			content: "";
			width: 90rpx;
			height: 7rpx;
			border-radius: 8rpx;
			background-color: red;
			position: absolute;
			bottom: -13rpx;
			margin-left: -45rpx;
			background-color: #CCCCCC;
		}

		.istriangle {
			transform: rotate(-180deg);
			transition: 0.6s;
		}
	}

	.buttonBox {
		display: flex;
		justify-content: space-around;
		width: 100%;

		.button {
			width: 286rpx;
			height: 76rpx;
			line-height: 76rpx;
			text-align: center;
			border-radius: 6px;
			color: #fff;
			font-weight: 500;
		}

		.success {
			background: #06C687;
		}

		.error {
			background: #FF361E;
		}
	}
</style>
