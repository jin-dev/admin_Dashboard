import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { CButton } from '@coreui/react';


export const ExportToExcel = ({ apiData, fileName }: any) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (apiData: any, fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <CButton
      color="success"
      className="mr-3"
      onClick={(e: any) => exportToCSV(apiData, fileName)}
    >
      엑셀 다운로드
    </CButton>
  );
};
