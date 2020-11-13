<script>
// 	// #ifdef APP-PLUS
// 	import APPUpdate, {
// 		getCurrentNo
// 	} from "./js_sdk/zhouWei-APPUpdate/APPUpdate/index.js";
// 	// #endif
// 	// #ifdef APP-PLUS
// 	import getServerNo from "./js_sdk/zhouWei-APPUpdate/APPUpdate/index.js";
// 	// #endif
// 	export default {
// 		data() {
// 			return {
// 				version: "" // 版本号
// 			};
// 		},

// 		onLaunch: function(e) {
// 			// #ifdef APP-PLUS
// 			getServerNo();
// 			// #endif
// 		},
// 		//第一次加载
// 		onLoad(e) {
// 			console.log('222')
// 			// #ifdef APP-PLUS
// 			getCurrentNo(res => {
// 				// 进页面获取当前APP版本号（用于页面显示）
// 				this.version = res.version;
// 			});
// 			// #endif
// 		},
// 		//方法
// 		methods: {
// 			// 检查APP是否有新版本
// 			onAPPUpdate() {
// 				// true 没有新版本的时候有提示，默认：false
// 				APPUpdate(true);
// 			}
// 		}
// 	};
</script>

<style lang="scss">
	@import './common/uni.css';
	@import './uni.scss';
	@import './static/font/iconfont.css';
	@import "uview-ui/index.scss";

	.iconfont {
		font-family: 'iconfont' !important;
		font-size: 40rpx;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	}



	/*每个页面公共css */
	page {
		min-height: 100%;
		display: flex;
		font-family: PingFangSC-Medium;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
		background-color: #fff;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		/* background-color: #efeff4; */
		/* padding: 20upx; */
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 40upx;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		width: 20%;
		height: 50upx;
		min-height: 50upx;
		padding: 15upx 0;
		padding-left: 30upx;
		line-height: 50upx;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 50upx;
		padding: 20upx;
	}

	button.primary {
		background-color: #0faeff;
	}

	.my-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.border {
		position: relative;
	}

	.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1rpx;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: rgba(0, 0, 0, 0.1);
	}
</style>
