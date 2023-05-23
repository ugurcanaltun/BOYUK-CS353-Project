import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Button } from '@mui/material';
import { fetchBankAccounts } from '../api/BankAPI';


export default function Deposits(props) {
  const [bankAccount, setBankAccount] = React.useState([])
  React.useEffect(()=>{
    fetchBankAccounts().then(a=>{
      setBankAccount(a.find(b=>b.active==='active'))
    })
  }, [])
  return (
    <React.Fragment>
      <Title>Current Balance</Title>
      <Typography component="p" variant="h4">
        ${bankAccount?bankAccount.balance:""}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        in the active bank account
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        ************ {bankAccount?bankAccount.bank_account_no: ""}
      </Typography>
      <div>
        <Button color="primary" href="bankaccounts">
          View All Accounts
        </Button>
      </div>
    </React.Fragment>
  );
}