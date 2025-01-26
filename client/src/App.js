// import './App.css';
import Header from './Components/Header';
import { Routes, Route } from 'react-router-dom';
import Blogs from './Pages/Blogs';
import Login from './Pages/Login';
import Register from './Pages/Register';
import UserBlogs from './Pages/UserBlogs';
import CreateBlogs from './Pages/CreateBlogs';
import BlogDetails from './Pages/BlogDetails';
import   { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div>
      <Header />
         <Toaster />
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/Blogs' element={<Blogs />} />
        <Route path='/my-blogs' element={<UserBlogs />} />
        <Route path="/blog-details/:id"  element={<BlogDetails />} />
        <Route path='/create-blog' element={<CreateBlogs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
