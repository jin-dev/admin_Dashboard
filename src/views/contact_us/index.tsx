import React from 'react';
import { CButton, CCol, CRow } from '@coreui/react';
import styled from 'styled-components';

console.log('자동 배포를 위한 콘솔');
const sendEmail = (e: any) => {
  const {
    target: { name },
  } = e;
  window.open(`mailto:${name}@utransfer.com?&body=문의 사항을 입력해주세요`);
};
const Styles = styled.div`
  .contact-div {
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
        background-color: rgba(0, 0, 128, 0.2);
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
        background-color: rgba(106,53,156);
        position: absolute;
        bottom: 15px;
    }
      }
    }
  }
`;

function index() {
  return (
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
          <h2>CONTACT US</h2>
          <p style={{ fontWeight: 700, fontSize: '1rem' }}>
            도움이 필요하신가요? 신속하게 안내 드리겠습니다.
          </p>
          <hr
            style={{ border: '1px solid black', color: 'black', width: '75%' }}
          />
        </CRow>
        <CRow className="contact-div">
          <CCol>
            <div className="contact-content">
              <div className="empty-content"></div>
              <h4>TECH팀</h4>
              <p>
                <span>개발/기술적 도움이 필요하신가요?</span>
                <span>유트랜스퍼의 TECH팀에 문의주세요.</span>
              </p>
              <div className="contact-btn-container">
                <CButton
                  className="btn-success"
                  name="devteam"
                  onClick={sendEmail}
                >
                  문의하기
                </CButton>
              </div>
            </div>
          </CCol>
          <CCol>
            <div className="contact-content">
              <div className="empty-content"></div>
              <h4>운영/CS팀</h4>
              <p>
                <span>고객 응대 및 서비스 운영에 도움이 필요하신가요?</span>
                <span>유트랜스퍼의 운영/CS팀에 문의주세요.</span>
              </p>
              <div className="contact-btn-container">
                <CButton
                  className="btn-success"
                  name="operation"
                  onClick={sendEmail}
                >
                  문의하기
                </CButton>
              </div>
            </div>
          </CCol>
          <CCol>
            <div className="contact-content">
              <div className="empty-content"></div>
              <h4>마케팅/영업팀</h4>
              <p>
                <span>제휴 및 마케팅에 도움이 필요하신가요?</span>
                <span>유트랜스퍼의 마케팅/영업팀에 문의주세요.</span>
              </p>
              <div className="contact-btn-container">
                <CButton
                  name="marketer"
                  className="btn-success"
                  onClick={sendEmail}
                >
                  문의하기
                </CButton>
              </div>
            </div>
          </CCol>
        </CRow>
      </div>
    </Styles>
  );
}

export default index;
