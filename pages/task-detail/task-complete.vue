<template>
	<view class="map-box" v-if='orderInfo'>
		<view class="detail">
			<!-- <view class="time">预约时间：分钟内到达</view> -->
			<view class="time-detail" style="line-height: 180rpx;">
				<view class="">预约时间：{{orderInfo.reservation_date*1000 | momentFormateHMS }}</view>
				<view class="">联系人：{{orderInfo.receipt_address_info.name}}</view>
				<view class="">手机号：{{orderInfo.receipt_address_info.phone}}</view>
				<view class="">地址：{{orderInfo.receipt_address_info.address}}</view>
				<view class="">订单号：{{orderInfo.obj_id}}</view>
			</view>
			<view class="category">垃圾类型：{{orderInfo.rubbish_name}}</view>
			<view class="xiangxi">
				<view class="category">详细：</view>
				<input type="text" placeholder='请选择详细' @click="garbageType" v-model="form.company_rubbish_price_name" disabled>
				<!-- <view class="borders">
					<picker @change="bindPickerChange" :value="rubbishIndex" :range="rubbishList" range-key="name" >
						<view style="width: 400rpx;line-height: 1;color: #222222;" class="uni-input">
							{{rubbishList[rubbishIndex].name || '点击选择详细'}}
						</view>
					</picker>
				</view> -->
			</view>
			<view class="xiangxi">
				<view class="category">重量：</view>
				<input type="text" v-model='form.weight' placeholder="请填写重量/kg" 
				@input="form.weight=/^\d+\.?\d{0,3}$/.test(form.weight)?form.weight:''"
				/>
				<text style="padding-left: 18rpx;color: #888888;padding-top: 15rpx;">kg</text>
			</view>
			<view class="xiangxi">
				<view class="category">价格：</view>
				<input type="text" v-model='form.money' placeholder="请填写价格/元"
				 @input="form.money=/^\d+\.?\d{0,3}$/.test(form.money)?form.money: ''"
				/>
				<text style="padding-left: 18rpx;color: #888888;padding-top: 15rpx;">元</text>
			</view>

			<view class="paizhao">
				<view class="paizhao-left">拍照上传</view>
				<view class="paizhao-right">
					<view class="shangchuan">将回收物品拍照上传</view>
					<view class="paizhao-img">
						<image src="../../static/img/paizhao.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view style="margin-left: 20rpx;margin-top: 35rpx;">
				<robby-image-upload
					v-model="imageData"
					@delete="deleteImage"
					@add="addImage"
					:limit="limitNumber"
					:server-url="serverUrl"
					:file-key-name="fileKeyName"
					:form-data="formData"
				></robby-image-upload>
			</view>
		</view>

		<!-- 交易失败原因弹窗 -->
		<view class="mask" v-if="isShow">
			<view class="mask-content">
				<view class="cont-top">
					<view class="cont-left">失败原因</view>
					<view class="cont-right" @click="getReason">
						{{reasonData.describe_info?reasonData.describe_info:"请选择失败原因"}}
						<!-- <view style="color: #888;" class="uni-input">
							<picker @change="resonPickerChange" :value="reasonIndex" :range="reasonList" range-key="describe_info">
								{{reasonList[reasonIndex].describe_info || '请选择失败原因'}}
							</picker>
						</view> -->
						<text style="margin-left: 6rpx;">></text>
					</view>
				</view>
				<textarea v-model="reasonData.note" placeholder="请填写失败原因" />
				<view class="cont-btn">
					<view class="btn1 btn" @click="isShow=false">取消</view>
					<view class="btn2 btn" @click="handelClick">确定</view>
				</view>
			</view>
		</view>

		<view class="bottomBtn" >
			<view class="buttonBox">
				<view class="button success" @click="orderBtn(50)">交易成功</view>
				<view class="button error" @click="orderBtn(40)">交易失败</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import robbyImageUpload from "../../components/robby-image-upload/robby-image-upload.vue"
	import WxValidate from '../../common/WxValidate.js';
	import utils from '../../common/utils.js'
	export default {
		components:{robbyImageUpload},
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
					company_rubbish_price_name:'',
					company_rubbish_price_uuid:'',
					price:'',
					money:"",
					weight:""
				},
				reasonData:{
					reason_main_type:20,
					note:'',
					failure_uuid:'',
					describe_info:''
				},
				reasonList:[],
				rubbishIndex: null,
				reasonIndex: null,
				// 图片上传
				// enableDel: false,
				// enableAdd: false,
				// enableDrag: false,
				limitNumber: 5,
				imageData: [],
				fileKeyName: 'file',
				serverUrl: this.$api.uploadurl,
				serverUrlDeleteImage: '',
				formData: {
					file_dir: 'order'
				},
				imagesArr:[]
			};
		},
		filters: {
			momentFormateHMS: utils.momentFormateHMS,
		},
		onLoad(option) {
			if (option.obj_id) {
				this.obj_id = JSON.parse(decodeURIComponent(option.obj_id));
			}else{
				this.obj_id ='4'
			}
			this.detail(this.obj_id)
			this.initValidate()
			this.initValidate2()
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo;
			}
		},
		methods: {
			// bindPickerChange: function(e) {
			//     this.rubbishIndex = e.detail.value
			//     this.form.company_rubbish_price_uuid = this.rubbishList[this.rubbishIndex].uuid
			// 	console.log( this.form.company_rubbish_price_uuid)
			// },
			// resonPickerChange(e){
			// 	this.reasonIndex = e.detail.value
			// 	this.reasonData.failure_uuid = this.reasonList[this.reasonIndex].uuid;
			// },
			// 提交表单验证
			initValidate() {
				// 验证字段的规则
				const rules = {
					money: {
						required: true
					},
					weight: {
						required: true
					},
					company_rubbish_price_uuid:{
						required: true
					}
				};
				// 验证字段的提示信息，若不传则调用默认的信息
				const messages = {
					money: {
						required: '请输入价格'
					},
					weight:{
						required: '请输入重量'  
					},
					company_rubbish_price_uuid:{
						required: '请输入明细'
					}
				};
				// 创建实例对象
				this.WxValidate = new WxValidate(rules, messages);
			},
			initValidate2() {
				// 验证字段的规则
				const rules = {
					failure_uuid: {
						required: true
					},
					
				};
				// 验证字段的提示信息，若不传则调用默认的信息
				const messages = {
					failure_uuid:{
						required: '请输入失败原因'
					}
				};
				// 创建实例对象
				this.WxValidate2 = new WxValidate(rules, messages);
			},
			getReasonList(){
				let data = {
					staff_type:20
				}
				this.$api.reasonList(data).then(res => {
					this.reasonList = res.data.data.results
				})
			},
			getReason(e){
				console.log(e)
				this.index = e.detail.value
				if(this.reasonList.length == 0){
					uni.showToast({
						title:"当前垃圾类型无详细分类",
						icon:"none"
					})
				}
				let arrList = this.reasonList.map(o => {
					return o.describe_info
				})
				console.log(arrList)
				uni.showActionSheet({
					itemList: arrList,
					success: res => {
						let index = res.tapIndex;
						this.reasonData.failure_uuid = this.reasonList[index].uuid;
						this.reasonData.describe_info = this.reasonList[index].describe_info;
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			// 选择垃圾类型详细
			garbageType() {
				let _this = this;
				if(_this.rubbishList.length == 0){
					uni.showToast({
						title:"当前垃圾类型无详细分类",
						icon:"none"
					})
				}
				let arr = _this.rubbishList.map(o => {
					return o.name
				})
				console.log(arr)
				uni.showActionSheet({
					itemList: arr,
					success: function(res) {
						let index = res.tapIndex;
						_this.form.company_rubbish_price_name = _this.rubbishList[index].name;
						_this.orderInfo.company_rubbish_price_uuid = _this.rubbishList[index].uuid;
						
						// _this.form.price = _this.rubbishList[index].max_price;
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
					com_uuid:this.orderInfo.company_uuid,
					rub_uuid:this.orderInfo.rubbish_uuid
				}
				this.$api.rubbishList(data).then(res => {
					console.log(res)
					this.rubbishList = res.data.data.results
				})
			},
			orderBtn(val) {
				if (val == 40) {
					this.isShow = true
					this.getReasonList()
				} else { 
					this.editOrder(val)
					
				}
			},
			handelClick(){
				// this.editOrder(40)
				if (!this.WxValidate2.checkForm(this.reasonData)) {
					const error = this.WxValidate2.errorList[0];
					this.$showToast(error.msg);
					return false;
				}
				this.$showLoading();
				this.reasonData.order_uuid = this.orderInfo.order_uuid
				this.$api.markError(this.reasonData).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: '交易失败已完成',
							icon: "success"
						})
						setTimeout(()=>{
							uni.reLaunch({
							    url:'/pages/home/home'
							});
						},1000)
					}
				});
			},
			editOrder(val) {
				this.$showLoading();
				this.orderInfo.personnel_uuid = this.userInfo.relation_id
				this.orderInfo.action_state=val             
				this.orderInfo.money =this.form.money?this.form.money *1000:''
				this.orderInfo.weight =this.form.weight?this.form.weight *1000:''
				// this.orderInfo.company_rubbish_price_uuid = this.form.company_rubbish_price_uuid
				
				this.orderInfo.image =this.imagesArr.join(',')
				
				if (!this.WxValidate.checkForm(this.orderInfo)) {
					const error = this.WxValidate.errorList[0];
					this.$showToast(error.msg);
					return false;
				}
				// if(val==40){
				// 	Object.assign(this.orderInfo,this.reasonData)
				// }
				this.$api.editOrder(this.orderInfo.obj_id, this.orderInfo).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							title:'交易成功',
							icon: "success"
						})
						setTimeout(()=>{
							uni.reLaunch({
							    url:'/pages/home/home'
							});
						},1000)
					}
					// else{
					// 	uni.showToast({
					// 		duration:3000,
					// 		title:res.data.msg,
					// 		icon:"none"
					// 	})
					// 	uni.navigateTo({
					// 		url:'/pages/home/home'
					// 	})
					// }
				});
			},
			//列表详情
			detail(obj_id) {
				console.log(obj_id)
				this.$api.detail(obj_id, {}).then(res => {
					this.orderInfo = res.data.data
					console.log(this.orderInfo)
					this.getRubbishList()
				})
			},
			// 删除图片
			deleteImage: function(e) {
				console.log(e);
			},
			// 新增图片
			addImage: function(e) {
				this.imagesArr = e.allImages
				console.log(e);
			},
			onCancel(e) {
				console.log(e);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.mask{
		position: absolute;
		top: 0;bottom: 0;
		left: 0;right: 0;
		z-index: 99;
		background-color: rgba(0,0,0,.5);
		display: flex;
		justify-content: center;
		align-items: center;
		.mask-content{
			width: 600rpx;
			height: 484rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			padding: 34rpx;
			box-sizing: border-box;
			.cont-btn{
				display: flex;
				justify-content: space-between;
				margin-top: 32rpx;
				.btn{
					width: 218rpx;
					height: 76rpx;
					border-radius: 50rpx;
					border: 1px solid #979797;
					text-align: center;
					line-height: 76rpx;
					color: #979797;
				}
				.btn2{
					border: none;
					background: linear-gradient(136deg, #18D496 0%, #00C282 100%);
					color: #FFFFFF;
				}
			}
			&>textarea{
				width: 100%;
				height: 244rpx;
				background: #F3F3F3;
				border-radius: 10rpx;
				margin-top: 10rpx;
				padding: 30rpx;
				box-sizing: border-box;
			}
			.cont-top{
				display: flex;
				font-size: 32rpx;
				align-items: center;
				color: #333333;
				.cont-left{
					flex: 1;
				}
				.cont-right{
					display: flex;
					align-items: center;
					color: #999999;
					.uni-input{
						display: flex;
						align-items: center;
						justify-content: center;
						text-align: right;
						text{
							display: block;
							font-size: 34rpx;
						}
					}
					
				}
			}
		}
	}
	
	
	
	.map-box {
		width: 100%;

		.detail {
			padding-top: 30rpx;
			width: 100%;
			background: #FFFFFF;
			border-radius: 16px 16px 0px 0px;
			height: 1130rpx;
			color: #333333;
			font-size: 28rpx;
			.paizhao{
				display: flex;
				padding: 15rpx 34rpx;
				box-sizing: border-box;
				justify-content: flex-end;
				font-size: 32rpx;
				margin-top: 10rpx;
				border-bottom: 1rpx solid #EFEFEF;
				.paizhao-left{
					flex: 1;
				}
				.paizhao-right{
					flex: 1;
					display: flex;
					.shangchuan{
						color: #D2D2D2;
					}
					.paizhao-img{
						margin-left: 10rpx;
						&>image{
							width: 54rpx;
							height: 48rpx;
						}
					}
					
				}
			}
			.xiangxi{
				display: flex;
				align-items: center;
				margin-top: 16rpx;
				.borders{
					.uni-input{
						width: 400rpx;
						height: 48rpx;
						line-height: 48rpx;
						border-radius: 4rpx;
						border: 1rpx solid #D4D4D4;
						color: #888888 !important;
					}
				}
				
				&>input{
					width: 400rpx;
					height: 48rpx;
					border-radius: 4rpx;
					border: 1px solid #D4D4D4;
					margin-top: 16rpx;
					padding-left: 15rpx;
					box-sizing: border-box;
					
				}
			}
			.time {
				color: #333333;
				font-weight: bold;
				text-indent: 30rpx;
				font-size: 32rpx;
				border-bottom: 1rpx solid #CCCCCC;
				line-height: 90rpx;
			}

			.time-detail {
				text-indent: 30rpx;
				margin-top: 20rpx;
				line-height: 60rpx;
				border-bottom: 1rpx solid #EFEFEF;
				line-height: 50rpx;
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
