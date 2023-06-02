import { useEffect, useState } from "react";
import { fetchPatientPrescriptions } from "../api/PrescriptionAPI";

export default function MyPrescriptionScreen() {
    const [prescriptions, setPrescriptions] = useState([])

    useEffect(() =>{
        fetchPatientPrescriptions().then(p=>{
            setPrescriptions(p)
        })
    }, [])

    return(
        <div className="patient-prescription-container">
            My Prescription
        </div>
    );
}