import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import PaymentList from "./PaymentList"
import Button from "@mui/material/Button"
import swal from 'sweetalert';
import Table from './Table';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import HeroImage from '../image/cover.png';
import '../styles/test.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import imageCover from "../image/cover.png"
import CurrencyFormat from 'react-currency-format';

export default function Test() {
    const [value, setValue] = React.useState("")
    const [status, setStatus] = React.useState("unpaid")
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
        console.log(response[0].data)
        
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

    const handlePayment = (event) => {
        event.preventDefault()
        swal("Good job!", "Your payment is success", "success");
        setStatus("paid")
    }

    return (
        <div className="form">
            
                        <Card sx={{ display: 'flex', m:5 }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 500 }}
                                image={imageCover}
                                alt="cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml:10, mt:5, height: 1000, width: 800 }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Stack spacing={2}>
                                        <TextField
                                            id="outlined-basic"
                                            // sx={{ m: 1 }}
                                            fullWidth
                                            label="Account Number"
                                            variant="outlined"
                                            onChange={(e) => setValue(e.target.value)}
                                        />
                                        <Stack direction="row">

                                            <Button sx={{ mr:1 }} variant="contained" onClick={handleSubmit}>
                                                Search
                                            </Button>
                                            {/* Button open table dialog */}
                                            <Button variant="outlined" onClick={fetchDataTable}>
                                                Histori Transaksi
                                            </Button>
                                        </Stack>
                                    </Stack>
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

                                    {lists.map((list) => (
                                        <div key={list.account_number}>
                                            <h2>Halo, {list.response.first_name} {list.response.last_name}</h2>
                                            {balance.map((item) => (
                                                <div key={item.response.account_number}>
                                                    <span>
                                                        Balance Amount : 
                                                        <span className="balance"><CurrencyFormat value={item.response.account_balance} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>
                                                    </span>
                                                </div>
                                            ))}
                                            {status === "unpaid" ? (
                                                <div className="state" key={list.account_number}>
                                                    <div className="state-text">
                                                        <p>
                                                            Status pembayaran anda :
                                                            <span className="complete"> {list.status}</span>
                                                        </p>
                                                    </div>
                                                    <h4>Kode Billing Anda : {billing}</h4>
                                                    <div className="payment">
                                    
                                                        <PaymentList />
                                                        <br/>
                                                        <Button variant="contained" className="submit-btn" onClick={handlePayment}>
                                                                Pay Billing
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p>Tagihan sudah dibayar</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </CardContent>
                            </Box>
                        </Card>
                        
                


            
        </div>
    )
}
