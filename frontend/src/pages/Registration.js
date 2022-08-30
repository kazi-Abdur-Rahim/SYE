import React,{useState} from 'react'
import {NavLink, useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import register from '../register.png'
import {signUp} from '../validation/index'
import { BsToggleOn,BsToggleOff } from 'react-icons/bs';
import axios from 'axios';

let initialValues = {
  fName : '',
  lName : '',
  email : '',
  password : '',
  date : '',
  gender: ''
}

const Registration = () => {

  const [darkMode,setDarkmode] = useState(false)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signUp,
    onSubmit: async (values) => {
      let {data} = await axios.post("/api/signup",{
        fName: formik.values.fName,
        lName: formik.values.lName,
        email: formik.values.email,
        password: formik.values.password,
        date: formik.values.date,
        gender: formik.values.gender,
      })
      console.log(data);
      navigate('/login')
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
          <div className='w-2/5'>
          <h2 className='font-primary text-4xl font-bold text-primary_color mb-5'>Registration <span className='text-white'>Form</span></h2>
          <div className='grid grid-cols-2 gap-3 items-center'>
              <div>
                  <form onSubmit={formik.handleSubmit}>
                    <input 
                    className='w-full p-3 rounded-md bg-secondary_bg font-primary text-sm focus:outline-0 text-white mb-5' type="text" 
                    placeholder='First Name' 
                    autoComplete='off'
                    name="fName" 
                    value={formik.values.fName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange} />
                    {formik.errors.fName  && formik.touched.fName ? <p className='text-red mb-2 font-primary text-base font-normal'>{formik.errors.fName}</p> : null}

                    <input 
                    className='w-full p-3 rounded-md bg-secondary_bg font-primary text-sm focus:outline-0 text-white mb-5' type="text" 
                    placeholder='Last Name' 
                    autoComplete='off'
                    name="lName" 
                    value={formik.values.lName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange} />
                    {formik.errors.lName  && formik.touched.lName ? <p className='text-red mb-2 font-primary text-base font-normal'>{formik.errors.lName}</p> : null}

                    <input 
                    className='w-full p-3 rounded-md bg-secondary_bg font-primary text-sm focus:outline-0 text-white mb-5' type="email" 
                    placeholder='Email' 
                    autoComplete='off'
                    name="email" 
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange} />
                    {formik.errors.email  && formik.touched.email ? <p className='text-red mb-2 font-primary text-base font-normal'>{formik.errors.email}</p> : null}

                    <input 
                    className='w-full p-3 rounded-md bg-secondary_bg font-primary text-sm focus:outline-0 text-white mb-5' type="password" 
                    placeholder='New Password'
                    autoComplete='off' 
                    name='password' 
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange} />
                    {formik.errors.password  && formik.touched.password ? <p className='text-red mb-2 font-primary text-base font-normal'>{formik.errors.password}</p> : null}

                    <input 
                    className='w-full p-3 rounded-md bg-secondary_bg font-primary text-sm focus:outline-0 text-white mb-5' type="date" 
                    name='date' 
                    autoComplete='off'
                    value={formik.values.date}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}/>
                    {formik.errors.date  && formik.touched.date ? <p className='text-red mb-2 font-primary text-base font-normal'>{formik.errors.date}</p> : null}
                    <div className='flex justify-between'>
                      <div 
                      className='w-[30%] gender_box flex justify-between items-center border rounded-md border-box px-5 py-2 border-secondary_bg'>
                        <label 
                        htmlFor="male" 
                        className='mr-2 text-secondary_color text-base font-medium font-primary'>Male</label>

                        <input 
                        id="male" 
                        autoComplete='off'
                        name='gender' 
                        value="male"
                        className='bg-secondary_bg' 
                        type="radio"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
        
                      </div>
                      <div 
                      className='w-[30%] gender_box flex justify-between items-center border rounded-md border-box px-5 py-2 border-secondary_bg'>
                        <label 
                        htmlFor="female" 
                        className='mr-2 text-secondary_color text-base font-medium font-primary'>Female</label>
                        <input 
                        id="female" 
                        autoComplete='off'
                        name='gender' 
                        value="female"
                        className='bg-secondary_bg' 
                        type="radio"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                      
                      </div>
                      <div 
                      className='w-[30%] gender_box flex justify-between items-center border rounded-md border-box px-5 py-2 border-secondary_bg'>
                        <label 
                        htmlFor="other" 
                        className='mr-2 text-secondary_color text-base font-medium font-primary'>Others</label>
                        <input 
                        id="other"  
                        autoComplete='off'
                        name='gender' 
                        value="other"
                        className='bg-secondary_bg' 
                        type="radio"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>
                    {formik.errors.gender  && formik.touched.gender ? <p className='text-red mb-2 font-primary text-base font-normal mt-4'>{formik.errors.gender}</p> : null}
                    <button className='bg-primary_color px-5 py-3 mt-5 rounded-md font-primary font-normal text-base transition ease-linear duration-150 hover:shadow-[0px_0px_27px_rgba(80,_147,_243,_0.72)] text-white' type='submit'>Create Account</button>
                  </form>
              </div>
              <div>
                <picture>
                  <img src={register} alt="register"/>
                </picture>
              </div>
          </div>
          <p className='text-white font-primary text-lg mt-3'>Already have an account? <NavLink className="text-primary_color hover:underline" to="/login">Sign in</NavLink></p>
          </div>
    </div>
      </div>
  )
}

export default Registration