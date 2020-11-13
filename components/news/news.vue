<template>
	<view class="list">
		<view class="list-item border" v-for="item in list" :key="item.pub_time" @click="detail(item)">
			<view class="item-box">
				<text class="item-title uni-ellipsis">{{ item.title }}</text>
				<text class="item-content uni-product-title">{{ item.sub_title }}</text>
			</view>
			<view class="img-box"><image :src="img(item.pics)" mode="aspectFill" class="img"></image></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			form: {
				page: this.page,
				page_size: this.page_size
			}
		};
	},
	onReady() {
		this.loadData();
	},
	computed: {
		listFilter() {
			return this.list;
		}
	},
	props: {
		page: {
			type: Number,
			default: 1
		},
		page_size: {
			type: Number,
			default: 8
		},
		loadingType: {
			type: String,
			default: 'loading'
		}
	},
	methods: {
		// 加载逻辑
		async loadData(type = 'add') {
			//没有更多直接返回
			if (type === 'add') {
				if (this.loadingType === 'nomore') {
					return;
				}
				this.$emit('updateLoading', 'loading');
				// this.loadingType = 'loading';
			} else {
				// this.loadingType = 'more';
				this.$emit('updateLoading', 'more');
				this.form.page = 1;
			}
			// 获取数据
			let data = await this.addData();

			if (type === 'refresh') {
				this.list = [];
			}
			// 合并数组
			this.list = this.list.concat(data);
			// 暂无数据
			if (!this.list.length && this.form.page === 1) {
				this.noData = true;
			} else {
				this.noData = false;
			}
			// 页码+1
			this.form.page++;
			//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
			let loadingType = this.list.length >= this.total ? 'nomore' : 'more';
			this.$emit('updateLoading', loadingType);
			// 停止刷新
			if (type === 'refresh') {
				uni.stopPullDownRefresh();
			}
		},
		// 获取数据
		addData() {
			// form.page_size = this.page_size;
			return this.$api.news_list('', this.form).then(res => {
				console.log(res.data);
				if (res.data.code === 0) {
					this.total = res.data.data.count;
					return res.data.data.results;
				}
			});
		},
		detail(item) {
			this.$emit('newsClick', item.obj_id);
		},
		img(pic) {
			return this.$api.img + pic;
		}
	}
};
</script>

<style lang="scss">
.list {
	.list-item {
		height: 196rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.item-box {
			display: flex;
			flex-direction: column;
			width: 450rpx;
			.item-title {
				font-size: 32rpx;
				color: #333;
				display: inline-block;
				width: 100%;
			}

			.item-content {
				font-size: 24rpx;
				color: #999;
			}
		}
		.img-box {
			width: 218rpx;
			height: 146rpx;
			background: #efefef;
		}
		.img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
