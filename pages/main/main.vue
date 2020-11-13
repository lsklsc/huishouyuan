<template>
	<view class="">
		<navigation-custom :config="config" :scrollTop="scrollTop" @customConduct="customConduct" :scrollMaxHeight="scrollMaxHeight" />
		<view class="content">
			<view v-if="hasLogin" class="hello">
				<view class="title">您好 {{ userName }}，您已成功登录。</view>
				<view class="ul">
					<view>这是 uni-app 带登录模板的示例App首页。</view>
					<view>在 “我的” 中点击 “退出” 可以 “注销当前账户”</view>
				</view>
			</view>
			<view v-if="!hasLogin" class="hello">
				<view class="title">您好 游客。</view>
				<view class="ul">
					<view>这是 uni-app 带登录模板的示例App首页。</view>
					<view>在 “我的” 中点击 “登录” 可以 “登录您的账户”</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import navigationCustom from '../../components/navigation-custom';
import { mapState } from 'vuex';

export default {
	computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
	onLoad() {
		if (!this.hasLogin) {
			uni.showModal({
				title: '未登录',
				content: '您未登录，需要登录后才能继续',
				/**
				 * 如果需要强制登录，不显示取消按钮
				 */
				showCancel: !this.forcedLogin,
				success: res => {
					if (res.confirm) {
						/**
						 * 如果需要强制登录，使用reLaunch方式
						 */
						if (this.forcedLogin) {
							uni.reLaunch({
								url: '../login/login'
							});
						} else {
							uni.navigateTo({
								url: '../login/login'
							});
						}
					}
				}
			});
		}
	},
	data() {
		return {
			config: {
				title: '首页', //title
				bgcolor: '#c1a379', //背景颜色
				fontcolor:"#000", //文字颜色，默认白色
				type: 3, //type 1，3胶囊 2，4无胶囊模式
				transparent: true, //是否背景透明 默认白色
				linear: true, //是为开启下滑渐变
				share: false, //是否将主页按钮显示为分享按钮
				menuIcon:"../static/img/msg.png", //当type为3或者4的时候左边的icon文件位置，注意位置与当前页面不一样
				// menuText:"返回", 当type为3或4的时候icon右边的文字
				width:'38rpx'
			},
			scrollTop: 0, // 当linear为true的时候需要通过onpagescroll传递参数
			scrollMaxHeight: 200 //滑动的高度限制，超过这个高度即背景全部显示
		};
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	components: {
		navigationCustom
	},
	methods: {
		//当config type 为 4或者3 的时候 自定义methods
		customConduct() {
			console.log('提醒');
		}
	}
};
</script>

<style>
.hello {
	display: flex;
	flex: 1;
	flex-direction: column;
}

.title {
	color: #8f8f94;
	margin-top: 50upx;
}

.ul {
	font-size: 30upx;
	color: #8f8f94;
	margin-top: 50upx;
}

.ul > view {
	line-height: 50upx;
}
</style>
