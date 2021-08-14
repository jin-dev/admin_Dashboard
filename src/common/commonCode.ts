export const ID_CONFIRM_STATUS: any = {
  0: 'created',
  1: 'rejected',
  2: 'active',
}
export const PARTNERS: any = {
  1: 'UT',
  2: 'SKS',
  3: 'STICPAY',
}
export const ID_STATUS: any = {
  0: 'created',
  1: 'rejected',
  2: 'active',
  3: 'inactive',
};

export const ID_TYPE: any = {
  0: 'ID_CARD',
  1: 'DRIVER_LICENSE',
  2: 'PASSPORT',
};
export const KOREAN_ID_TYPE: any = {
  0: '주민등록증',
  1: '운전면허증',
  2: '여권',
};

export const REMITTANCE_STATUS: any = {
  '대기': 3,
  '진행': 0,
  '완료': 7,
  '거절': 8,
  '취소': 1,
}

export const REJECT_REASON: any = [
  { code: '', label: '거절사유' },
  { code: 'not_yours', label: '잘못된 신분증 사진 업로드' },
  { code: 'wrong_name', label: '파일 식별 불가' },
  { code: 'wrong_expiry', label: '회원정보와 신분증의 정보가 일치하지 않음' },
  { code: 'wrong_file', label: '신분증 인증 시 잘못된 정보 기입' },
  { code: 'duplication_number', label: '이미 가입된 실명확인번호' },
  { code: 'expiration_date_expiry', label: '신분증 유효기간 만료' },
  { code: 'not_original_file', label: '원본이 아닌 신분증을 촬영/스캔' },
  { code: 'grey_scale_img', label: '흑백처리된 신분증' },
  { code: 'others', label: '기타' },
]

export const PARTNERS_LIST = [
  { code: 1, value: 'UT' },
  { code: 3, value: 'STICKPAY' },
  { code: 2, value: 'SKS' },
];