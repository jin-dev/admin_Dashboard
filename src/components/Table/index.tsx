import React from 'react';
import PropTypes from 'prop-types';

import {
  CBadge,
  CDataTable,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';

interface Props {
  userData: any
}

const getBadge = (status : string) => {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Inactive':
      return 'secondary';
    case 'Pending':
      return 'warning';
    case 'Banned':
      return 'danger';
    default:
      return 'primary';
  }
};
const fields = ['name', 'url', 'Email', 'website'];

const Table: React.FunctionComponent<Props> = ({ userData }) => {
  return (
    <CRow>
      <CCol xs="12" lg="15">
        <CCard>
          <CCardHeader>HAHA2 Table</CCardHeader>
          <CCardBody>
            <CDataTable
              items={userData}
              fields={fields}
              itemsPerPage={10}
              pagination
              scopedSlots={{
                status: (item : any)  => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                  </td>
                ),
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};


export default Table;
