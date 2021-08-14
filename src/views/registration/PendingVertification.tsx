import React, { useEffect, useState, useMemo } from 'react';
import Table from 'components/advTable';
import { apiProvider } from 'services/modules/provider';
import DataTable from 'react-data-table-component';
import { useImmer } from 'use-immer';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CContainer,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CRow,
  CCardFooter,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupText,
  CInputGroupPrepend,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

//Sample Server Side pagination
//Open API 사용 됨

const PendingVertification = () => {
  const [limit, setLimit] = useState(5);
  const [info, setInfo] = useState<any>();
  const [offset, setOffset] = useState(0);

  //
  const [modal, setModal] = useState([]);
  const [large, setLarge] = useState(false);
  const [columns, setColumns] = useImmer([]);
  const [flag, setFlag] = useState(false);
  //
  const subURL = '/api/v1/admin/customer';

  const onChange = (e: any) => {
    setLimit(e.target.value.toLowerCase());
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    Array.from(document.querySelectorAll('input')).forEach(
      input => (input.value = ''),
    );
  };

  const getTableList = () => {
    ///api/v1/admin/group/recommends?limit=10&offset=0
    apiProvider
      .getTabledata(offset, limit, subURL)
      .then((res: any) => {
        setInfo(res.data);

        setColumns(
          res.data.tableMetaData?.header.map((data: any) => ({
            selector: res.data.tableMetaData.header
              ? data.key
              : 'Default Column',
            name: data.value,
          })),
        );

        setFlag(!flag);

        //
        //
      })
      .catch((err: any) => {
        console.log('[Error] : ', err);
        //  setInfo({});
      });
  };

  useEffect(() => {
    getTableList();
  }, []);

  const handleChange = (newValue: any) => {
    setModal(prevModal => newValue);
    setLarge(!large); //talbe click 될때 모달 창 나옴
  };

  return (
    <>
      <CRow>
        <CCol xs="12" lg="15">
          <CCard>
            <CCardHeader>
              Sample
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="ccnumber">Search Value</CLabel>
                    <CInput
                      id="ccnumber"
                      placeholder="enter any number between 1 to 10"
                      onChange={onChange}
                      required
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              <CButton
                type="reset"
                size="sm"
                color="danger"
                onClick={handleReset}
              >
                <CIcon name="cil-ban" /> Reset
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>

      {flag && (
        <Table
          tableData={info}
          offset={offset}
          limit={limit}
          subURL={subURL}
          columns={columns}
          onChange={handleChange}
        />
      )}

      <CModal show={large} onClose={() => setLarge(!large)} size="xl">
        <CModalHeader closeButton>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>{JSON.stringify(modal, null, 1)}</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setLarge(!large)}>
            Do Something
          </CButton>{' '}
          <CButton color="secondary" onClick={() => setLarge(!large)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
export default PendingVertification;
