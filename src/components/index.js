import dateFormat from './global/Date'


// 时间戳转换
export const Dates = (data) => {
	return dateFormat(data, 'YYYY/MM/DD HH:mm:ss');
}