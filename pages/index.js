import React, { useState } from 'react';
import { AppBar, TextField, Button } from '@mui/material';
import { SportsSoccer } from '@mui/icons-material';
import { Container } from '@mui/system';

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

var groupDict = {}
var leader1 = []
var leader2 = []

export default function Home() {
  const [register, setRegister] = useState()
  const [rData, setRData] = useState()
  const [score, setScore] = useState()
  const [sData, setSData] = useState()

  const checkRegexRegister = (value) => {
    const expression = /^(?:[a-zA-Z]{1,255}\s[0-9][0-9]\/[0-9][0-9]\s[0-9]{1,255}\n?)+$/
    if (value.match(expression)) return true
    return false
  }

  const checkRegexScore = (value) => {
    const expression = /^(?:[a-zA-Z]{1,255}\s[a-zA-Z]{1,255}\s[0-9]{1,255}\s[0-9]{1,255}\n?)+$/
    if (value.match(expression)) return true
    return false
  }

  function saveRegister(value) {
    if(checkRegexRegister(value)) {
      const arr = []
      const dataArr = value.split('\n')
      groupDict = {}
      dataArr.map(item => {
        if (item && item !== '') {
          const temp = item.split(' ')
          if (!groupDict[temp[0]]) {
            groupDict[temp[0]] = parseInt(temp[2])
            arr.push({
              teamName: temp[0],
              date: temp[1],
              groupNo: temp[2],
            })
          }
        }
      })
      setRData(arr)
    } else {
      alert('Wrongly formatted input')
    }
  }

  const saveScore = async (value) => {
    if(checkRegexScore(value) && rData) {
      const arr = []
      const dataArr = value.split('\n')
      leader1 = []
      leader2 = []
      dataArr.map(async item => {
        if (item && item !== '') {
          const temp = item.split(' ')
          if (temp[0] !== temp[1]) {
            arr.push({
              team1: temp[0],
              team2: temp[1],
              score1: temp[2],
              score2: temp[3],
            })
          }
          if (temp[2] > temp[3]) {
            await handleLeaderboard(temp[0], 1);
          }
          if (temp[3] > temp [2]) {
            await handleLeaderboard(temp[1], 1);
          }
          if (temp[2] === temp[3]) {
            await handleLeaderboard(temp[0], 0.5);
            await handleLeaderboard(temp[1], 0.5);
          }
        }
      })
      setSData(arr)
    } else {
      alert('Wrongly formatted input')
    }
  }

  const handleLeaderboard = (team, score) => {
    if (groupDict[team] === 1) {
      const temp = leader1
      var check = false;
      temp.map((item, index) => {
        if (item['team'] === team) {
          check = true
          leader1[index]['score'] += score
        }
      })
      if (!check) {
        leader1.push({team: team, score: parseInt(score)})
        check = false
      }
    }
    if (groupDict[team] === 2) {
      const temp = leader2
      var check = false;
      temp.map((item, index) => {
        if (item['team'] === team) {
          check = true
          leader2[index]['score'] += score
        }
      })
      if (!check) {
        leader2.push({team: team, score: parseInt(score)})
        check = false
      }
    }
    leader1.sort((a, b) => { return (b.score - a.score) })
    leader2.sort((a, b) => { return (b.score - a.score) })
  }

  const spanTitle = (value) => {
    return (
      <span style={{fontSize: "20px", fontWeight: 600, width: '100%'}}>{value}</span>
    )
  }

  const spanSubTitle = (value) => {
    return (
      <span style={{fontSize: "12px", width: '100%'}}>{value}</span>
    )
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
        <span className='index-appbar-title' 
          style={{
            fontSize: "24px", 
            fontWeight: 600, 
            display: 'flex', 
            alignItems: 'center'
          }}
        >
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
          height: `100%`,
          minWidth: '320px',
          padding: '12px 24px',
          boxSizing: 'border-box',
          flexDirection: 'column',
          position: 'relative',
          overflowY: 'auto'
        }}
        maxWidth="lg"
      >
        {spanTitle("Register here:")}
        {spanSubTitle("eg. firstTeam 17/05 2")}
        <div style={{width: '100%', marginTop: '8px', marginBottom: '16px'}}>
          <TextField
            sx={{
              width: `calc(100% - 72px)`,
            }}
            onChange={(e) => {setRegister(e.target.value)}}
            multiline={true}
          />
          <Button 
            sx={{width: '72px', height: '56px'}}
            onClick={() => saveRegister(register)}
          >Save</Button>
        </div>
        <CustomTable tableHead={tableHead1} tableBody={rData} />
        {spanTitle("Register here:")}
        {spanSubTitle("eg. firstTeam secondTeam 0 3")}
        <div style={{width: '100%', marginTop: '8px', marginBottom: '16px'}}>
          <TextField
            sx={{
              width: `calc(100% - 72px)`,
            }}
            onChange={(e) => {setScore(e.target.value)}}
            multiline={true}
          />
          <Button 
            sx={{width: '72px', height: '56px'}}
            onClick={() => saveScore(score)}
          >Save</Button>
        </div>
        <CustomTable tableHead={tableHead2} tableBody={sData} />
        {spanTitle("Leaderboard for group 1:")}
        {leader1.map((item, index) => {
          return <span key={index}>{index+1}. {item.team}</span>
        })}
        {spanTitle("Leaderboard for group 2:")}
        {leader2.map((item, index) => {
          return <span key={index}>{index+1}. {item.team}</span>
        })}
        <Button 
          variant="contained"
          sx={{position: 'absolute', top: 8, right: 8}}
          onClick={() => {setRData(); setSData(); groupDict = {}; leader1 = []; leader2 = []}}
        >Clear All</Button>
      </Container>
    </>
  );
}
