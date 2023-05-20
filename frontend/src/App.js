import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddNewDrugScreen from './screens/AddNewDrugScreen';
import AdminScreen from './screens/AdminScreen';
import ListMedicinesScreen from './screens/ListMedicinesScreen';
import MyPrescriptionScreen from './screens/MyPrescriptionsScreen';
import PastOrdersScreen from './screens/PastOrdersScreen';
import PharmaciesScreen from './screens/PharmaciesScreen';
import WarehouseOrdersScreen from './screens/WarehouseOrdersScreen';
import HomeOutletScreen from './screens/HomeOutletScreen';
import DrugsScreen from './screens/DrugsScreen';

function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<LoginScreen />} />
                <Route path="login" element={<LoginScreen />} />
                <Route path="register" element={<RegisterScreen />} />
                <Route path="home" element={<HomeScreen />}>
                    <Route index element={<HomeOutletScreen />} />
                    <Route path="home" element={<HomeOutletScreen />} />
                    <Route path="listmedicines" element={<DrugsScreen />} />
                    <Route path="addnewdrug" element={<AddNewDrugScreen />} />
                    <Route path="admin" element={<AdminScreen />} />
                    <Route path="myprescription" element={<MyPrescriptionScreen />} />
                    <Route path="pastorders" element={<PastOrdersScreen />} />
                    <Route path="pharmacies" element={<PharmaciesScreen />} />
                    <Route path="warehouseorders" element={<WarehouseOrdersScreen />} />
                </Route>
            </Routes>
        </Router>
    );
  }
  
  export default App;
  