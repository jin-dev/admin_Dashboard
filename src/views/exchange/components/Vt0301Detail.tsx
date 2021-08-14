import {
  CButton,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
  CTextarea,
  CCardBody,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react';
import React, { useEffect, useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useLocation } from 'react-router';
import { apiProvider } from 'services/modules/provider';
import { addComma } from 'utils/number';
import styled from 'styled-components';
import axios from 'axios';
import { isNullishCoalesce } from 'typescript';
import { useImmer } from 'use-immer';
//TODO
// API data OK
// print received data to print (TODO)

interface Info {
  [index: string]: string;
}

function Vt0301Detail(props: any) {
  const paramId = useParams<Info>().id;
  const id = props.id || paramId;
  const { register, errors, handleSubmit } = useForm();

  const [columns, setColumns] = useImmer([]);
  const [detailData, setDetailData] = useState<Info>({});
  const { state }: any = useLocation();
  const [memo, setMemo] = useState('');

  const detailKey: Info = {
    ut_english_name: 'UT 영문이름',
    full_text_code: '전문 코드',
    ut_korean_name: 'UT 국문이름',
    stopped_account: '정지된 가상계좌',
    victims_phone: '피해자 연락처',
    sending_status: 'VT0302 발송 상태',
    victims_birthday: '피해자 생년월일',
    ut_customer_id: 'UT 고객번호',
    user_id: '아이디',
    victims_name: '피해자 성명',
    id: '관리번호',
    create_date: '발생일',
    full_text_content: '전문내용',
  };

  useEffect(() => {
    axios
      .get(`api/v1/admin/exchange/vt0301_detail?id=${state?.id}`)
      .then((res: any) => {
        if (res.data.code === 200) {
          const { detail, latest_exchange } = res.data.data;

          setDetailData(detail);
          console.log('MUAH');
        } else if (res.data.code === 900) {
        } else {
        }
      })
      .finally(() => {});
  }, []);

  function sendToVt0302() {
    axios
      .post('api/v1/admin/exchange/vt0302_send')
      .then(res => {
        if (res.data.code === 200) {
          console.log('MUAHAHAH');
        }

        if (res.data.code === 900) {
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {});
  }

  //메모 수정

  return (
    <Fragment>
      <CCardBody>
        <CTabs>
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink>VT0301 상세보기</CNavLink>
            </CNavItem>
          </CNav>

          <CTabContent>
            <CTabPane>
              <Table>
                <colgroup>
                  <col width="200" />
                  <col />
                </colgroup>
                <tbody>
                  {Object.keys(detailData).length > 0
                    ? Object.keys(detailKey).map((v: string) => (
                        <tr key={v}>
                          <th className="bg-dark">{detailKey[v]}</th>

                          {detailData[v] !== 'VT0302 발송 전' ? (
                            <td>{detailData[v]}</td>
                          ) : (
                            <td>
                              {detailData[v]} {'   '}
                              <CButton
                                type="submit"
                                size="sm"
                                color="info"
                                onClick={() => sendToVt0302()}
                              >
                                {' '}
                                VT0302 발송{' '}
                              </CButton>
                            </td>
                          )}
                        </tr>
                      ))
                    : Object.keys(detailKey).map((v: string) => (
                        <tr key={v}>
                          <th className="bg-dark">{detailKey[v]}</th>
                          <td>{''}</td>
                        </tr>
                      ))}
                </tbody>
              </Table>
            </CTabPane>
          </CTabContent>
        </CTabs>
      </CCardBody>

      <CRow>
        <h1> MUAHAH </h1>
      </CRow>
    </Fragment>
  );
}
export default Vt0301Detail;

const Table = styled.table`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  width: 100%;
  & th {
    background: #eee;
    padding: 10px;
  }
  tr + tr > th,
  tr + tr > td {
    border-top: 1px solid #ddd;
  }
  input {
    padding-left: 20px;
  }
`;
