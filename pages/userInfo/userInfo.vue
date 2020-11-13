<template>
	<view class="user">
		<!-- 头部 -->
		<view class="user-wrap">
			<view class="setting iconfont icon31shezhi"></view>
			<view class="info">
				<image class="avatar" mode="aspectFill" :src="userInfo.picture"></image>
				<view class="nickname">{{ userInfo.nickname }} 刘书坤</view>
			</view>
		</view>
		<!-- 用户功能 -->
		<view class="com-item user-info">
			<view class="com-wrap">
				<view class="cell" v-for="(item, index) in userList" :key="index">
					<view class="cell-left">
						<view class="cell-text">{{ item.title }}</view>
					</view>
					<view class="">{{userInfo[item.name][item.name_child] || userInfo[item.name] || '未填写'}}</view>
				</view>
				<view class="upload">
					<view class="iconfont icon-xiugai" @click="uploadInfo('../update/info')"></view>
				</view>
			</view>
		</view>

		<!-- 用户服务 -->
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell" v-for="(item, index) in serverList" :key="index">
					<view class="cell-left">
						<view class="cell-text">{{ item.title }}</view>
					</view>
					<view class="">{{userInfo[item.name][item.name_child] || userInfo[item.name] || '未填写'}}</view>
				</view>
				<view class="upload">
					<view class="iconfont icon-xiugai" @click="uploadInfo('../update/org')"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import comNav from '../../components/com-nav.vue';
export default {
	components: {
		comNav
	},
	data() {
		return {
			// userInfo: {
			// 	headPicUrl: '/static/images/user/avatar.jpg',
			// 	nickName: '史蒂芬.林'
			// },
			currentIndex: 0,
			userList: [
				{
					title: '姓名',
					name: 'first_name'
				},
				{
					title: '手机号',
					name: 'phone'
				},
			],
			serverList: [
				{
					title: '街道',
					name: 'jd_name',
					name_child:'jiedao'
				},
				{
					title: '社区',
					name: 'jd_name',
					name_child:'shequ'
				},
				{
					title: '小区',
					name: 'user_room_num',
					name_child:'org_name'
				}
			]
		};
	},
	computed: {
		userInfo() {
			return this.$store.state.userInfo;
		}
	},
	methods:{
		uploadInfo(url){
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f2f2f2;
}
.icon-xiugai{
	font-size: 32rpx !important;
	color: #333;
}
.btn-hover {
	background: #f2f2f2 !important;
}
.user {
	width: 100%;
	.user-wrap {
		display: flex;
		justify-content: center;
		// align-items: center;
		height: 50vw;
		padding: 30rpx;
		z-index: 9;
		border-radius: 0 0 20% 20%;
		// background: url('https://handsel.oss-cn-shenzhen.aliyuncs.com/1588938371592.jpg') no-repeat;
		background-color: $uni-bg-color-custom;
		background-size: cover;
		.setting {
			color: #fff;
			position: absolute;
			top: 60rpx;
			left: 60rpx;
			font-size: 50rpx;
		}
		.info {
			position: absolute;
			text-align: center;
			.avatar {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}
			.nickname {
				color: #fff;
				font-size: 28rpx;
			}
		}
	}
	.user-info {
		margin-top: -8vh;
	}
	.com-item {
		padding-left: 20rpx;
		padding-right: 20rpx;
		margin-bottom: 20rpx;
		.com-wrap {
			border-radius: 10rpx;
			overflow: hidden;
			.upload{
				text-align: right;
			}
		}
	}
	.cell {
		height: 100rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		border-bottom: 1px solid #f8f8f8;
		&:active {
			background: #f2f2f2;
		}
		&:last-child {
			border-bottom: none !important;
		}
		.cell-left {
			display: flex;
			align-items: center;
			// .cell-icon {
			// 	width: 50rpx;
			// 	height: 50rpx;
			// }
			.cell-text {
				color: #666;
				font-size: 28rpx;
				margin-left: 20rpx;
			}
		}
		.iconfont {
			font-size: 40rpx;
			color: #999;
		}
	}
}
</style>
