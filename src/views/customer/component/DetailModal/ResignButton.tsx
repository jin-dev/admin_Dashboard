import React from 'react';
import { Button } from 'react-rainbow-components';

import axios, { AxiosRequestConfig } from 'axios';
import { useLoading } from 'components/Loading/Loading';

type Props = {
  userId: any;
  buttonName?: string;
  buttonColor?: string;
};

const ResignButton = ({ userId }: Props) => {
  const resignUser = (userId: any) => {
    if (
      window.confirm(
        '[주의] \n사용자 탈퇴 후 원복이 불가능하며,\n탈퇴 사용자는 동일한 이메일로 재가입이 불가능합니다. ',
      )
    ) {
      axios
        .post('api/v1/admin/customer/closed', {
          userId: userId,
        })

        .then(response => {
          if (response.data.code === 0) {
            alert('정상 처리 되었습니다.');
          } else {
            alert(
              response.data?.code + ' : ' + response.data?.detailMsg
                ? response.data?.detailMsg
                : response.data?.msg,
            );
          }
        })
        .finally(() => {});
    }
  };

  return (
    <Button
      label="저장"
      variant="destructive"
      onClick={(e: any) => resignUser(userId)}
    >
      {' '}
      회원탈퇴{' '}
    </Button>
  );
};

export default ResignButton;
