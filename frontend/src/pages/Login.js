import React,{useState} from 'react'
import { BsToggleOn,BsToggleOff } from 'react-icons/bs';
import { useFormik } from 'formik'
import avatar from '../avater.png'
import {NavLink,useNavigate} from 'react-router-dom'
import {signIn} from '../validation/index'
import { useDispatch } from 'react-redux'
import { login } from '../features/users/userSlice'

let initialValues = {
  email : '',
  password : ''
}

const Login = () => {
  const [darkMode,setDarkmode] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signIn,
    onSubmit: (values) => {
      dispatch(
        login({
          email: formik.values.email,
          password: formik.values.password,
      })
      )
      // navigate('/home')
    },
  });

  const handleDark = ()=>{
    setDarkmode(!darkMode)
}

  return (
    <div className={darkMode ? "dark" : "light"}>
      <div className='flex items-center pt-5 px-20'>
        <div className='w-[115px]'>
            <h3 className='text-primary_color font-primary text-5xl font-bold'>SYE</h3>
        </div>
        <div className='w-[100px]'>
          {
            darkMode 
            ?
            <BsToggleOn className={darkMode ? 'text-green text-2xl cursor-pointer transition ease-linear duration-150' : 'text-secondary_bg text-2xl cursor-pointer transition ease-linear duration-150'} onClick={handleDark}></BsToggleOn>
            :
            <BsToggleOff className={darkMode ? 'text-green text-2xl cursor-pointer transition ease-linear duration-150' : 'text-secondary_bg text-2xl cursor-pointer transition ease-linear duration-150'} onClick={handleDark}></BsToggleOff>

          }
            
        </div>
      </div>  
        <div className='h-screen flex items-center justify-center'>
        <form className='w-[350px]' onSubmit={formik.handleSubmit}>
          <div className='avatar w-20 h-20 m-auto mb-5 overflow-hidden border-2 border-primary_color border-solid rounded-full bg-secondary_bg'>
            <picture>
              <img className='m-auto mb-4 mt-[12px]' src={avatar} alt="avatar" />
            </picture>
          </div>
          <input 
          className='w-full block p-3 rounded-md bg-secondary_bg font-primary text-sm focus:outline-0 text-white mb-5'  autoComplete='off'
          name="email" 
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange} 
          type="email" 
          placeholder='Enter Your Email'/>
          {formik.errors.email  && formik.touched.email ? <p className='text-red mb-2'>{formik.errors.email}</p> : null}

          <input 
          className='w-full block p-3 rounded-md bg-secondary_bg font-primary text-sm focus:outline-0 text-white mb-5' 
          type="password" 
          placeholder='Enter Your Password' 
          name='password' 
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          />
          {formik.errors.password  && formik.touched.password ? <p className='text-red mb-2'>{formik.errors.password}</p> : null}

          <div className='text-center'>
            <button className='bg-primary_color px-8 py-3 mt-5 rounded-md font-primary font-normal text-base transition ease-linear duration-150 hover:shadow-[0px_0px_27px_rgba(80,_147,_243,_0.72)] text-white' type='submit'>Sign In</button>
          </div>
          <p className='singin text-white font-primary text-lg mt-7 text-center'>Don't have an account? <NavLink className="text-primary_color hover:underline" to="/register">Create Now</NavLink></p>
        </form>
       
    </div>
    </div>
  )
}

export default Login