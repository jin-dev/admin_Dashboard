import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  benefitSelector,
  setListData,
} from 'redux/features/benefit/benefitSlice';

//Test용 HAHA

export const useBenefit = () => {
  const { list1 } = useSelector(benefitSelector);
  const dispatch = useDispatch();

  const setbenefitList = (data: []) => {
    dispatch(setListData(data));
  };

  return [list1, setbenefitList] as const;
};
