import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Title from './Title';
import { Button } from '@mui/material';
import { useState } from 'react';
import { fetchDoctorAnalysis, fetchDrugAnalysis, fetchMoneyAnalysis } from '../api/AnalysisAPI';


export default function Chart() {
  const theme = useTheme();
  const [doctorAnal, setDoctorAnal] = useState({})
  const [drugAnal, setDrugAnal] = useState({})
  const [moneyAnal, setMoneyAnal] = useState({})


  React.useEffect(()=> {
    fetchDoctorAnalysis().then(da=>{
      console.log(da)
      setDoctorAnal(da)
    })
    fetchDrugAnalysis().then(drugA=>{
      console.log(drugA)
      setDrugAnal(drugA)
    })
    fetchMoneyAnalysis().then(ma=>{
      console.log(ma)
      setMoneyAnal(ma)
    })
  }, [])

  return (
    <div>
      <div>
        <Button color="primary" href="/home/analysis">
          View All Analysis
        </Button>
      </div>
    </div>
  );
}