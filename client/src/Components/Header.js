import React , {useState} from 'react';
// import {useNavigate} from "react-router-dom";
import {Box,AppBar,Toolbar,Button,Typography,Tabs,Tob, Tab} from  '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector,useDispatch}  from 'react-redux'
// const {authActions} from '../Router/store';
import { authActions } from '../Redux/store';
import toast from 'react-hot-toast';
const Header = () => {
  //  global state 

  let  isLogin = useSelector ((state) =>  state.isLogin);
  isLogin = isLogin || localStorage.getItem('userId');
  const dispatch  = useDispatch();
  const navigate = useNavigate();
  console.log(isLogin)
// state
  const [value ,setValue] = useState();
  // logout 
  const handleLogout = () =>{
    try{
dispatch(authActions.logout() );
toast.success('Logout Successfully')
navigate('/login')
localStorage.clear()
    }catch(error){
      console.log (error)

    }
  }
  return (
 <>
 <AppBar position = 'sticky'>
    <Toolbar>
        <Typography variant = 'h4'>My  Blog App </Typography>
  {isLogin && (
    <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
    
    <Tabs
        textColor="inherit"
        value={value}
        onChange={(e, val) => setValue(val)}
      >
        <Tab label="Blogs" component={Link} to="/blogs" />
        <Tab label="My Blogs" component={Link} to="/my-blogs" />
        <Tab label="Create Blog" component={Link} to="/create-blog" />
      </Tabs>
</Box>

  )} 
        <Box display={"flex"}  marginLeft={"auto"}>
          {!isLogin && (
            <>
               <Button sx= {{margin :1, color :  "white"}} LinkComponent={Link} to='/login'>Login</Button>
               <Button sx= {{margin :1, color :  "white"}} LinkComponent={Link} to='/register'  >Register</Button>
            </>
          )}
         {isLogin &&(
          
                 <Button onClick={handleLogout}  sx= {{margin :1, color :  "white"}}>Logout</Button>
                 
         ) }
     
        </Box>
    </Toolbar>
 </AppBar>
 </>
  )
}

export default Header 