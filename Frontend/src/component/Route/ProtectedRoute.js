import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route ,redirect} from 'react-router-dom'


function ProtectedRoute({element : element,...rest}) {
    const {loading,isAuthenticated,user}=useSelector((state)=>state.user)
  return (
    <Fragment>
        {!loading &&(
            <Route {...rest}
            render={(props)=>{
                if(!isAuthenticated){
                    return redirect("/login")
                }
                return <element {...props}/>
            }}/>
        )}
    </Fragment>
  )
}

export default ProtectedRoute


//8:44:56