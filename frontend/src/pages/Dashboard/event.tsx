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




 function content() {
  const [data,setData] = React.useState([])
    const [comp,setComp] = React.useState([])
    const [value,setValue] = React.useState("")
    React.useEffect(()=>{
        axios.get("http://localhost:4010/getallevents").then(data=>{
          setData(data.data.data)   
        })
    
        axios.get("http://localhost:4010/getallcomp").then(data=>setComp(data.data.data)   
    )
      },[])

  // hanlde delete action
  const handleDelete = (id)=>{
    axios.delete(`http://localhost:4010/deleteevent/${id}`).then(res=>{
      setData(data.filter(item=>item.event_id != id))
    toast.success("team deleted successfully")
    })
  }


  
  // handle upadte 
  const handleUpdate = (id)=>{
      let eventName : HTMLInputElement
      let eventDes : HTMLInputElement
    Swal.fire({
        title:"Add Score" ,
        html:`
        <input type="text" id="name" class="swal2-input" placeholder="Event Name">
        <input type="text" id="des" class="swal2-input" placeholder="Event Description">
        
        
        `,
        confirmButtonText:"Update Event",
        didOpen:()=>{
          const popup = Swal.getPopup()!
            eventName = popup.querySelector("#name")
            eventDes = popup.querySelector("#des")
            eventName.onkeyup = (e)=>e.key == "Enter" && Swal.clickConfirm()
            eventDes.onkeyup = (e)=>e.key == "Enter" && Swal.clickConfirm()
        },
        preConfirm:()=>{
          const NameVal = eventName.value
          const desVal = eventDes.value
          if(!NameVal||!desVal){
            Swal.showValidationMessage("Please Enter Valid Data")
          }else{
            axios.get(`http://localhost:4010/updateevent/${id}`,{
                params:{
                    name:NameVal,
                    des:desVal
                }
            }).then(Data=>{
              Swal.fire("Event Updated","","success")
              axios.get("http://localhost:4010/getallevents").then(data=>{
                setData(data.data.data)   
              })
            }).catch(e=>{
              console.log(e)
              Swal.fire("error","","error")
            })
          }
        }
      })
  }

 // handle add user
 const handleAdd = ()=>{
    let eventName : HTMLInputElement
    let eventDes : HTMLInputElement
    let eventTyp : HTMLInputElement
    let eventComp : HTMLInputElement
  Swal.fire({
      title:"Add Score" ,
      html: `
      <input type="text" id="name" class="swal2-input" placeholder="Event Name">
      <input type="text" id="des" class="swal2-input" placeholder="Event Description">
      <input type="text" id="type" class="swal2-input" placeholder="Event Type">
      <select class="swal2-input" id="comp" value=${value} onchange=${(e)=>setValue(e.target.value)}>
      ${comp.map((item) => `<option value=${item.competation_id}>${item.competation_name}</option>`).join('')}
      </select>
    `,
      confirmButtonText:"Create Event",
      didOpen:()=>{
        const popup = Swal.getPopup()!
          eventName = popup.querySelector("#name")
          eventDes = popup.querySelector("#des")
          eventTyp = popup.querySelector("#type")
          eventComp = popup.querySelector("#comp")
          eventName.onkeyup = (e)=>e.key == "Enter" && Swal.clickConfirm()
          eventTyp.onkeyup = (e)=>e.key == "Enter" && Swal.clickConfirm()
          eventComp.onkeyup = (e)=>e.key == "Enter" && Swal.clickConfirm()
          eventDes.onkeyup = (e)=>e.key == "Enter" && Swal.clickConfirm()
      },
      preConfirm:()=>{
        const NameVal = eventName.value
        const desVal = eventDes.value
        const typVal = eventTyp.value
        const compVal = eventComp.value
        if(!NameVal||!desVal||!typVal||!compVal){
          Swal.showValidationMessage("Please Enter Valid Data")
        }else{
          axios.get(`http://localhost:4010/createevent`,{
              params:{
                  name:NameVal,
                  des:desVal,
                  type:typVal,
                  comp:compVal
              }
          }).then(Data=>{
            Swal.fire("Event Updated","","success")
            axios.get("http://localhost:4010/getallevents").then(data=>{
              setData(data.data.data)   
            })
          }).catch(e=>{
            console.log(e)
            Swal.fire("error","","error")
          })
        }
      }
    })
}


  return (
  <>
    <TableContainer component={Paper} sx={{color:"red"}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Event id</StyledTableCell>
            <StyledTableCell align="right">Event Name</StyledTableCell>
            <StyledTableCell align="right">Event Type</StyledTableCell>
            <StyledTableCell align="right">Event Description</StyledTableCell>

            <StyledTableCell align="right">Actions</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,i) => (
              <StyledTableRow key={row.event_id}>
              <StyledTableCell >
                {i+1}
              </StyledTableCell>
              <StyledTableCell align="right">{row.event_title}</StyledTableCell>
              <StyledTableCell align="right">{row.event_type}</StyledTableCell>
              <StyledTableCell align="right">{row.event_des }</StyledTableCell>

              <StyledTableCell align="right" sx={{display:"flex",gap:"20px"}}>
              <Button variant="contained" color="success" onClick={()=>handleUpdate(row.event_id)}>
  Update
</Button>
      <Button variant="outlined" color="error" onClick={()=>handleDelete(row.event_id)}>
  Delete
</Button>

              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button variant="contained" color="info" sx={{width:"400px",mt:"40px",float:"right"}} onClick={handleAdd} >
  Add New Event
</Button>
  </>
    
  );
}

export default function individual(){

  return <Index childern={content()}/>
}

// export default individual