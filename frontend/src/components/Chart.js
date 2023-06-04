import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Title from './Title';
import { Button } from '@mui/material';
import { useState } from 'react';
import { fetchDoctorAnalysis, fetchDrugAnalysis, fetchMoneyAnalysis } from '../api/AnalysisAPI';
import "../css/Analysis.css"

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
        <Title>Analyses</Title>
        <div className="anal-list">
          {
            doctorAnal?
            <div className='anal-item-doctor'>
              <h5>Doctor with most precriptions</h5>
              <p>Dr.{doctorAnal.doctor_fullname}</p>
              {doctorAnal.presc_count} prescriptions
            </div>: null
          }
          {
            drugAnal?
            <div className='anal-item-order-count' >
              <h5>You ordered</h5>
              {drugAnal.drug_name + " "} 
              {drugAnal.order_count ?
              drugAnal.order_count :
              0} times
            </div>: null
          }
          {
            moneyAnal?
            <div className='anal-item-average'>
              <h5>Your monthly average spending</h5>
              ${moneyAnal.average_spent}
            </div>: null
          }
          
        </div>
      </div>
    </div>
  );
}