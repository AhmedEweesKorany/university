import React, { FC, useContext } from 'react'
import Box from '@mui/material/Box'
import { StyledButton } from '@/components/styled-button'
import Link from 'next/link'
import MyContext from '@/Context/Context'

const AuthNavigation: FC = () => {
  const {data,setData} = useContext(MyContext)
  const handleLogout = ()=>{
    setData("")
    localStorage.removeItem("token")
  }
  return (
    <Box sx={{ '& button:first-child': { mr: 2 } }}>
    {data? 
     <>
     <StyledButton disableHoverEffect={true} variant="outlined">
        Hello {data.username}
      </StyledButton>
          <StyledButton disableHoverEffect={true} variant="outlined" onClick={handleLogout}>
          log out
        </StyledButton>
     </>
     : <Link href={"/login"}>
     <StyledButton disableHoverEffect={true} variant="outlined" >
        Sign In
      </StyledButton>
     </Link>}
    </Box>
  )
}

export default AuthNavigation;
