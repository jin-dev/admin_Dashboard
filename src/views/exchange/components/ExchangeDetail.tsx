import {
  CButton,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
  CTextarea,
} from '@coreui/react';
import React, { useEffect, useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useLocation } from 'react-router';
import { apiProvider } from 'services/modules/provider';
import { addComma } from 'utils/number';

import axios from 'axios';

//TODO
// API data OK
// print received data to print (TODO)

interface Info {
  [index: string]: string;
}

function ExchangeDetail(props: any) {
  const paramId = useParams<Info>().id;
  const id = props.id || paramId;
  const { register, errors, handleSubmit } = useForm();

  const [detailData, setDetailData] = useState<any>({});
  const [exchangeData, setExchangeData] = useState<Info>({});
  const [exchangeStatusData, setExchangeStatusData] = useState<Info>({});
  const [resellData, setResellData] = useState<Info>({});
  const { state }: any = useLocation();

  const [memo, setMemo] = useState('');

  const exchangeKey: Info = {
    account_number: 'account_number',
    bank_name: '은행 명',
    benefit_ratio: '적용 우대율',
    box_barcode: '',
    customer_name: '고객 명',
    deposit_bank_name: '',
    deposit_method: '출금방식',
    exchange_num: '',
    exchange_rate: '고객 환율',
    exchange_volume: '',
    fee: '수수료',
    first_name: '',
    from_amount: '고객 입금금액',
    from_currency_code: '고객 입금통화',
    from_principal_amount: '고객 환전원금',
    id: '',
    last_name: '',
    receipt_date: '',
    store_name: '수령 신청장소',
    to_amount: '',
    to_currency_code: '',
    user_id: '',
    virtual_account_number: '',
  };

  const exchange_statusKey: Info = {
    create_date: '',
    fullname: '',
    id: '',
    status: '',
    status_num: '',
    resell: '',
  };

  const resellKey: Info = {
    resell_ratio: '되팔기 적용환율',
    resell_reason: '되팔기 사유',
    memo: '되팔기 메모',
    id: '회원 ID',
    failed_reason: '되팔기 실패 사유',
    resell_amount: '되팔기 지급금액',
  };

  useEffect(() => {
    axios
      .get(`api/v1/admin/exchange/detail_by_id/?id=${state?.id}`)
      .then((res: any) => {
        if (res.data.code === 200) {
          const { exchange, exchange_status, resell } = res.data.data;
          setDetailData(res.data.data);
          setExchangeData(exchange);
          setExchangeStatusData(exchange_status);
          setResellData(resell ? resell : {});
        } else if (res.data.code === 900) {
        } else {
        }
      })
      .finally(() => {});
  }, []);

  //메모 수정

  return (
    <Fragment>
      <CRow>
        <h1> 환전 상세 정보</h1>
        <CButton type="submit" size="" color="info">
          파일 다운로드
        </CButton>
        <CButton type="submit" size="" color="warning">
          사고건 처리
        </CButton>
        <CButton type="submit" size="" color="danger">
          환전 취소
        </CButton>
      </CRow>

      <CRow className="bg-white">
        <table className="table w-50">
          <thead>
            <tr>
              <th scope="col" className="border-0">
                환전 정보
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(exchangeData).length > 0
              ? Object.keys(exchangeKey).map((v: string) => (
                  <tr key={v}>
                    <th className="bg-dark">{exchangeKey[v]}</th>
                    <td>{exchangeData[v]}</td>
                  </tr>
                ))
              : Object.keys(exchangeKey).map((v: string) => (
                  <tr key={v}>
                    <th className="bg-dark">{exchangeKey[v]}</th>
                    <td>{''}</td>
                  </tr>
                ))}
          </tbody>
        </table>

        <table className="table w-50">
          <thead>
            <tr>
              <th scope="col" className="border-0">
                환전 상태
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(exchangeData).length > 0
              ? Object.keys(exchangeKey).map((v: string, ㅍㅁ) => (
                  <tr key={v}>
                    <th className="bg-dark">{exchangeKey[v]}</th>
                    <td>{exchangeData[v]}</td>
                  </tr>
                ))
              : Object.keys(exchangeKey).map((v: string) => (
                  <tr key={v}>
                    <th className="bg-dark">{exchangeKey[v]}</th>
                    <td>{''}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </CRow>
      <CRow className="bg-white">
        <table className="table w-50">
          <thead>
            <tr>
              <th scope="col" className="border-0">
                되팔기 정보
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(resellData).length > 0
              ? Object.keys(resellKey).map((v: string, ㅍㅁ) => (
                  <tr key={v}>
                    <th className="bg-dark">{resellKey[v]}</th>
                    <td>{resellData[v]}</td>
                  </tr>
                ))
              : Object.keys(resellKey).map((v: string) => (
                  <tr key={v}>
                    <th className="bg-dark">{resellKey[v]}</th>
                    <td>{''}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </CRow>

      <CRow>
        <CForm className="w-50">
          <CFormGroup>
            <CLabel htmlFor="memo" className="my-3 h5">
              비고&#128515;
            </CLabel>
            <CTextarea
              className="form-control"
              id="memo"
              name="memo"
            ></CTextarea>
          </CFormGroup>
        </CForm>
        <CForm className="w-50">
          <CFormGroup>
            <CLabel htmlFor="memo" className="my-3 h5">
              사고건 메모&#128515;
            </CLabel>
            <CTextarea
              className="form-control"
              id="memo"
              name="memo"
            ></CTextarea>
          </CFormGroup>
        </CForm>
      </CRow>
    </Fragment>
  );
}
export default ExchangeDetail;
