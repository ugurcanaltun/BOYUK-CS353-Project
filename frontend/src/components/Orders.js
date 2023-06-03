import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useEffect, useState } from "react";
import { fetchOrders } from "../api/OrdersAPI";
import { Button } from "@mui/material";

export default function Orders() {
  const [orders, setOrders] = useState([])
    useEffect(()=> {
        fetchOrders().then(o=> {
            console.log(o)
            setOrders(o)
        })
    }, [])

  function OrderItem(props) {
    return (
        <TableRow>
            <TableCell component="th" scope="row">{props.date}</TableCell>
            <TableCell component="th" scope="row">{props.name}</TableCell>
            <TableCell component="th" scope="row">{props.accNo}</TableCell>
            <TableCell component="th" scope="row">{props.count}</TableCell>
            <TableCell component="th" scope="row">${props.price}</TableCell>
        </TableRow>
    )
  }
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      {
      (orders && orders.length > 0)?
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Drug Name</TableCell>
            <TableCell>Bank Account No</TableCell>
            <TableCell>Number of Items</TableCell>
            <TableCell align="right">Total Price</TableCell>
          </TableRow>
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