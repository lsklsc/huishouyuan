<template>
	<view class="content">
		<view class="content-bg">
			<view class="header">
				<image :src="userInfo.picture || '../../static/img/user/avatar.png'" mode="aspectFill" class="avatar"></image>
				<view class="info" v-if="hasLogin">
					<view class="name">{{ userInfo.nickname}}</view>
					<view class="card">手机号：{{userInfo.phone}}</view>
				</view>
				<view class="unbind" @click="login" v-else>点击登录</view>
				<view class="set"><text class="iconfont icon-tuichudenglu" @click="exit"></text></view>
			</view>
		</view>

		<view class="list-box">
			<view class="list">
				<uni-list>
					<uni-list-item :title="item.title" class="item" :show-extra-icon="false" v-for="(item, index) in menus" :key="index" @click="items(item)">
						<template #icon>
							<rich-text :nodes="item.icon"></rich-text>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
		</view>
		<login ref="open"></login>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	import login from '@/components/login';
	import WxValidate from '../../common/WxValidate.js';
	import {
		mapState,
		mapMutations
	} from 'vuex';

	import menus from './menus.js';
	export default {
		components: {
			login,
			uniList,
			uniListItem,
		},
		data() {
			return {
				menus: menus,
				form: {
					phone: '',
					write_cad_num: '',
					unionId: ''
				}
			};
		},
		computed: {
			hasLogin() {
				return this.$store.state.hasLogin;
			},
			userInfo() {
				return this.$store.state.userInfo;
			}
		},
		onLoad() {
			// 初始化验证
			this.initValidate();
		},
		methods: {
			items(item) {//点击菜单
				if (item.url && this.hasLogin) {
					uni.navigateTo({
						url: item.url
					});
				} else if (!this.hasLogin) {
					this.login();
				} else {
					this.$showToast(item.msg);
				}
			},
			login() {
				this.$refs.open.open();
			},

			open() {
				// 需要在 popup 组件，指定 ref 为 popup
				this.$refs.popup.open();
			},
			// 退出
			exit() {
				if (!this.hasLogin) {
					this.login();
				} else {
					uni.showModal({
						title: '',
						content: '是否退出',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							if (res.confirm) {
								this.$store.commit('logout');
							}
						}
					});
				}
			},
			// 提交表单验证
			initValidate() {
				// 验证字段的规则
				const rules = {
					phone: {
						required: true,
						tel: true
					},
					write_cad_num: {
						required: true
					}
				};

				// 验证字段的提示信息，若不传则调用默认的信息
				const messages = {
					phone: {
						required: '请输入手机号',
						tel: '手机号格式错误'
					},
					write_cad_num: {
						required: '请输入卡号'
					}
				};

				// 创建实例对象
				this.WxValidate = new WxValidate(rules, messages);
			},
			// 购物
			shopping() {
				if (!this.hasLogin) {
					this.login();
				} else {
					uni.switchTab({
						url: '../mall/mall'
					});
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.content {
		position: relative;

		.content-bg {
			height: 370rpx;
			width: 100%;
			background: #00cc7b;

			.header {
				margin: 30rpx 10rpx 30rpx 30rpx;
				display: flex;
				color: #fff;

				.avatar {
					width: 130rpx;
					height: 130rpx;
					border-radius: 50%;
				}

				.info {
					margin-left: 30rpx;

					.name {
						font-size: 40rpx;
					}

					.card {
						font-size: 28rpx;

						.bind {
							text-decoration: underline;
						}
					}
				}

				.unbind {
					margin-left: 30rpx;
					font-size: 40rpx;
					display: flex;
					align-items: center;
				}

				.set {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					padding-right: 10rpx;

					.iconfont {
						font-size: 40rpx;
					}
				}
			}
		}

		.list-box {
			width: 100%;
			position: absolute;
			top: 230rpx;
			left: 0;

			.list {
				border-radius: 20rpx;
				padding: 40rpx;
				background-color: #FFFFFF;

				.item {
					box-sizing: border-box;
					line-height: 100rpx;
					border-bottom: 1rpx solid #EFEFEF;

					.item-title {
						padding-left: 50rpx;
					}
				}
			}
		}
	}
</style>
