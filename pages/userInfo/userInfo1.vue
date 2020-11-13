<template>
	<view class="user-wrap">
		<view class="user-info">
			<view class="user-left">
				<view class="user-img">
					<image src="../../static/img/user/avatar.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="user-right">
				<view class="user-name">老李</view>
			</view>
		</view>
		<!-- 手机号 -->
		<view class="detail-wrap">
			<view class="name">
				<view class="detail-men">姓名</view>
				<view class="detail-name">老李</view>
			</view>
			<view class="name">
				<view class="detail-men">账号</view>
				<view class="detail-name">15811330366</view>
			</view>
			<view class="name">
				<view class="detail-men">密码</view>
				<view class="detail-name">123456</view>
			</view>
		</view>
		<!-- 遮罩 -->
		<view class="mask-wrap" v-show="isShow">
			<view class="mask-cont">
				<view class="password-wrap">
					<view class="password">现有密码</view>
					<view class="input">
						<input type="text" placeholder="请输入当前密码" value="" />
					</view>
				</view>
				<view class="password-wrap">
					<view class="password">新密码</view>
					<view class="input">
						<input type="text" placeholder="请输入新密码" value="" />
					</view>
				</view>
				<view class="password-wrap">
					<view class="password">确认密码</view>
					<view class="input">
						<input type="text" placeholder="请再次输入新密码" value="" />
					</view>
				</view>
				<view class="modifyBtn">立即修改</view>
				<view class="cha" @click="isShow=false">X</view>
			</view>
		</view>
		<view class="modify" @click="isShow=true">修改个人信息</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-wrap{
		padding: 30rpx 36rpx;
		width: 100%;
		box-sizing: border-box;
		.user-info {
			display: flex;
			position: relative;
		
			.user-left {
				.user-img {
					width: 144rpx;
					height: 144rpx;
					border-radius: 50%;
		
					&>image {
						width: 100%;
						height: 100%;
					}
				}
			}
		
			.user-right {
				padding-left: 20rpx;
				color: #333333;
				padding-top: 25rpx;
				.user-name {
					padding-top: 23rpx;
					font-size: 36rpx;
					font-weight: 600;
				}
			}
		}
		.detail-wrap{
			width: 100%;
			margin-top: 30rpx;
			.name{
				display: flex;
				width: 100%;
				color: #222222;
				font-size: 28rpx;
				border-bottom: 1rpx solid #EFEFEF;
				margin: 20rpx 0;
				padding: 8rpx 0;
				.detail-men{
					flex: 1;
				}
				.detail-name{
					flex: 1;
					text-align: right;
				}
			}
		}
		.modify{
			width: 624rpx;
			height: 76rpx;
			background: #05B877;
			border-radius: 12rpx;
			margin: auto;
			text-align: center;
			line-height: 76rpx;
			font-size: 28rpx;
			color: #FFFFFF;
			margin-top: 70rpx;
		}
		.mask-wrap{
			position: absolute;
			left: 0;top: 0;
			right: 0;bottom: 0;
			background: rgba(0, 0, 0, 0.67);
			display: flex;
			align-items: center;
			justify-content: center;
			.mask-cont{
				width: 644rpx;
				height: 480rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				padding: 0 42rpx;
				box-sizing: border-box;
				position: relative;
				.modifyBtn{
					width: 444rpx;
					height: 76rpx;
					background: #05B877;
					border-radius: 12rpx;
					margin: auto;
					text-align: center;
					line-height: 76rpx;
					color: #FFFFFF;
					font-size: 28rpx;
					margin-top: 42rpx;
				}
				.cha{
					font-size: 50rpx;
					color: #FFFFFF;
					position: absolute;
					bottom: -120rpx;
					left: 50%;
					transform: translateX(-50%);
				}
				.password-wrap{
					display: flex;
					border-bottom: 1rpx solid #EFEFEF;
					margin-top: 40rpx;
					padding: 3rpx 0;
					.password{
						flex: 1;
						color: #0A090E;
						font-size: 32rpx;
					}
					.input{
						width: 268rpx;
						&>input{
							text-align: right;
						}
					}
				}
			}
		}
		
		
		
	}
</style>
