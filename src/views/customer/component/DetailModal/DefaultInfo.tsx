import React, { useState, useEffect } from 'react';
import { CInput } from '@coreui/react';
import styled from 'styled-components';

import { apiProvider } from 'services/modules/provider';
import { useLoading } from 'components/Loading/Loading';
import { PARTNERS } from 'common/commonCode';
import EditButton from './EditButton';
import { useCommonApi } from 'hooks/useCommonApi';
import Select from 'react-select';

const infoTableData = [
  { keyName: 'email', label: '이메일' },
  { keyName: 'birthdate', label: '생년월일' },
];

const DefaultInfo = ({ userData, userId, setUserId }: any) => {
  const [settingData, setSettingData] = useState(userData?.detail);
  const [rawData, setRawData] = useState(userData?.detail);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useLoading();

  const countries: any[] = useCommonApi('available_countries') || [];

  useEffect(() => {
    const controlledData = {
      ...userData?.detail,
      countryData: countries!.filter(
        (o: any) => o.label === userData?.detail.country_name,
      ),
    };
    setSettingData(controlledData);
    setRawData(controlledData);
    setEditMode(false);
  }, [userData]);

  const handleClickId = (id: number) => {
    if (id === userId) return;
    setUserId(id);
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSettingData({ ...settingData, [name]: value });
  };

  const handleCountryChange = (newValue: any) => {
    setSettingData({ ...settingData, countryData: newValue });
  };
  const handleEditmode = () => setEditMode(!editMode);

  if (!settingData) return <></>;

  const {
    root_customer_id,
    firstname,
    middlename,
    lastname,
    email,
    birthdate,
    korean_name,
    fullname,
    address,
    zipcode,
    phone_number,
    country_id,
    country_name,
    countryData,
    recommend_code,
  } = settingData;

  //const phoneOwner = country_id === 1 ? 'korean_name' : 'fullname';
  //위 기존 값 대신 외국인도 걍 korean_name 으로 되도록 변경 (QA 262 의석실장님 말에 따라)
  const phoneOwner = country_id === 1 ? 'korean_name' : 'korean_name';
  const handleReset = () => {
    setSettingData(rawData);
  };
  const handleSubmit = async () => {
    const {
      firstname,
      middlename,
      lastname,
      email,
      birthdate,
      korean_name,
      fullname,
      country_id,
      countryData,
    } = settingData;

    const data: any = {
      userId,
      firstname,
      middlename,
      lastname,
      email,
      birthdate,
      fullname,
      [phoneOwner]: country_id === 1 ? korean_name : fullname,
      countryId: countryData.value,
    };

    const submitData: any = {};

    if (!(firstname && lastname && email && birthdate && country_id)) {
      alert('빈 값이 있습니다.');
      return;
    }
    for (let key in data) {
      if (key !== 'middlename' && !data[key]) continue;
      submitData[key] = data[key];
    }

    if (window.confirm('기본정보를 변경하시겠습니까?')) {
      setLoading(true);
      try {
        const result = await apiProvider.post('/customer/save', submitData);
        if (!result.success) {
          alert(result.detailMsg || '저장중 에러가 발생하였습니다.');
          return;
        }

        const controlledData = {
          ...rawData,
          ...submitData,
          korean_name,
          country_id,
          countryData: countries!.filter(
            (o: any) => o.value === userData?.detail.country_id,
          ),
        };
        setSettingData(controlledData);
        setRawData(controlledData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        handleEditmode();
      }
    }
  };

  const allUsers = userData?.all_user;

  return settingData ? (
    <div>
      <Head>
        <span>기본 정보</span>
        <EditButton
          label="고객정보 수정"
          editMode={editMode}
          loading={loading}
          handleEditmode={handleEditmode}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
        />
      </Head>

      <Table>
        <colgroup>
          <col width="200" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th>고객관리번호</th>
            <td>
              <InnerCont>{root_customer_id}</InnerCont>
            </td>
          </tr>
          <tr>
            <th>통합계정번호</th>
            <td>
              <InnerTable>
                <tbody>
                  <tr>
                    {allUsers &&
                      allUsers.map((o: any) => (
                        <InnerTh
                          key={'th' + o.id}
                          active={o.id === userId}
                          onClick={() => handleClickId(o.id)}
                        >
                          {PARTNERS[o.partner_id]} {o.id === userId && '*'}
                          {o.id === o.root_id && '(모)'}
                        </InnerTh>
                      ))}
                  </tr>
                  <tr>
                    {allUsers &&
                      allUsers.map((o: any) => (
                        <InnerTd
                          key={o.id}
                          active={o.id === userId}
                          onClick={() => handleClickId(o.id)}
                        >
                          {o.id}
                        </InnerTd>
                      ))}
                  </tr>
                </tbody>
              </InnerTable>
            </td>
          </tr>
          <tr>
            <th>영문명</th>
            <td>
              <label>Full name</label>
              <CInput
                type="text"
                name="fullname"
                value={fullname || ''}
                onChange={handleInputChange}
                disabled={!editMode}
              />

              <label>성</label>
              <CInput
                type="text"
                name="lastname"
                value={lastname || ''}
                onChange={handleInputChange}
                disabled={!editMode}
              />
              <label>중간 이름</label>
              <CInput
                type="text"
                name="middlename"
                value={middlename || ''}
                onChange={handleInputChange}
                disabled={!editMode}
              />
              <label>이름</label>
              <CInput
                type="text"
                name="firstname"
                value={firstname || ''}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </td>
          </tr>
          <tr>
            <th>휴대폰 소유주명</th>
            <td>
              <CInput
                type="text"
                name={phoneOwner}
                value={settingData[phoneOwner] || ''}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </td>
          </tr>
          {infoTableData.map(item => (
            <tr key={item.keyName}>
              <th>{item.label}</th>
              <td>
                <CInput
                  type="text"
                  name={item.keyName}
                  value={settingData[item.keyName] || ''}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </td>
            </tr>
          ))}

          <tr>
            <th>주소</th>
            <td>
              <CInput
                value={address ? `${address}, ${zipcode ?? ''}` : '-'}
                disabled
              />
            </td>
          </tr>

          <tr>
            <th>휴대번호</th>
            <td>
              <CInput name="phone_number" value={phone_number || ''} disabled />
            </td>
          </tr>

          <tr>
            <th>국적</th>
            <td>
              <Select
                name="countryData"
                value={countryData}
                isDisabled={!editMode}
                options={countries}
                onChange={handleCountryChange}
              />
            </td>
          </tr>

          <tr>
            <th>추천코드</th>
            <td>
              <CInput
                name="recommend_code"
                value={recommend_code || ''}
                disabled
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  ) : (
    <></>
  );
};

export default DefaultInfo;

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

const InnerTable = styled.table`
  border: 1px solid #ddd;
`;
const InnerTh = styled.th<any>`
  & + th {
    border-left: 1px solid #ddd;
  }
  background: ${(props: any) => props.active && 'pink !important'};
  cursor: ${props => !props.active && 'pointer'};
`;

const InnerTd = styled.td<any>`
  & + td {
    border-left: 1px solid #ddd;
  }
  text-align: center;
  color: ${props => !props.active && 'blue'};
  text-decoration: ${props => !props.active && 'underline'};
  cursor: ${props => !props.active && 'pointer'};
`;

const InnerCont = styled.span`
  padding-left: 10px;
`;
