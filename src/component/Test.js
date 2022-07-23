import * as React from "react"
import { useEffect } from "react"
import Payment from "./Payment"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Table from './Table';

export default function Test() {
    const [value, setValue] = React.useState("")
    const [lists, setLists] = React.useState([])
    const [balance, setBalance] = React.useState([])
    const [billing, setBilling] = React.useState("")
    const [open, setOpen] = React.useState(false);

    const baseUrl = "http://127.0.0.1:8000/beta?account_number="
    const balanceUrl = "http://127.0.0.1:8000/balance?account_number="

    const url = baseUrl + value
    const getBalance = balanceUrl + value

    const fetchData = async () => {
        try {
            await fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    setLists(data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchBalance = async () => {
        try {
            await fetch(getBalance)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    setBalance(data)
                    console.log(data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    //fetch data tables

    const [dataTable, setDataTable] = React.useState([])

    const baseUrlHistory = "http://127.0.0.1:8000/report?account_number="

    const urlHistoryTrx = baseUrlHistory + value

    const fetchDataTable = async () => {
        const response =
            await fetch(urlHistoryTrx)
                .then((data) => 
                     data.json()
                )
        setOpen(true)                
        setDataTable(response[0].data)
        
    }

    const generateBilling = () => {
        setBilling(+new Date())
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        generateBilling()
        fetchBalance()
        fetchData()
    }

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
          padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
          padding: theme.spacing(1),
        },
      }));
      
    const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
            <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            </IconButton>
        ) : null}
        </DialogTitle>
    );
    };
    
    BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="form">
            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-basic"
                    sx={{ m: 1 }}
                    label="Account Number"
                    variant="outlined"
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button variant="contained" onClick={handleSubmit}>
                    Search
                </Button>
                {/* Button open table dialog */}
                <Button variant="outlined" onClick={fetchDataTable}>
                    Histori Transaksi
                </Button>
                {/* Dialog COntent */}
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Riwayat Transaksi
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Table dataTable={dataTable}/>
                    </DialogContent>
                    <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Tutup
                    </Button>
                    </DialogActions>
                </BootstrapDialog>
            </Box>


            {lists.map((list) => (
                <div key={list.account_number}>
                    <h2>Halo, {list.response.first_name} {list.response.last_name}</h2>
                    {balance.map((item) => (
                        <div key={item.response.account_number}>
                            <span>
                                Balance Amount :
                                <span className="balance">{item.response.account_balance}</span>
                            </span>
                        </div>
                    ))}
                    {list.status === "unpaid" ? (
                        <div className="state">
                            <div className="state-text">
                                <p>
                                    Status pembayaran anda :
                                    <span className="complete"> {list.status}</span>
                                </p>
                            </div>
                            <h4>Kode Billing Anda : {billing}</h4>
                            <Payment />

                        </div>
                    ) : (
                        <div>
                            <p>Tagihan sudah dibayar</p>
                            <p>
                                Balance Amount :
                                <span className="complete">{list.response.account_balance}</span>
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
