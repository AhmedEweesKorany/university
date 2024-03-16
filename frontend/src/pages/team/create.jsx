/* eslint-disable react/jsx-filename-extension */
import { Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from 'axios'

const create = () => {
  const [teamName, setTeamName] = useState('')
  const router = useRouter()

  const handleSubmit = () => {
    if (teamName == '') {
      Swal.fire({
        title: 'please enter valid team Name',
        icon: 'error',
      })
    } else {
      axios
        .get('http://localhost:4010/getteambyname', {
          params: {
            name: teamName,
          },
        })
        .then((data) => {
          if (data.data.data.length > 0) {
            return Swal.fire({
              title: 'Team Name Already Exist... Please Enter Valid One',
              icon: 'error',
            })
          }else{
    axios.get("http://localhost:4010/createteam",{
      params:{
        name:teamName,
        leader_id:jwtDecode(localStorage.getItem('token')).id
      }
    }).then(data=>{

        // cahnge user state to be in team
        axios.get('http://localhost:4010/changeteamstate', {
          params: {
            id: jwtDecode(localStorage.getItem('token')).id,
          },
        })

         Swal.fire({
            title: 'Team Created Successfully',
            icon: 'success',
          })
          localStorage.setItem("inTeam",true)
          router.push("/")
    })

          }
        })
    }
  }
  useEffect(() => {
    const isUserInAnotherTeam = jwtDecode(localStorage.getItem('token')).isTeam
    if (isUserInAnotherTeam || localStorage.getItem('inTeam')) {
      router.push('/')
      Swal.fire({
        title: 'you are already in team',
        icon: 'error',
      })
    }
  }, [])
  return (
    <div className="create-team-area">
      <div className="container">
        <div className="form">
          <Typography variant="h1" color="primary">
            {' '}
            Create Your Own Team !{' '}
          </Typography>{' '}
          <TextField
            id="code-area"
            label="Team Name"
            variant="outlined"
            sx={{ width: '300px' }}
            value={teamName}
            onChange={(e) => {
              setTeamName(e.target.value)
            }}
          />
          <Button
            variant="text"
            color="primary"
            sx={{
              backgroundColor: 'primary.main',
              width: '200px',
              color: 'primary.contrastText',
              '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText' },
            }}
            onClick={handleSubmit}
          >
            {' '}
            Join Now !{' '}
          </Button>{' '}
        </div>
      </div>
    </div>
  )
}

export default create
