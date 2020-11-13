<template>
	<view class="content">
		<view class="login-box">
			<view class="input-group">
				<view class="input-row bt"><input type="text" class="input phone" v-model="form.first_name" placeholder="姓名" maxlength="4" placeholder-class="input-place" /></view>
				<view class="input-row bt"><input type="number" class="input code" v-model="form.phone" placeholder="手机号" maxlength="11" placeholder-class="input-place" /></view>
			</view>
			<view class="btn-row"><button type="primary" class="login bt" @tap="update">确定修改</button></view>
		</view>
	</view>
</template>

<script>
import utils from '../../common/utils.js';
import WxValidate from '../../common/WxValidate.js';
export default {
	components: {},
	data() {
		return {
			config: {
				title: '', //title
				bgcolor: '', //背景颜色
				fontcolor: '#000', //文字颜色，默认白色
				type: 3, //type 1，3胶囊 2，4无胶囊模式
				transparent: true, //是否背景透明 默认白色
				linear: true, //是为开启下滑渐变
				share: false, //是否将主页按钮显示为分享按钮
				fixed: true,
				menuIcon: '../static/img/back_.png', //当type为3或者4的时候左边的icon文件位置，注意位置与当前页面不一样
				menuText: '' //当type为3或4的时候icon右边的文字
				// width: '36rpx'
			},
			form: {
				first_name: '',
				phone: ''
			},
			WxValidate: {},
			WxValidatePhone: {},
		};
	},
	onReady() {
	},
	computed: {
		userInfo() {
			return this.$store.state.userInfo;
		}
	},
	onLoad() {
		this.form.first_name=this.userInfo.first_name;
		this.form.phone=this.userInfo.phone;
		// 初始化验证
		this.initValidate();
	},
	methods: {
		update() {
			if (!this.WxValidate.checkForm(this.form)) {
				const error = this.WxValidate.errorList[0];
				this.$showToast(error.msg);
				return false;
			}
			this.$showLoading('提交中');
			this.$api.updateInfo(this.form).then(res => {
				if (res.data.code == 200) {
					this.$showToast('修改成功');
					this.$store.dispatch('getUserInfo');
					uni.navigateBack();
				} else {
					this.$showToast(res.data.msg);
				}
			});
		},
		// 提交表单验证
		initValidate() {
			// 验证字段的规则
			const rules = {
				first_name: {
					required: true
				},
				phone: {
					required: true,
					tel:true
				}
			};

			// 验证字段的提示信息，若不传则调用默认的信息
			const messages = {
				first_name: {
					required: '请输入您的姓名'
				},
				phone: {
					required: '请输入您的手机号',
					tel:'请输入正确的手机号'
				}
			};

			// 创建实例对象
			this.WxValidate = new WxValidate(rules, messages);
		}
	}
};
</script>

<style lang="scss">
.bg {
	width: 100%;
	height: 478rpx;
	.img {
		width: 100%;
	}
}
.login-box {
	padding: 60rpx 40rpx 0;
	border-top-right-radius: 58rpx;
	border-top-left-radius: 58rpx;
	position: relative;
	top: 100rpx;
	background: #fff;
	.input-group {
		margin-top: 0;
		&:before,
		&:after {
			height: 0;
		}
		.input-row {
			height: 104rpx;
			display: flex;
			border-radius: 52rpx;
			overflow: hidden;
			background: #f7f7f7;
			.input {
				height: 100%;
				flex: 1;
				// text-indent: 48rpx;
				background: none;
				padding-left: 48rpx;
			}
			.btn {
				color: #38ca50;
				font-size: 28rpx;
				display: flex;
				align-items: center;
			}
			.btn:after {
				border: none;
			}
		}
	}
	.btn-row {
		margin-top: 0;
		padding: 0;
		.login {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			border-radius: 50rpx;
			color: #fff;
			font-size: 32rpx;
			background: #38ca50;
			width: 80%;
		}
		.login:after {
			border: none;
		}
		.reg {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #666;
			.reg-img {
				width: 96rpx;
				height: 96rpx;
			}
		}
	}
}
.bt {
	margin: 38rpx auto;
	border: none;
}
.tips{
	padding: 40rpx;
	font-size: 26rpx;
	color: #999;
}
</style>
