import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Button } from '@mui/material';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits(props) {
  return (
    <React.Fragment>
      <Title>Recent Purchases</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Button color="primary" href="bankaccounts">
          View balance
        </Button>
      </div>
    </React.Fragment>
  );
}