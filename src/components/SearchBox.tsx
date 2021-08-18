import React, { Fragment, useState } from 'react';
import { DatePicker } from 'react-rainbow-components';
import {
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CForm,
  CInput,
  CRow,
  CCardFooter,
  CButton,
  CSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { searchItemsType } from 'types/definedType';
import Select from 'react-select';
import styled from 'styled-components';

interface Props {
  query: string | number;
  handleQuery: (value: any) => void;
  searchData: object[];
}

function SearchBox(props: Props) {
  const { searchData, handleQuery } = props;
  const [inputs, setInputs] = useState<any | searchItemsType>({});

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleChange = (e: any, name?: string, value?: any) => {
    if (!e) {
      setInputs({
        ...inputs,
        [name!]: value,
      });
      return;
    }
    handleInputChange(e);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    handleQuery(inputs);
  };

  //Reset 버튼 클릭시 input 값들 초기화
  const handleReset = (e: Event) => {
    e.preventDefault();
    handleQuery({});
    setInputs({});
  };

  const clearDate = () => {
    setInputs({
      ...inputs,
      date: null,
    });
  };

  const renderContent = (item: searchItemsType, idx: number, all: any) => {
    if (item.type) {
      switch (item.type) {
        case 'DatePicker':
          return (
            <DateCell>
              <DatePicker
                name="date"
                placeholder="Select range of dates"
                selectionType="range"
                formatStyle="large"
                variant="single"
                onChange={date => handleChange(null, 'date', date)}
                value={inputs.date}
              />
              <CButton size="sm" color="danger" onClick={clearDate}>
                x
              </CButton>
            </DateCell>
          );
        case 'select':
          return (
            item.datalist && (
              <CSelect
                name={item.keyName}
                onChange={handleChange}
                value={inputs[item.keyName] || ''}
              >
                <option value="">Select All</option>
                {item.datalist.map((o: any) =>
                  typeof o === 'string' ? (
                    <option value={o}>{o}</option>
                  ) : (
                    <option value={o.code} key={o.code}>
                      {o.value || o.name}
                    </option>
                  ),
                )}
              </CSelect>
            )
          );
        case 'msoSelect':
          return (
            item.datalist && (
              <CSelect
                name={item.keyName}
                onChange={handleChange}
                value={inputs[item.keyName] || ''}
              >
                <option value="">Select All</option>
                {item.datalist.map((o: any) => (
                  <option value={o.label} key={o.label}>
                    {o.value || o.name}
                  </option>
                ))}
              </CSelect>
            )
          );
        case 'selectInput':
          //국가 검색
          // item : { label:'국적' keyName:'countryId',type:'selectInput' , datalist :[]}
          return (
            <Select
              name={item.keyName}
              value={inputs[item.keyName] || []}
              options={item.datalist}
              onChange={(newValue: any) =>
                handleChange(null, item.keyName, newValue)
              }
              isClearable={true}
            />
          );
      }
    }

    if (item?.format) {
      return item.format(
        inputs[item.keyName] || '',
        handleChange,
        item,
        idx,
        all,
      );
    }

    return (
      <CInput
        name={item.keyName}
        placeholder={item?.placeholder}
        onChange={handleInputChange}
        value={inputs[item.keyName] || ''}
      />
    );
  };

  return (
    <CRow>
      <CCol xs="12" lg="15">
        <CCard>
          <CForm onSubmit={onSubmit}>
            <CCardBody>
              {searchData.map((item: any, idx: number, all: any) =>
                Array.isArray(item) ? (
                  <CRow key={'searchRow' + idx}>
                    {item.map((o, i, a) => (
                      <Fragment key={i}>
                        <CCol xs="2" key={`searchItem${idx}-${i}`}>
                          {o.label}
                        </CCol>
                        <CCol
                          xs={
                            o.size
                              ? o.size
                              : (12 - 2 * item.length) / item.length
                          }
                        >
                          <CFormGroup>{renderContent(o, i, a)}</CFormGroup>
                        </CCol>
                      </Fragment>
                    ))}
                  </CRow>
                ) : (
                  <CRow key={'searchRow' + idx}>
                    <CCol xs="2">{item.label}</CCol>
                    <CCol xs={item.size ? item.size : 10}>
                      <CFormGroup>{renderContent(item, idx, all)}</CFormGroup>
                    </CCol>
                  </CRow>
                ),
              )}
            </CCardBody>
            <CCardFooter align="right">
              <CButton type="submit" size="sm" color="primary">
                <CIcon name="cil-scrubber" /> Search
              </CButton>
              <CButton
                type="reset"
                size="sm"
                color="danger"
                onClick={handleReset}
              >
                <CIcon name="cil-ban" /> Reset
              </CButton>
            </CCardFooter>
          </CForm>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default SearchBox;

const DateCell = styled.div`
  display: flex;
`;
