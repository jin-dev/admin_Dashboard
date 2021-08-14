export interface searchItemsType {
	label: string;
	keyName: string;
	size?: number;
	type?: string;
	datalist?: array;
	format?: any;
	placeholder?: string;
}

export interface userInfoType {
	firstname: string;
	birthdate: string;
	memo: null;
	id_confirm_date: null;
	type: string;
	bank_confirm_date: null;
	partner_id: number;
	last_login_ip: string;
	root_id: number;
	id: number;
	create_date: string;
	recommend_code: string;
	email: string;
	level: string;
	register_from: null;
	middlename: string;
	resign_timestamp: null;
	last_login_date: string;
	lastname: string;
	recommend_code_id: number;
	locale_code: string;
	//백엔드 요청으로 korean_name --> KoreaName -> korean_name
	//정의석 요청 2021/04/23
	korean_name: string;
	phone_number: string;
	fullname: string;
	admin_name: null;
	customer_id: string;
	country_id: number;
	status: string;
}
