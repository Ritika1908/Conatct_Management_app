import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const DashboardPage: React.FC = () => {
  const { data: globalData } = useQuery(['globalData'], () =>
    axios.get('https://disease.sh/v3/covid-19/all').then(res => res.data)
  );

  const { data: countryData } = useQuery(['countryData'], () =>
    axios.get('https://disease.sh/v3/covid-19/countries').then(res => res.data)
  );

  const { data: historicalData } = useQuery(['historicalData'], () =>
    axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all').then(res => res.data)
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const lineChartData = historicalData ? Object.keys(historicalData.cases).map(date => ({
    date: formatDate(date),
    cases: historicalData.cases[date],
  })) : [];

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">COVID-19 Dashboard</h1>
      <div className="mb-4">
        {globalData && (
          <div>
            <p>
