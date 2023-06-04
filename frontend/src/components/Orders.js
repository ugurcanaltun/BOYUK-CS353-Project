import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useEffect, useState } from "react";
import { fetchOrders } from "../api/OrdersAPI";
import { Button } from "@mui/material";

export default function Orders() {

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#d52b1e',
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
          border: 0,
      },
  }));

  const [orders, setOrders] = useState([])
    useEffect(()=> {
        fetchOrders().then(o=> {
            console.log(o)
            setOrders(o)
        })
    }, [])

  function OrderItem(props) {
    return (
        <StyledTableRow>
            <StyledTableCell component="th" scope="row">{props.date}</StyledTableCell>
            <StyledTableCell component="th" scope="row">{props.name}</StyledTableCell>
            <StyledTableCell component="th" scope="row">{props.accNo}</StyledTableCell>
            <StyledTableCell component="th" scope="row">{props.count}</StyledTableCell>
            <StyledTableCell component="th" scope="row">${props.price}</StyledTableCell>
        </StyledTableRow>
    )
  }
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      {
      (orders && orders.length > 0)?
      <Table size="small">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Drug Name</StyledTableCell>
            <StyledTableCell>Bank Account No</StyledTableCell>
            <StyledTableCell>Number of Items</StyledTableCell>
            <StyledTableCell align="right">Total Price</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {
              orders?
              orders.map(o=> {
                  return <OrderItem 
                      date={o.order_date}
                      name={o.drug_name} 
                      accNo={o.bank_account_no} 
                      count={o.count} 
                      price={o.total_price} 
                      />
              }):<></>
          }
        </TableBody>
      </Table>: <h4>You have no previous orders</h4>
      }
      <Button color="primary" href="/home/pastorders" sx={{ mt: 3 }}>
        See more orders
      </Button>
    </React.Fragment>
  );
}