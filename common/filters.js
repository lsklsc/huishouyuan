// 交易状态码
let stateName = (state) => {
	let name = null;
	// '订单状态{10:未接单, 20:已接单, 30:取消交易, 40:交易失败, 50:交易成功(待评价), 60:交易完成
	switch (state) {
		// case 10:
		// 	name = '已提交'
		// 	break;
		// case 20:
		// 	name = '已接单'
		// 	break;
		// case 25:
		// 	name = '交易中'
		// 	break;
		case 30:
			name = '取消交易'
			break;
		case 40:
			name = '交易失败'
			break;
		// case 50:
		// 	name = '待评价'
		// 	break;
		case 60:
			name = '交易完成'
			break;
		// case 70:
		// 	name = '交易异常'
		// 	break;
	}
	return name;
}
export {
	stateName
}
