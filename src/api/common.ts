import request from '@/utils/request'

// 列表
export function coachPage(data: any) {
	return request({
		url: '/coach/page',
		method: 'post',
		data,
	})
}
