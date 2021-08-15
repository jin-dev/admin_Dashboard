import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  historySelector,
  setHistoryData,
} from 'redux/features/queryHistory/historySlice';

//검색 조건 저장용
//페이지 뒤로 가기 할때 검색 결과 사라지는걸
// RTK 로 예방 목적 (연습 겸)

export const useHistorySave = () => {
  const { historyData } = useSelector(historySelector);
  const dispatch = useDispatch();

  const setSearchData = (data: object) => {
    dispatch(setHistoryData(data));
  };

  return [historyData, setSearchData] as const;
};
