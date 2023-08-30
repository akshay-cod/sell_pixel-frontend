import React, { useMemo, useRef, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { colorsV2 } from '../../configs/theme/color';



const TableUI = ({sellingsData}) => {
    const theme = createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#81980f'
          },
          secondary: {
            main: '#00bcd4'
          },
         
        },
        typography: {
            fontFamily:"GraphikRegular",
          }
      });
    const columns = useMemo(
        () => [
          {
            accessorKey: 'name', //simple recommended way to define a column
            header: 'Name',
            // muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props
           // Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
          },
          {
            accessorKey: 'number', 
            header: 'Number',
          },
          {
            accessorKey: 'email', 
            header: 'Email',
          },
          {
           // accessorFn: (row) => row.price, //alternate way
            //id: 'price', //id required if you use accessorFn instead of accessorKey
            accessorKey: 'price',
            header: 'Price',
          //  Header: () => <i>price</i>, //optional custom header render
          },
          {
            accessorKey: 'commision_amount', 
            header: 'Commission Amount',
          },
          {
            accessorKey: 'transaction_id', 
            header: 'Transaction Id',
          },
          {
            accessorKey: 'type', 
            header: 'Type',
          }
        ],
        [sellingsData],
      );

      const rowData = useMemo(()=>{
        const newData = sellingsData?.map((row)=>{
          return {
            name:row?.purchased_user?.first_name ? row?.purchased_user?.first_name : "unknown",
            price:row.price,
            number:row?.purchased_user?.phone_number,
            email:row?.purchased_user?.email ? row?.purchased_user?.email : "not found",
            commision_amount:row?.commisson?.commission_share,
            transaction_id:row?.purchase_history?.transaction_history[0]?.bank_ref_num,
            type:row?.profile ? "profile" : "creations"
          }
        }) || []
        return newData
      },[sellingsData])
    
      //optionally, you can manage any/all of the table state yourself
      const [rowSelection, setRowSelection] = useState({});
    
      useEffect(() => {
        //do something when the row selection changes
      }, [rowSelection]);
    
      //Or, optionally, you can get a reference to the underlying table instance
      const tableInstanceRef = useRef(null);
    
      const someEventHandler = () => {
        //read the table state during an event from the table instance ref
        console.log(tableInstanceRef.current.getState().sorting);
      }
      return (
        <ThemeProvider theme={theme}>
        <MaterialReactTable
           
           enableToolbarInternalActions={true}
           enableColumnActions={false}
           enableColumnResizing={true}
           enableHiding={false}
           enableDensityToggle={false}
           enableTopToolbar={true}
           enableClickToCopy={true}
           enableFullScreenToggle={false}
           enableColumnFilterModes={true}
           muiTableContainerProps={{
            sx:{
              color:colorsV2.text.placeholder
            }
           }}
          muiTableBodyCellProps={{
            sx:{
                border:"none",
                color:colorsV2.text.placeholder
            }
          }}

          muiTablePa={
            {
                sx:{
                    border:"none",
                    color:colorsV2.text.placeholder
                }
              }
          }

          muiTopToolbarProps={
            {
                sx:{
                    border:"none",
                    background:"rgb(34, 34, 34)"
                }
              }
          }

          muiTableHeadCellProps={
            {
                sx:{
                    border:"none",
                    color:colorsV2.text.placeholder
                }
              }
          }
          columns={columns} 
          data={rowData} 
          //enableColumnOrdering //enable some features
         // enableRowSelection 
         initialState={{ pagination: { pageSize: 5, pageIndex: 0 } }}
        muiTablePaginationProps={{
        sx:{color:colorsV2.text.placeholder},
        rowsPerPageOptions: [5, 10, 20],
        showFirstButton: false,
        showLastButton: false,
        SelectProps: { native: true },
        labelRowsPerPage: 'data per page',
        }}
          enablePagination={true} //disable a default feature
         // onRowSelectionChange={setRowSelection} //hoist internal state to your own state (optional)
        //  state={{ rowSelection }} //manage your own state, pass it back to the table (optional)
          //tableInstanceRef={tableInstanceRef} //get a reference to the underlying table instance (optional)
        />
        </ThemeProvider>
      );
}

export default TableUI;