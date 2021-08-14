import React, { useState, useEffect, useRef } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { CButton } from '@coreui/react';
import { apiProvider } from 'services/modules/provider';
import { useLoading } from 'components/Loading/Loading';

export const UrlExcel = ({ subURL, gubun, type, query, fileName }: any) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const [_, setLoading] = useLoading();
  const [excelList, setExcelList] = useState<any[]>([]);

  const exportToCSV = async (fileName: string) => {
    setLoading(true);
    let excelData = [];
    try {
      const {
        data: { tableData: listData },
        success,
        detailMsg,
      } = await apiProvider.get(subURL, {
        gubun: gubun,
        type: type,
        ...query,
        excel: 1,
      });
      if (success) {
        setExcelList(listData);
        excelData = listData;
      } else {
        alert(detailMsg || 'error!');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <CButton
      color="success"
      className="mr-3"
      onClick={(e: any) => exportToCSV(fileName)}
    >
      엑셀 다운로드
    </CButton>
  );
};
