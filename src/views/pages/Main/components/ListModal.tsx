
import React, { useEffect, useState, Fragment } from 'react';
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CForm,
    CFormGroup,
    CInput,
    CLabel,
    CSwitch,
    CCol,
} from '@coreui/react';
import { useHistorySave } from 'components/saveHistory/saveHistory';
import styled from 'styled-components';

import ListTable from './ListTable';
export default function ListModal({
    modal,
    setModal,
    userId,
    type,
    subURL,
    rowInfo,
}: {
    modal: boolean;
    setModal: (modal: boolean) => void;
    userId?: number;
    type?: string;
    subURL?: string;
    rowInfo?: any;
}) {
   

    const [historyData, setSearchData]: any = useHistorySave();
function selectedEmployee(info : any) {

    setSearchData({
        ...info,
        ['type']: 'employee',
    })

    setModal(!modal);
   
}   

    return (
        <Fragment>
            <CModal show={modal} onClose={() => setModal(!modal)} size="">
                <CForm >

                    <Detail>
                        <CModalHeader>
                            <CustomizedTitle> <h3> Employees List</h3></CustomizedTitle>
                        </CModalHeader>

                        <CModalBody>
                            
                        <ListTable
                            title={'excel'}
                            type={'modal'}
                            subURL={'users/'}
                            selectedEmployee ={selectedEmployee}
                            pointerOnHover
                            
                             />


                        </CModalBody>

                        <CModalFooter>
                            <CButton color="primary" onClick={() => setModal(!modal)}>
                                Close
                            </CButton>
                           
                        </CModalFooter>
                    </Detail>

                </CForm>
            </CModal>
        </Fragment>
    );
}

const CustomizedTitle = styled(CModalTitle)`
padding: 10px 20px;
`

const Detail = styled.div`
  header {
    padding: 0;
  }
`;

