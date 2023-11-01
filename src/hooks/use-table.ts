import { useEffect, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
const calculateRange = (data: any, rowsPerPage: any) => {
  const range = [];
  const num = Math.ceil(data?.length / rowsPerPage);
  for (let i = 1; i < num; i++) {
    range.push(i);
  }

  return range;
};

const sliceData = (data: any, page: number, rowsPerPage: number) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

const useTable = (data: any, page: number, rowsPerPage: number) => {
  const [tableRange, setTableRange] = useState<any>([]);
  const [slice, setSlice] = useState<any>([]);

  useEffect(() => {
    const range = calculateRange(data, rowsPerPage);
    setTableRange([...range]);

    const slice2 = sliceData(data, page, rowsPerPage);
    setSlice([...slice2]);
  }, [data, setTableRange, page, setSlice, rowsPerPage]);

  return {
    slice,
    range: tableRange,
  };
};

export default useTable;
