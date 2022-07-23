import { useState, useEffect } from "react";
import '../App.css';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import data_history_trx from '../data/data-history-trx.json';

function Table() {

  const [dataTable, setData] = useState([])

  useEffect(() => {
    setData(data_history_trx)

   }, []);


  const columns =  [{
    name: "tahun",
    label: "Tahun",
    },
    {
    name: "bulan",
    label: "Bulan",
    },
    {
    name: "status",
    label: "Status",
    },
    {
    name: "jumlah bayar",
    label: "Jumlah Bayar",
    },
    {
    name: "volume",
    label: "Volume",
    }
  ]

  const options = {
    selectableRows: 'none',
    searchAlwaysOpen: true,
    searchPlaceholder: 'Cari Bulan Transakasi',
    print: true,
    download: true,
    responsive: 'standard'
  };

  const getMuiTheme = () => createTheme({
    components: {
      MUIDataTableBodyCell: {
        styleOverrides:{
          root: {
              backgroundColor: "white"
          }
        }
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: '#0d6efd',
          },
        },
      },
    }
  })

  return (
    <div id='table-container'>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"User History Transaction"}
          data={dataTable}
          columns={columns}
          options={options}
          />
      </ThemeProvider>
    </div>
  );
}

export default Table;