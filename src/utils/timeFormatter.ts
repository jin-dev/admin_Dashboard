import moment from 'moment';

export function timeFormatter(time: any) {
	return time ? moment(time).format('YYYY-MM-DD HH:mm:ss') : '';
}
export function dateFormatter(time: any) {
	return time ? moment(time).format('YYYY-MM-DD') : '';
}