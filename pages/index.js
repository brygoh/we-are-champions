import React, { useState } from 'react';
import { AppBar, TextField, Button } from '@mui/material';
import { SportsSoccer } from '@mui/icons-material';
import { Container } from '@mui/system';
import axios from 'axios';

import CustomTable from '../components/table';

const tableHead1 = [
  'Team Name',
  'Registration Date',
  'Group Number',
]

const tableHead2 = [
  'Team Name 1',
  'Team Name 2',
  'Team 1 Score',
  'Team 2 Score',
]

export default function Home() {
  const [register, setRegister] = useState()
  const [score, setScore] = useState()

  const checkRegexRegister = (value) => {
    const expression = /[a-zA-Z]{0,255}\s[0-9][0-9]\/[0-9][0-9]\s[a-zA-Z]{0,255}$/
    if (value.match(expression)) return true
    return false
  }

  const checkRegexScore = (value) => {
    const expression = /[a-zA-Z]{0,255}\s[a-zA-Z]{0,255}\s[0-9]{0,255}\s[0-9]{0,255}$/
    if (value.match(expression)) return true
    return false
  }

  return (
    <>
      <AppBar 
        sx={{
          minWidth: '320px',
          height: '64px',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }} 
        color="primary"
      >
        <span className='index-appbar-title'>
          <SportsSoccer style={{ fontSize: '40px', marginRight: '8px' }} />
          We Are Champions
        </span>
      </AppBar>
      <Container 
        sx={{
          marginTop: '64px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: `calc(100vh - 64px)`,
          minWidth: '320px',
          padding: '12px 24px',
          boxSizing: 'border-box',
          flexDirection: 'column',
          position: 'relative',
        }}
        maxWidth="lg"
      >
        <TextField
          sx={{
            width: '100%',
          }}
          onChange={(e) => {setRegister(e.target.value)}}
        />
        <Button>Submit</Button>
        <CustomTable tableHead={tableHead1}/>
        <TextField
          sx={{
            width: '100%',
          }}
          onChange={(e) => {setScore(e.target.value)}}
        />
        <Button>Submit</Button>
        <CustomTable tableHead={tableHead2}/>
      </Container>
    </>
  );
}
