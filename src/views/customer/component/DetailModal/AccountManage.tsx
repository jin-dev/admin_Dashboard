import React, { useEffect, useState } from 'react';
import { Button } from 'react-rainbow-components';
import { CInput, CSelect, CRow, CCol, CButton, CTextarea } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import EditButton from './EditButton';
import styled from 'styled-components';
import { ID_TYPE, KOREAN_ID_TYPE, REJECT_REASON } from 'common/commonCode';
import { dateFormatter } from 'utils/timeFormatter';
import { apiProvider } from 'services/modules/provider';
import { CommonModal } from '../../../../components/CommonModal';

import LargeModal from '../LargeModal';
import { setLoading } from 'redux/features/common/commonSlice';
import { Link } from 'react-router-dom';
import ResignButton from './ResignButton';
const ID_STATUS: any = ['인증대기', '인증거절', '인증완료'];

const AccountManage = ({ userData, isMemo, setRefresh }: any) => {
  const [settingData, setSettingData] = useState({ ...userData?.detail });
  const [rawData, setRawData] = useState(userData?.detail);
  const [editMode, setEditMode] = useState(false);
  const [isModal, setIsModal] = useState<any>(false);
  const [dupModal, setDupModal] = useState(false);
  const [rootId, setRootId] = useState(userData?.detail?.root_id);

  useEffect(() => {
    const identity_issue = userData?.detail.identity_issue;
    let issueList = {
      identity_issue0: '0',
      identity_issue1: '0',
      identity_issue2: '0',
    };
    if (!identity_issue || !identity_issue?.identity_issue0) {
      const memo = userData?.detail.memo;

      issueList.identity_issue0 = (memo || '').includes(
        '신분증 진위 확인: 일치',
      )
        ? '1'
        : '0';
      issueList.identity_issue1 = (memo || '').includes(
        '특이사항 : 메일 X, 전화번호 X',
      )
        ? '1'
        : '0';
      issueList.identity_issue2 = (memo || '').includes('유선확인 : 불필요')
        ? '1'
        : '0';
    } else {
      issueList = {
        identity_issue0: identity_issue[0] || '0',
        identity_issue1: identity_issue[1] || '0',
        identity_issue2: identity_issue[2] || '0',
      };
    }
    const dateSetted = {
      ...userData?.detail,
      ...issueList,
      expiration_date: dateFormatter(userData?.detail.expiration_date),
      alien_issued_date: dateFormatter(userData?.detail.alien_issued_date),
    };

    setSettingData(dateSetted);
    setRawData(dateSetted);
    setEditMode(false);
  }, [userData?.detail]);

  if (!settingData) return <></>;
  if (!rawData) return <></>;

  const {
    id,
    country_id,
    identity_type,
    identity_status,
    identity_status_dec,
    document_status_dec,
    status_name,
    memo,
    root_id,
    path,
  } = settingData;

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSettingData({ ...settingData, [name]: value });
  };

  const handleEditmode = () => {
    setEditMode(!editMode);
  };

  const handleReset = () => {
    setSettingData(rawData);
  };

  const handleMerge = async () => {
    if (window.confirm('병합하시겠습니까?')) {
      console.log({ userId: id });
      try {
        const result = await apiProvider.put('/customer/merge_user', {
          userId: id,
        });
        if (!result.success) {
          alert(result.msg || result.detailMsg);
          return false;
        } else {
          return true;
        }
        //TODO: 병합후 data refresh ?
      } catch (err) {
        alert('error ' + err.msg);
        return false;
      }
    }
  };
  const checkDupilcate = () => {
    setDupModal(true);
  };

  function renderRejectModal() {
    if (settingData.identity_status == '1') {
      return (
        <div>
          Are you sure you want to set to "{ID_STATUS[1]}"?
          <br />
          <CSelect
            name="reject_reason"
            onChange={handleInputChange}
            value={settingData.reject_reason}
          >
            {REJECT_REASON.map((o: any, idx: number) => (
              <option value={o.code} key={'reasons' + idx}>
                {o.label}
              </option>
            ))}
          </CSelect>
          {settingData.reject_reason === 'others' && (
            <CInput type="text" name="reasonWhy" onChange={handleInputChange} />
          )}
        </div>
      );
    } else if (
      rawData.identity_status == '0' &&
      status_name === 'pending' &&
      userData.all_user.length > 1 &&
      settingData.identity_status === '2'
    ) {
      return `Are you sure you want to set to "Merge"?`;
    } else {
      return `Are you sure you want to set to "${
        ID_STATUS[settingData.identity_status]
      }"?`;
    }
  }

  const handleChangeStatus = (e: any) => {
    handleInputChange(e);
    if (e.target.value === '') return;
    setIsModal(true);
  };

  async function onConfirm() {
    const { identity_status, identity_id } = settingData;
    let data: any = {
      status: identity_status,
      identity_id,
    };

    if (identity_status == 1) {
      const {
        locale_code,
        email,
        reject_reason,
        reasonWhy,
        fullname,
        korean_name,
      } = settingData;

      data = {
        ...data,
        locale_code,
        email,
        reject_reason,
        reasonWhy,
        fullname,
        korean_name,
      };
    }
    if (
      rawData.identity_status == '0' &&
      status_name === 'pending' &&
      userData.all_user.length > 1
    ) {
      const isMerged = await handleMerge();
      if (!isMerged) {
        alert('병합되지 않았습니다.');
        return;
      }
    }
    try {
      const result = await apiProvider.put('/customer/account/status_save', {
        params: data,
      });
      if (result.success) {
        alert(result.detailMsg || '저장 성공');
        setRawData(settingData);
        setRefresh((refresh: number) => ++refresh);
      } else {
        alert(result.detailMsg || 'error!');
        setSettingData(rawData);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const onCancel = () => {
    setSettingData(rawData);
  };

  const handleSubmit = async () => {
    const {
      id: userId,
      identity_id,
      alien_issued_date,
      alien_number,
      memo,
      identity_type,
      identity_status,
      expiration_date,
      id_confirm_date: confirmDate,
      identity_number,
      locale_code,
      email,
      reject_reason,
      fullname,
      korean_name,
      identity_issue0,
      identity_issue1,
      identity_issue2,
    } = settingData;

    const name = country_id === 1 ? 'korean_name' : 'fullname';
    let data = {
      userId,
      identity_id,
      status: identity_status,
      memo,
      identity_type,
      number: identity_number,
      alien_issued_date,
      alien_number,
      expiration_date,
      confirmDate,
      locale_code,
      email,
      reject_reason,
      [name]: fullname || korean_name,
      identity_issue: {
        0: identity_issue0,
        1: identity_issue1,
        2: identity_issue2,
      },
    };
    let submitData: any = {};
    for (let key in data) {
      if (data[key] === undefined || data[key] === null) continue;
      submitData[key] = data[key];
    }

    if (window.confirm('변경하시겠습니까?')) {
      setLoading(true);
      try {
        const result = await apiProvider.post(
          'customer/account/save',
          submitData,
        );
        if (result.success) {
          setRawData(settingData);
          setEditMode(false);
          alert(result.detailMsg || '저장되었습니다.');
        } else {
          alert(result.detailMsg || 'error!');
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClickIdInfo = () => {
    let url;

    switch (identity_type) {
      case '0':
      case '2':
        url =
          country_id === 1
            ? 'https://www.gov.kr/main?a=AA090UserJuminIsCertApp&img=031'
            : 'https://www.hikorea.go.kr/resv/ResvIntroR.pt';
        break;
      case '1':
        url =
          'https://www.safedriving.or.kr/LnrForRtnLicns/LnrForRtnLicnsTruthYn.do?menuCode=MN-PO-1241';
        break;
      default:
        return;
    }
    window.open(url);
  };

  const handleClickCheckBox = (e: any, idx: number) => {
    const { name, checked } = e.target;
    let memoValue = memo || '';
    const addMsg =
      idx === 0
        ? '신분증 진위 확인: 일치'
        : idx === 1
        ? '특이사항 : 메일 X, 전화번호 X'
        : '유선확인 : 불필요';
    if (checked) {
      memoValue = memoValue + '\n' + addMsg;
    } else {
      memoValue = memoValue.replaceAll(addMsg, '');
    }
    setEditMode(true);

    setSettingData({
      ...settingData,
      memo: memoValue,
      ['identity_issue' + idx]: checked ? '1' : '0',
    });
  };

  const checkBoxList = [
    '신분증 진위',
    '특이 사항 없음(메일, 전화)',
    '유선확인 불필요',
  ];

  const accountData = [
    {
      keyName: 'bank_confirm_date',
      label: '계좌개설 일자',
    },
    {
      keyName: 'identity_status_dec',
      label: '계정 인증',
      format: () => {
        return (
          <StatusWrap status={identity_status_dec}>
            {settingData.identity_status_dec === '인증완료' && (
              <CIcon name="cil-check-circle" />
            )}
            {' ' + settingData.identity_status_dec}
          </StatusWrap>
        );
      },
    },
    {
      keyName: 'document_status_dec',
      label: '신분증 문서',
      format: (data: any) => {
        return (
          <>
            <CRow>
              <CCol xs="3">
                <Wrapper status={document_status_dec}>
                  {settingData.document_status_dec === '인증완료' && (
                    <CIcon name="cil-check-circle" />
                  )}
                  {' ' + settingData.document_status_dec}
                </Wrapper>
              </CCol>

              <CCol xs="5">
                <Wrapper status={document_status_dec}>
                  {settingData.id_confirm_date}
                </Wrapper>
              </CCol>
              <CCol xs="4">
                <CSelect
                  name="identity_status"
                  value={settingData.identity_status || ''}
                  onChange={handleChangeStatus}
                  width="100px"
                >
                  <option value=""></option>

                  {ID_STATUS.map((status: string, idx: number) => (
                    <option value={String(idx)} key={'id_status' + idx}>
                      {status}
                    </option>
                  ))}
                  {ID_TYPE[settingData.identity_type]}
                </CSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="3">
                {settingData.path && (
                  <Wrapper>
                    <a
                      href={
                        '/api/v1/admin/common/image/download/' +
                        path +
                        '?user_id=' +
                        id
                      }
                      target="_blank"
                    >
                      <CButton size="sm" color="info">
                        id사진보기
                      </CButton>
                    </a>
                  </Wrapper>
                )}
              </CCol>
              <CCol xs="5">
                <Wrapper>
                  <ul>
                    {checkBoxList.map((item: any, idx: number) => (
                      <li key={'checkbox' + idx}>
                        <label>
                          <input
                            type="checkbox"
                            name={'identity_issue' + idx}
                            checked={
                              settingData['identity_issue' + idx] === '1'
                            }
                            onChange={e => handleClickCheckBox(e, idx)}
                          />
                          {' ' + item}
                        </label>
                      </li>
                    ))}
                  </ul>
                </Wrapper>
              </CCol>
              <CCol xs="4">
                <Wrapper ta={'right'}>
                  <Button onClick={handleClickIdInfo}>
                    {identity_type == '0'
                      ? country_id === 1
                        ? '주민등록증'
                        : '외국인등록증'
                      : identity_type == '1'
                      ? '운전면허증'
                      : '외국인등록증'}
                  </Button>
                </Wrapper>
              </CCol>
            </CRow>
          </>
        );
      },
    },
    {
      keyName: 'identity_type',
      label: '종류',
      format: () => {
        let options = [];
        for (let key in KOREAN_ID_TYPE) {
          options.push({ keyName: key, label: KOREAN_ID_TYPE[key] });
        }

        return (
          <CSelect
            name="identity_type"
            disabled={!editMode}
            value={settingData.identity_type || ''}
            onChange={handleInputChange}
          >
            <option value=""></option>

            {options.map((o: any) => (
              <option value={String(o.keyName)} key={o.keyName}>
                {o.label}
              </option>
            ))}
            {ID_TYPE[settingData.identity_type]}
          </CSelect>
        );
      },
    },
  ];

  const abroadLicense = [
    { keyName: 'identity_number', label: '외국인등록번호', format: 'input' },
    {
      keyName: 'expiration_date',
      label: '운전면허증 만료일자',
      format: 'input',
    },
    { keyName: 'alien_number', label: '여권 번호', format: 'input' },
  ];

  const abroadPassport = [
    { keyName: 'identity_number', label: '외국인등록번호', format: 'input' },
    {
      keyName: 'alien_issued_date',
      label: '외국인등록증 발급일자',
      format: (data: any) => {
        return (
          <CInput
            type="text"
            name={data.keyName}
            value={settingData[data.keyName] || ''}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        );
      },
    },
    { keyName: 'alien_number', label: '여권 번호', format: 'input' },
    {
      keyName: 'expiration_date',
      label: '여권만료일자',
      format: (data: any) => {
        return (
          <CInput
            type="text"
            name={data.keyName}
            value={settingData[data.keyName] || ''}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        );
      },
    },
  ];

  const koreanDataItem = [
    {
      keyName: 'identity_number',
      label: '실명확인번호',
      format: (data: any) => {
        return (
          <div>
            <CInput
              type="text"
              name={data.keyName}
              value={settingData[data.keyName] || ''}
              onChange={handleInputChange}
              disabled={!editMode}
            />

            {/* status_name -> pending or (status->2)
identity_status -> 0 (created) */}
            {userData.all_user.length > 1 &&
              status_name === 'pending' &&
              rawData.identity_status == '0' && (
                <>
                  <br />
                  <DuplicateBtn onClick={checkDupilcate}>
                    root_id {root_id} 중복 계정 확인
                  </DuplicateBtn>
                  {/* <DuplicateBtn onClick={handleMerge}>병합</DuplicateBtn> */}
                  <br />

                  <RedText>
                    중복 결과를 확인해주세요. 인증완료 선택 후 병합해주세요.
                  </RedText>
                </>
              )}
          </div>
        );
      },
    },
    {
      keyName: 'expiration_date',
      label: '신분증 유효기간',
      format: (data: any) => {
        return (
          <CInput
            type="text"
            name={data.keyName}
            value={settingData[data.keyName] ?? ''}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        );
      },
    },
  ];

  const dataByOptions: any =
    country_id == 1
      ? koreanDataItem
      : identity_type == 1
      ? abroadLicense
      : abroadPassport;

  const renderInfo = (data: any) => {
    return (
      <>
        {data.format ? (
          data.format === 'input' ? (
            <CInput
              type="text"
              name={data.keyName}
              value={settingData[data.keyName] || ''}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          ) : (
            data.format(data)
          )
        ) : (
          <span>{settingData[data.keyName]}</span>
        )}
      </>
    );
  };

  return settingData ? (
    <div>
      <Head>
        <span>계정관리</span>
        <EditButton
          label="계정정보 수정"
          editMode={editMode}
          handleEditmode={handleEditmode}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
          loading={false}
        />
      </Head>
      <Table>
        <colgroup>
          <col width="200" />
          <col />
        </colgroup>
        <tbody>
          {accountData.map((data: any, i: number) => (
            <tr key={i}>
              <th>{data.label}</th>
              <td>{renderInfo(data)}</td>
            </tr>
          ))}
          {dataByOptions.map((data: any, i: number) => (
            <tr key={'byOptions' + i}>
              <th>{data.label}</th>
              <td>{renderInfo(data)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {isMemo ? (
        <>
          <Head>
            <span>Memo</span>

            <ResignButton userId={userData?.detail?.id} />
          </Head>
          <CRow>
            <CCol xs="12">
              <CTextarea
                name="memo"
                value={settingData.memo || ''}
                onChange={handleInputChange}
                id="textarea-input"
                rows={9}
                // disabled={!editMode}
                onClick={!editMode ? handleEditmode : () => {}}
              />
            </CCol>
          </CRow>
        </>
      ) : null}

      <CommonModal
        body={renderRejectModal()}
        footer="confirmNcancel"
        isModal={isModal}
        setIsModal={setIsModal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />

      <LargeModal
        showModal={dupModal}
        setShowModal={setDupModal}
        userId={rootId}
        setUserId={setRootId}
      />
    </div>
  ) : (
    <></>
  );
};

export default AccountManage;

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

const Wrapper = styled.div<any>`
  padding: 5px;
  padding-left: 20px;
  width: 100%;
  text-align: ${props => props.ta};
  color: ${props =>
    props.status === '인증완료' || props.status === undefined
      ? 'black'
      : '#999'};
`;

const StatusWrap = styled.span<any>`
  color: ${props => (props.status === '인증완료' ? 'black' : '#999')};
`;

const RedText = styled.span<any>`
  color: red;
`;

const DuplicateBtn = styled.button<any>`
  margin-right: 10px;
`;
