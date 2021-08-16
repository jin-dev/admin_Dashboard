import React, { useState, useEffect, Fragment } from 'react';
import { CButton, CCol, CRow } from '@coreui/react';
import { apiProvider } from 'services/modules/provider';
import styled from 'styled-components';
import { useHistorySave } from 'components/saveHistory/saveHistory';
import ListModal from './components/ListModal';
function Main() {
 

  const [historyData, setSearchData]: any = useHistorySave();
  const [showModal, setShowModal] = useState(false);

  return (
<Fragment>
    <Styles>
      <div>
        <CRow
          className="d-flex"
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            margin: '3rem 0',
          }}
        >
          <h2>Account Selection</h2>
          <p style={{ fontWeight: 700, fontSize: '1rem' }}>
            Please select your account type.
          </p>
          <hr
            style={{ border: '1px solid black', color: 'black', width: '75%' }}
          />
        </CRow>
        <CRow className="contact-div">
          <CCol>
            <div className="contact-content">
              <div className="empty-content"></div>
              <h4>Admin </h4>
              <p>
                <span>authority : Admin, Employee Menu</span>
              </p>
              <div className="contact-btn-container">
                <CButton
                   className="btn-info"
                  onClick={() => setSearchData({
                    ['type']: 'admin',
                  })}
                >
                  Select
                </CButton>
              </div>
            </div>
          </CCol>
         
          <CCol>
            <div className="contact-content">
              <div className="empty-content"></div>
              <h4>Employee</h4>
              <p>
                <span>authority : Only for Employee Menu</span>
               
              </p>
              <div className="contact-btn-container">
                <CButton
               
                  className="btn-info"
                  onClick={() => setShowModal(!showModal)}
                
                >
                Select
                </CButton>
              </div>
            </div>
          </CCol>
        </CRow>
      </div>
    </Styles>

                {showModal && <ListModal 
                
                modal ={showModal}
                setModal={setShowModal}
              />}


    </Fragment>
  );
}


export default Main;

const Styles = styled.div`
  .contact-div {
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 3rem;
    h4 {
      margin: 1rem;
      margin-top: 2rem;
      font-weight: bold;
    }
    p {
      display: flex;
      flex-direction: column;
      margin: 3rem 0;
      font-size: 1rem;
      span {
        font-weight: 600;
        margin: 0.5rem 1rem;
        display: block;
      }
    }
    div.contact-content {
      height: 40vh;
      display: flex;
      flex-direction: column;
      border: 1px solid black;
      border-radius: 5%;
      position: relative;
      overflow: hidden;
      background-color: white;
      .empty-content {
        height: 25px;
        background-color: rgba(46, 132, 230);
      }
    }
    .contact-btn-container {
      display: flex;
      justify-content: center;
      button {
        width: 150px;
        margin-top: 2rem;
        padding: 0.5rem 1.5rem;
        border-radius: 50px;
        background-color: rgba(52, 85, 207);
        position: absolute;
        bottom: 15px;
    }
      }
    }
  }
`;