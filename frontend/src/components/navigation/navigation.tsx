import React, { FC, useContext } from 'react'
import Box from '@mui/material/Box'
import { Link as ScrollLink } from 'react-scroll'
import MyContext from '@/Context/Context'
import Link from 'next/link'

const Navigation: FC = () => {
  const { data,setData } = useContext(MyContext)

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
     
          <Box
            component={ScrollLink}
            key={"#"}
            activeClass="current"
            to={"#"}
            spy={true}
            smooth={true}
            duration={350}
            sx={{
              position: 'relative',
              color: 'text.disabled',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: { xs: 0, md: 3 },
              mb: { xs: 3, md: 0 },
              fontSize: { xs: '1.2rem', md: 'inherit' },
              ...("#" === '/' && {
                color: 'primary.main',
              }),

              '& > div': { display: 'none' },

              '&.current>div': { display: 'block' },

              '&:hover': {
                color: 'primary.main',
                '&>div': {
                  display: 'block',
                },
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                transform: 'rotate(3deg)',
                '& img': { width: 44, height: 'auto' },
              }}
            >
              <img src="/images/headline-curve.svg" alt="Headline curve" />
            </Box>
            Home
          </Box>

          <Box
            component={ScrollLink}
            key={"Competations"}
            activeClass="current"
            to={"competations"}
            spy={true}
            smooth={true}
            duration={350}
            sx={{
              position: 'relative',
              color: 'text.disabled',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: { xs: 0, md: 3 },
              mb: { xs: 3, md: 0 },
              fontSize: { xs: '1.2rem', md: 'inherit' },
              ...("Competations" === '/' && {
                color: 'primary.main',
              }),

              '& > div': { display: 'none' },

              '&.current>div': { display: 'block' },

              '&:hover': {
                color: 'primary.main',
                '&>div': {
                  display: 'block',
                },
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                transform: 'rotate(3deg)',
                '& img': { width: 44, height: 'auto' },
              }}
            >
              <img src="/images/headline-curve.svg" alt="Headline curve" />
            </Box>
            Competations
          </Box>

       <Link href="/Dashboard/individual">

       <Box
            component={ScrollLink}
            key={"Dashboard"}
            activeClass="current"
            to={"Dashboard"}
            spy={true}
            smooth={true}
            duration={350}
            sx={{
              position: 'relative',
              color: 'text.disabled',
              cursor: 'pointer',
              fontWeight: 600,
              display: data  == undefined ? "none" : data.isAdmin != true ? "none" : "inline-flex",
              alignItems: 'center',
              justifyContent: 'center',
              px: { xs: 0, md: 3 },
              mb: { xs: 3, md: 0 },
              fontSize: { xs: '1.2rem', md: 'inherit' },
              ...("Dashboard" === '/' && {
                color: 'primary.main',
              }),

              '& > div': { display: 'none' },

              '&.current>div': { display: 'block' },

              '&:hover': {
                color: 'primary.main',
                '&>div': {
                  display: 'block',
                },
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                transform: 'rotate(3deg)',
                '& img': { width: 44, height: 'auto' },
              }}
            >
              <img src="/images/headline-curve.svg" alt="Headline curve" />
            </Box>
            Dashboard

          </Box>

       </Link>
         

       <Link href={"/team"}>
       <Box
            component={ScrollLink}
            key={"Team"}
            activeClass="current"
            to={"Team"}
            spy={true}
            smooth={true}
            duration={350}
            sx={{
              position: 'relative',
              color: 'text.disabled',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: { xs: 0, md: 3 },
              mb: { xs: 3, md: 0 },
              fontSize: { xs: '1.2rem', md: 'inherit' },
          

              '& > div': { display: 'none' },

              '&.current>div': { display: 'block' },

              '&:hover': {
                color: 'primary.main',
                '&>div': {
                  display: 'block',
                },
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                transform: 'rotate(3deg)',
                '& img': { width: 44, height: 'auto' },
              }}
            >
              <img src="/images/headline-curve.svg" alt="Headline curve" />
            </Box>
            Team
          </Box>
         
       </Link>
    
          <Box
            component={ScrollLink}
            key={"testimonial"}
            activeClass="current"
            to={"testimonial"}
            spy={true}
            smooth={true}
            duration={350}
            sx={{
              position: 'relative',
              color: 'text.disabled',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: { xs: 0, md: 3 },
              mb: { xs: 3, md: 0 },
              fontSize: { xs: '1.2rem', md: 'inherit' },
          

              '& > div': { display: 'none' },

              '&.current>div': { display: 'block' },

              '&:hover': {
                color: 'primary.main',
                '&>div': {
                  display: 'block',
                },
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                transform: 'rotate(3deg)',
                '& img': { width: 44, height: 'auto' },
              }}
            >
              <img src="/images/headline-curve.svg" alt="Headline curve" />
            </Box>
            Testimonial
          </Box>
         
    </Box>
  )
}

export default Navigation
