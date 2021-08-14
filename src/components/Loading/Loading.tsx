import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSpinner } from '@coreui/react';
import { commonSelector, setLoading } from 'redux/features/common/commonSlice';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 2000;
`;

const Msg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  color: white;
  font-size: 40px;
  z-index: 3000;
`;

function Loading() {
  const [isLoading] = useLoading();

  return (
    <>
      {isLoading && (
        <>
          <Wrapper></Wrapper>
          <Msg>
            <CSpinner
              color="success"
              style={{ width: '4rem', height: '4rem' }}
            />
          </Msg>
        </>
      )}
    </>
  );
}

export default Loading;

export const useLoading = () => {
  const { isLoading } = useSelector(commonSelector);
  const dispatch = useDispatch();

  const setIsLoading = (show: boolean) => {
    dispatch(setLoading(show));
  };

  return [isLoading, setIsLoading] as const;
};
