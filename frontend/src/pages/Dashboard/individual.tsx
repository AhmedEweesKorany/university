import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Index from "./index"
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



 export function Content({flag=true}) {
  const [data,setData] = React.useState([])

  // hanlde delete action
  const handleDelete = (id)=>{
    axios.delete(`http://localhost:4010/deleteuser/${id}`).then(res=>{
      setData(data.filter(item=>item.user_id != id))
    toast.success("user deleted successfully")
    })
  }

  //handle makeuser as as admin
  const handleMakeAdmin = (id)=>{
    axios.put(`http://localhost:4010/makeadmin/${id}`).then(res=>{
      setData(data.filter(item=>item.user_id != id))
    toast.success("user are now admin")
    })
  }

  // handle add score funcion
  let score : HTMLInputElement
  const handleScore = (id)=>{
    type Score ={
      score:number
    }
    Swal.fire({
      title:"Add Score" ,
      html:`<input type="number" id="score" class="swal2-input" placeholder="Enter New Score">`,
      confirmButtonText:"Update Score",
      didOpen:()=>{
        const popup = Swal.getPopup()!
         score = popup.querySelector("#score")
        score.onkeyup = (e)=>e.key == "Enter" && Swal.clickConfirm()
      },
      preConfirm:()=>{
        const scoreVal = score.value
        if(!scoreVal){
          Swal.showValidationMessage("Please Enter Valid Score")
        }else{
          axios.get(`http://localhost:4010/updatescore/${id}`,{
            params:{
              score:scoreVal
            }
          }).then(Data=>{
            Swal.fire("Score Updated..Refresh needed","","success")
          }).catch(e=>{
            console.log(e)
            Swal.fire("error","","error")
          })
        }
      }
    })
  }


  React.useEffect(()=>{
    axios.get("http://localhost:4010/getAllusers").then(data=>{
      setData(data.data.data)
    })
  },[])

  return (
  <>
  {!flag?   <Typography variant="h1" sx={{ fontSize: 40 ,ml:"40px",color:"main" }}>
  Current Individual Ranking:
</Typography>:null}
    <TableContainer component={Paper} sx={!flag ? {
      pt: {
        xs: 6,
        md: 8,
      },
      pb: {
        xs: 8,
        md: 12,
      },
      pl: "40px", 
      pr: "40px",
      backgroundColor: '#ecf3f3',
    } : null}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">in_Team</StyledTableCell>
            <StyledTableCell align="right">Score</StyledTableCell>
{flag?            <StyledTableCell align="right">Actions</StyledTableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,i) => (
            <StyledTableRow key={row.user_id}>
              <StyledTableCell >
                {i+1}
              </StyledTableCell>
              <StyledTableCell align="right">{row.user_name}</StyledTableCell>
              <StyledTableCell align="right">{row.user_email}</StyledTableCell>
              <StyledTableCell align="right">{row.is_team == 1 ? "yes": "no"}</StyledTableCell>
              <StyledTableCell align="right">{row.points}</StyledTableCell>
          {flag?    <StyledTableCell align="right" sx={{display:"flex",gap:"20px"}}>
              <Button variant="contained" color="primary" onClick={()=>handleScore(row.user_id)}>
  Add Score
</Button>
      <Button variant="outlined" color="error" onClick={()=>handleDelete(row.user_id)}>
  Delete
</Button>
<Button variant="contained" color="success" onClick={()=>handleMakeAdmin(row.user_id)}>
  Make Admin
</Button>
              </StyledTableCell>:null}

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  
  </>
    
  );
}

export default function individual(){

  return <Index childern={Content(true)}/>
}

// export default individual