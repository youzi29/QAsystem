import axios from 'axios'
import qs from 'qs'



export const add = data => {
	return axios.request({
		url: url,
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: qs.stringify(data)
	})
}

export const user = data => {
	return axios.request({
		url: url2,
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		/* data: qs.stringify(data) */
		data: data
	})
}

