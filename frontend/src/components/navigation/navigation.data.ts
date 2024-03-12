import MyContext from '@/Context/Context'
import type { Navigation } from '@/interfaces/navigation'
import { useContext } from 'react'


export const navigations: Navigation[] = [
  {
    label: 'Home',
    path: '#', // '/',
  },
  {
    label: 'Competations',
    path: 'competations', // '/popular-course',
  },
  {
    label: 'Testimonial',
    path: 'testimonial', // '/testimonial',
  },
  {
    label: 'Mentor',
    path: 'mentors', // '/mentors',
  },  {
    label: 'Dashboard',
    path: 'dashboard', // '/mentors',
  },
]
