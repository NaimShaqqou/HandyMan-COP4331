import { Grid } from '@mui/material';
import React, { useState } from 'react';
import ServiceCard from '../components/ServiceCard'
import { Container } from "@mui/material";
import { Box } from '@mui/material';
import Service from '../components/Service'
import { useLocation } from 'react-router-dom';


export default function ServicePage() {
    const { state } = useLocation();

    return (
        <Container>
            <Service service={state.service} />
        </Container>
    )
}