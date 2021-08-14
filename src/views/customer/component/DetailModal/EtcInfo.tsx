// import { PARTNERS } from 'common/commonData';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { addComma } from 'utils/number';
import { timeFormatter } from 'utils/timeFormatter';

const PARTNERS: any = {
  1: 'UT',
  2: 'SKS',
  3: 'STICPAY',
};

const dataHead: any = [
  { label: '가입일자', keyName: 'create_date' },
  { label: '유입경로', keyName: 'register_from' },
  { label: '타발송금이용', keyName: 'inbound_use_date' },
  { label: '본인인증계좌', keyName: ['bank_name', 'account_number'] },
  { label: '가상계좌', keyName: 'virtual_account_number' },
  { label: '회원구분', keyName: 'type_translated' },
  { label: 'WLF 체크결과', keyName: 'wml_result_date' },
  { label: 'STR', keyName: 'str_result_date' },
  { label: '송금누적액(타발송금)', keyName: 'inbound_sum_usd' },
  { label: '송금누적액(당발송금)', keyName: 'outbound_sum_usd' },
];
const EtcInfo = ({ userData }: any) => {
  if (!userData) return <></>;
  const userEtcInfo = userData.detail;

  const renderInfo = (item: any) => {
    if (Array.isArray(item.keyName))
      return (
        userEtcInfo[item.keyName[0]] &&
        userEtcInfo[item.keyName[0]] + ' ' + userEtcInfo[item.keyName[1]]
      );

    switch (item.label) {
      case '유입경로':
        const value = userEtcInfo[item.keyName];
        return PARTNERS[value];
      case '송금누적액(타발송금)':
      case '송금누적액(당발송금)':
        return (
          'US $' +
          (!!userEtcInfo[item.keyName]
            ? addComma(userEtcInfo[item.keyName], 2, false)
            : '0')
        );
      case '가입일자':
        return timeFormatter(userEtcInfo[item.keyName]);
      default:
        return userEtcInfo[item.keyName];
    }
  };

  return userEtcInfo ? (
    <div>
      <Head>
        <span>기타 정보</span>
      </Head>
      <Table>
        <colgroup>
          <col width="200" />
          <col />
        </colgroup>
        <tbody>
          {dataHead.map((item: any) => (
            <tr key={item.label}>
              <th>{item.label}</th>
              <td>
                <span>{renderInfo(item)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  ) : (
    <></>
  );
};

export default EtcInfo;

const Head = styled.h2`
  display: flex;
  justify-content: space-between;
  padding: 20px 0 15px;
  width: 100%;
`;

const Table = styled.table`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  width: 100%;
  th {
    background: #eee;
    padding: 10px;
  }
  td > span {
    padding-left: 20px;
  }
  tr + tr > th,
  tr + tr > td {
    border-top: 1px solid #ddd;
  }
  input {
    padding-left: 20px;
  }
`;
