/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Swal from 'sweetalert2'
import { jwtDecode } from 'jwt-decode'

import Typography from '@mui/material/Typography'
import { TextField } from '@mui/material'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'

const create = () => {
  const [code, setCode] = useState('')
  const [login, setLogin] = useState(false)
  
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log(jwtDecode(localStorage.getItem('token')))
      setLogin(true)
    }
  }, [])

  const handleJoinTeam = () => {
    if (login) {
      if (!code) {
        Swal.fire({
          title: 'invalid code !',
          icon: 'error',
        })
      } else {
        axios
          .get('http://localhost:4010/getteambycode', {
            params: {
              code: code,
            },
          })
          .then((res) => {
            if (res.data.data.length > 0) {
              // init user data to send it as a member on team
              const curMembers = res.data.data[0].team_members
              const memberCount = res.data.data[0].current_member
              //check if user in another team or not
              const isUserInAnotherTeam = jwtDecode(localStorage.getItem('token')).isTeam
              if (isUserInAnotherTeam || localStorage.getItem("inTeam") ) {
                return Swal.fire({
                  title: 'You are Already In Team !',
                  icon: 'error',
                })
              }
              
              // check max team members
              if (memberCount >= 5) {
                return Swal.fire({
                  title: 'Team is Full !!',
                  icon: 'error',
                })
              }
              let flag = false
              const team_id = res.data.data[0].team_id
              const userEmail = jwtDecode(localStorage.getItem('token')).email

              // check if user applied to this team before or not
              curMembers.split(',').map((item) => {
                if (item == userEmail) {
                  flag = true
                  return Swal.fire({
                    title: 'Team is Full !!',
                    icon: 'error',
                  })
                }
              })

              if (!flag) {
                // adding user into team members
                axios
                  .post('http://localhost:4010/addmembertoteam', {
                    name: userEmail,
                    team_id: team_id,
                  })
                  .catch((e) => console.log())

                // change userstate
                axios.get('http://localhost:4010/changeteamstate', {
                  params: {
                    id: jwtDecode(localStorage.getItem('token')).id,
                  },
                })
                // send success alert to user
                Swal.fire({
                  title: 'joind !',
                  icon: 'success',
                })

                localStorage.setItem("inTeam",true)
              }
            } else {
              Swal.fire({
                title: 'invalid code !',
                icon: 'error',
              })
            }
          })
          .catch((e) => {
            console.log(e)
            Swal.fire({
              title: 'invalid code !',
              icon: 'error',
            })
          })
      }
    } else {
      router.push('/login')
    }
  }

  const handleCreateTeam = () => {
    if (login) {

        const isUserInAnotherTeam = jwtDecode(localStorage.getItem('token')).isTeam
        if (isUserInAnotherTeam || localStorage.getItem('inTeam')) {
          return Swal.fire({
            title: 'You are Already In Team !',
            icon: 'error',
          })
        }else{
          router.push("/team/create")
        }
  
    } else {
      router.push('/login')
    }
  }
  return (
    <div className="teams-area">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVhbXxlbnwwfHwwfHx8MA%3D%3D"
          title="join to existing team by entering team code"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Join To Team
          </Typography>
          <Typography variant="body2" color="text.secondary">
            you can join to any team by add team code to below input and press join
          </Typography>
        </CardContent>
        <CardActions>
          <TextField
            id="code-area"
            label="Enter Code"
            variant="outlined"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            variant="text"
            color="primary"
            sx={{ width: '130px', '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText' } }}
            onClick={handleJoinTeam}
          >
            {' '}
            Join Now !{' '}
          </Button>{' '}
        </CardActions>
      </Card>

      {/* create team area  */}
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="https://plus.unsplash.com/premium_photo-1661509878848-e37c58643e14?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVhbSUyMGJ1aWxkaW5nfGVufDB8fDB8fHww"
          title="create your own team"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Create Your own Team
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You can create Your own team and if you want to add member you can send the team code to them
          </Typography>
        </CardContent>
        <CardActions>
     <Button
            variant="text"
            color="primary"
            sx={{ width: '100%', '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText' } }}
            onClick={handleCreateTeam}
          >
            Create Now !
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default create
