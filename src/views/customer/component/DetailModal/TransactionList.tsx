import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IDataTableColumn } from 'react-data-table-component';
import List from '../List';
import { PARTNERS_LIST, REMITTANCE_STATUS } from 'common/commonCode';
import { addComma } from 'utils/number';
import { CommonModal } from 'components/CommonModal';

import { apiProvider } from 'services/modules/provider';


let remittance_status: any = [];
for (const [key, value] of Object.entries(REMITTANCE_STATUS)) {
  remittance_status.push({ code: value, value: key });
}
const searchData: any = [
  {
    label: '송금일시',
    keyName: 'date',
    type: 'DatePicker',
  },
  [
    {
      label: '유입 경로',
      keyName: 'registerFrom',
      type: 'select',
      datalist: PARTNERS_LIST,
    },
    {
      label: '송금상태',
      keyName: 'remittanceStatus',
      type: 'select',
      datalist: remittance_status,
    },
  ],
];

const TransactionList = ({ userId, type, User }: any) => {
  const [isModal, setIsModal] = useState<any>(false);
  const [isDetailModal, setIsDetailModal] = useState<any>(false);
  const [Row, setRow] = useState<any>([]);
  const [tid, setTid] = useState<number>(0);
  const [Amount, setAmount] = useState('');

  useEffect(() => {
    const amountCall = async () => {
      try {
        const amountData = await apiProvider.get(
          `/transaction/customer/amount?userId=${userId}&type=${type}`,
        );
        setAmount(amountData.data);
      } catch (e) {
        console.log(e);
      }
    };
    amountCall();
  }, []);

  const handleDetailModal = (row: any) => {
    setRow(row);
    setTid(row.tid);
    setIsDetailModal(!isDetailModal);
  };
  const tableItems =
    type === 'outbound'
      ? ['고객수취금액', '대미환산율', '외전망보고서']
      : ['고객수취금액', '파트너적용환율', '송금원금'];

  const renderReportModal = (row: any) => {
    const reportAmountList = row.fx_report_amount?.split(' ') || [];

    return (
      <>
        {row && (
          <ReportTable>
            <thead>
              <tr>
                <ReportTh>이름</ReportTh>
                <ReportTh>값</ReportTh>
              </tr>
            </thead>
            <tbody>
              {tableItems.map((item: any, idx: number) => (
                <tr key={idx}>
                  <ReportTd>{item}</ReportTd>
                  <ReportTd>
                    {idx === 0
                      ? reportAmountList[0] +
                        ' ' +
                        addComma(reportAmountList[1])
                      : reportAmountList?.[idx + 1] &&
                        addComma(reportAmountList[idx + 1], 2)}
                  </ReportTd>
                </tr>
              ))}
            </tbody>
          </ReportTable>
        )}
      </>
    );
  };

  //백엔드 동욱차장님이 데이터가 보이든 안보이든 화면은 나와야 한다 해서 일단 주석 처리 2021.04.28
  //  if (!Amount || !User) return <></>;

  const { avail_won, max_usd, sum_usd = 0 }: any = Amount;
  const { level, userName }: any = User;
  const onClickReport = (row: any) => {
    setIsModal(true);
    setRow(row);
  };

  const thisYear = new Date().getFullYear();

  return (
    <div>
      <div>
        <NameWrap>{userName}</NameWrap> <LevelWrap>{level}</LevelWrap>
      </div>
      <AmountWrap>
        {type === 'outbound'
          ? `누적 송금액: ${addComma(sum_usd)}/US${addComma(
              max_usd,
            )} 송금가능금액 :
        ₩ ${addComma(avail_won)} (${thisYear}-12-31 까지 적용)`
          : `누적 수취액: ${addComma(sum_usd)}/US${addComma(
              max_usd,
            )} 수취가능금액 :
      ₩ ${addComma(avail_won)} (${thisYear}-12-31 까지 적용)`}
      </AmountWrap>
      <List
        searchData={searchData}
        subURL={`/transaction/customer/remittance?userId=${userId}&type=${type}`}
        listOptions={{
          onRowClicked: () => {},
          title: '',
          pointerOnHover: false,
        }}
        onRowClicked={false}
        columnOptions={{ email: { width: '300px' } }}
        cellFn={(
          row: any,
          idx: number,
          col: IDataTableColumn,
          id: string | number,
        ) => {
          return col.selector === 'transaction_id' ? (
            <div onClick={() => handleDetailModal(row)}>
              <LinkColor>{row.transaction_id}</LinkColor>
            </div>
          ) : col.selector === 'fx_report_usd_amount' ? (
            <button onClick={() => onClickReport(row)}>
              {row.fx_report_usd_amount
                ? addComma(row.fx_report_usd_amount)
                : '상세보기'}
            </button>
          ) : (
            <div>{row[col.selector as string]}</div>
          );
        }}
      />
      <CommonModal
        body={renderReportModal(Row)}
        footer="close"
        isModal={isModal}
        setIsModal={setIsModal}
      />
      <CommonModal
        body={
          type === 'outbound' ? (
           null
          ) : (
            null
          )
        }
        footer="close"
        isModal={isDetailModal}
        setIsModal={setIsDetailModal}
        size="xl"
        // onConfirm={onConfirm}
      />
    </div>
  );
};

export default TransactionList;

const NameWrap = styled.span<any>`
  font-size: 2rem;
  font-weight: bold;
`;
const LevelWrap = styled.span<any>`
  font-size: 1rem;
  color: darkGray;
`;
const AmountWrap = styled.div<any>`
  padding: 10px 20px;
  font-size: 1rem;
  color: darkGray;
  border: 20px solid #eee;
`;
const LinkColor = styled.span<any>`
  color: blue;
  text-decoration: underline;
`;

const ReportTable = styled.table<any>`
  width: 100%;
`;
const ReportTh = styled.th<any>`
  padding: 15px;
  width: 50%;
  color: white;
  background: black;
`;
const ReportTd = styled.td<any>`
  padding: 15px;
`;
