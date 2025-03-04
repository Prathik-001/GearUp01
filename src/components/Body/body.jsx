import React from 'react'
import { Link } from 'react-router-dom'
import authService from '../../appright/auth';
function hero() {
  return (
    <div className='body'>
        <h1>Your Parking Solution At Your Finger Tip Using "Parkit".</h1>
        <div className='button'>
          <p><Link to="/login" className='btext'>Book My Slot</Link></p>
          </div>
      {/* logout dome */}
       <button onClick={async()=>{
        try{
           let res=await authService.logout()
        }
        catch(errors)
        {
          console.log(errors)
        }
            
       }}>logout</button>
    </div>
  )
}

export default hero;