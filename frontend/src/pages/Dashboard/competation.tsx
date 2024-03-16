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

  
function openUnsplashWebsite() {
    // Open Unsplash website in a new tab
    window.open("https://unsplash.com/", "_blank");
  }

  function openImg(url) {
    // Open Unsplash website in a new tab
    window.open(url, "_blank");
  }
    React.useEffect(()=>{
        axios.get("http://localhost:4010/getallcomp").then(data=>{
          setData(data.data.data)   
        })

 // Show Swal alert with custom HTML content
 Swal.fire({
    title: 'Images are allowed from Unsplash website only',
    html: 'You can find images on <button id="unsplash-link" class="swal2-confirm swal2-styled" style="background-color: #f8bb86; color: #1a1a1a;">Unsplash</button>',
    icon: 'warning',
    allowOutsideClick: false,
    confirmButtonText: 'OK',
    didOpen: () => {
      // Attach click event to the button
      const unsplashButton = document.getElementById('unsplash-link');
      if (unsplashButton) {
        unsplashButton.addEventListener('click', openUnsplashWebsite);
      }
    }
  });
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
              Swal.fire("Event Updated..Refresh needed","","success")
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
            Swal.fire("Event Updated..Refresh needed","","success")
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
            <StyledTableCell align="left">Competation id</StyledTableCell>
            <StyledTableCell align="right">Competation Name</StyledTableCell>
            <StyledTableCell align="right">Competation iamge</StyledTableCell>
            <StyledTableCell align="right">Competation Author</StyledTableCell>

            <StyledTableCell align="right">Actions</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
              <StyledTableRow key={row.competation_id}>
              <StyledTableCell >
                {row.competation_id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.competation_name}</StyledTableCell>
              <StyledTableCell align="right" onClick={()=> openImg(row.competation_image)}>{row.competation_image}</StyledTableCell>

              <StyledTableCell align="right">{row.competation_author}</StyledTableCell>

              <StyledTableCell align="right" sx={{display:"flex",gap:"20px"}}>
              <Button variant="contained" color="success" onClick={()=>handleUpdate(row.competation_id)}>
  Update
</Button>
      <Button variant="outlined" color="error" onClick={()=>handleDelete(row.competation_id)}>
  Delete
</Button>

              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button variant="contained" color="info" sx={{width:"400px",mt:"40px",float:"right"}} onClick={handleAdd} >
  Add New Competation
</Button>
  </>
    
  );
}

export default function individual(){

  return <Index childern={content()}/>
}

// export default individual