/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-filename-extension */

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'

import Typography from '@mui/material/Typography'
import Swal from 'sweetalert2'
import { jwtDecode } from 'jwt-decode'

export default function Competation() {
  const router = useRouter()
  const { comId } = router.query
  const [data, setData] = useState([])
  const [comp, setComp] = useState([])
  const [login, setLogin] = useState(false)

  useEffect(() => {
    axios.get(`http://localhost:4010/getonecomp/${comId}`).then((res) => {
      setComp(res.data.data[0])
    })
    axios.get(`http://localhost:4010/geteventincomp/${comId}`).then((res) => {
      setData(res.data.data)
    })
    if (localStorage.getItem('token')) {
      setLogin(true)
    }
  }, [])

  const handleApplyCompAsTeam = () => {
    if (login) {
      const id = jwtDecode(localStorage.getItem('token')).id

      axios.get(`http://localhost:4010/getteamid/${id}`).then((data) =>{
        if(data.data.data[0]?.team_id == undefined){
          Swal.fire({
            title:"You aren't a team leader",
            icon:"error"
          })
        }else{
            axios.get(`http://localhost:4010/getteambyleader/${id}`,{
        params:{
          team_id:data.data.data[0]?.team_id,
          comp_id:comId
        }
      }).then(data=>{
            Swal.fire({
          title: 'applied succesffully',
          icon: 'success',
        })
      }).catch((e)=>{
        console.log(e)
        Swal.fire({
          title:e.response.data.err,
          icon:'error'
        })
      })
        }
      })


    
    } else {
      router.push('/login')
    }
  }

  const handleApplyComp = () => {
    if (login) {
      const data = jwtDecode(localStorage.getItem('token'))
      axios
        .post('http://localhost:4010/addusertocomp', {
          ...data,
          com_id: comId,
        })
        .then(() => {
          Swal.fire({
            title: 'applied succesffully',
            icon: 'success',
          })
        })
        .catch((e) => {
          console.log(e)
          Swal.fire({
            title: e.response.data.err,
            icon: 'info',
          })
        })
    } else {
      router.push('/login')
    }
  }

  if (data) {
    console.log(data)
  }
  return (
    <div className="single-comp-container">
      <div className="header">
        <h1> Events for {comp && comp.competation_name}:</h1>

        <Button
          variant="text"
          color="primary"
          sx={{ width: '300px', '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText' } }}
          onClick={handleApplyComp}
        >
          Apply Now !
        </Button>
        <Button
          variant="text"
          color="primary"
          sx={{ width: '300px', '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText' } }}
          onClick={handleApplyCompAsTeam}
        >
          Apply as Team !
        </Button>
      </div>
      <div className="events">
        {data.length > 0 ? (
          data.map((item) => (
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.event_title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.event_des}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <h1>no event found yet.. stay tund!</h1>
        )}
      </div>
    </div>
  )
}
