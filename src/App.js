import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import gidi from './GIDIFUSION.svg'
import emailicon from './icons8-mail-24.png'
import tickettype from './Vector.png'
import ticketqty from './Vector(1).png'
import team from './Vector(2).png'
import entriesimg from './Black .png' 
import  './Georgia.ttf'
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import { InputUnstyled,  InputUnstyledProps } from '@mui/base';
import { Link } from "react-router-dom";
import rightimg from './Group 2.svg'
import { useForm } from "react-hook-form";
import { useMediaQuery } from 'react-responsive'
import 'animate.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import api from './Api';
import baseURL from './Api';


const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const CustomButton = styled(ButtonUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
 

  &:hover {
    color: #c0bebe;
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
   
  }
`;
const CustomEmailInput = styled(InputUnstyled)`
width: 213px;
  height: 70px;
  background-color: #000000;
  `;

 

  
    
    

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    createPost(data);
  }
  console.log(errors)
  const handleError = (errors) =>{}
  const handleRegistration = (data) => console.log(data);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const [post, setPost] = useState(null);

  useEffect(() => {
    const sendGetRequest = async () => {
      try {
          const resp = await axios.get('https://gidifusion.herokuapp.com/ticket/');
          console.log(resp.data);
          console.log("running")
      } catch (err) {
          // Handle Error Here
          console.error(err);
          console.log("mon")
      }
  };
   sendGetRequest();
  
  }, []);


  async function createPost(data) {
    try{
        const response = await   axios
      .post('https://gidifusion.herokuapp.com/ticket/', {
        email: data.email,
        ticket_type: data.tickettype,
        team_side: data.team,
        quantity:data.ticketqty,

     
      
      })


      
      console.log(response)
      const auth = response.data.payment_redirect.data.authorization_url
      console.log(auth)

      await window.location.assign(auth)
    
    } catch(err){
        console.error(err)
      }
      // .then((response) => {
      //   setPost(response.data);
      //   console.log(response)
      // });

     
      
  }
  return (
   
    <div className="App">
     <header className='header'>
        <div className='mainheader'>
          <img src={gidi} alt="logo" className='logo'/>
          <div className='stack'>
             <Link to={ isDesktopOrLaptop?'#':'/Team'} className='link'><button className='teambtn' >Team Up</button></Link>
            <Link to={ isDesktopOrLaptop?'#':'/Ticket' } className='link'><button className='ticketbtn'>Get Tickets</button></Link>
          </div>
        </div>
        <h1 className='landing'>The Biggest Basketball Rave In Lagos</h1>
        <p className='versus'>Island <span>VS</span> Mainland</p>
        <form  className='form' onSubmit={handleSubmit(onSubmit)}>
        
        <div className='emaildiv'>
          <img  src={emailicon} alt="email" className='emailicon' />
          <input  name='email' className='email' type='email' placeholder='E-mail address'  {...register("email", { required: true,pattern: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, })} />
          {errors.email?.type=== 'required' && <p className='errormsg'>Email is required</p>}
          {errors.email?.type=== 'pattern' && <p className='errormsg'>Invalid email address</p>}
        </div>
        <div className='select'>
        <img  src={tickettype} alt="ticket" className='typeicon'/>
        
        <select  name="tickettype" form="ticketform"  className='tickettype' {...register("tickettype", {required:true})}>
        <option value="" disabled selected hidden>Select Ticket Type</option>
        <option value="Regular">Regular N2000</option>
        <option value="VIP">Vip N5000</option>
        </select>
        {errors.tickettype?.type=== 'required' && <p className='errormsg'>please select a ticket type</p>}
        </div>
        <div className='ticketqtydiv'>
          <img  src={ticketqty} alt="email" className='qtyicon'/>
          <input className='ticketqty' type='number' defaultValue={1} {...register("ticketqty" ,{required:true, min: 1, max: 10})}/>
          {errors.ticketqty?.type=== 'min' && <p className='errormsg'> Enter ticket amount </p>}
          {errors.ticketqty?.type=== 'max' && <p className='errormsg'> exceeded maximum amount </p>}

          <div className='placeholder'> Tickets</div>
        </div>          
        <div className='selectteam'>
        <img  src={team} alt="email" className='teamicon'/>
        
        <select  name="team" form="teamform" required className='team' {...register("team",{ required: true, })} >
        <option value="" disabled selected hidden >Choose A Team</option>
        <option value="Island">Island</option>
        <option value="Mainland">Mainland</option>
        
        </select>
        {errors.team?.type=== 'required' && <p className='errormsg'>please pick a side</p>}
        </div>
        <button type='submit'className='button'>Get Ticket</button>
        </form>
     </header>
     <body>
      <h4 className='eventupdate'>Events Update</h4>
      <div className='flex'>
        <div className='leftsec'>
            <div className='entries'>
              <div className ='entriesimg'></div>
              <p className='news'>The Biggest Basketball rave in Lagos is happening live at Upbeat recreational center, Lekki on the 19th of November 2022. Time is by 12pm so be there! </p>
            </div>
            <div className='entries'>
              <img src={entriesimg}  className ='entriesimg' alt=''/>
              <p className='news'>Tryouts for all teams is set on the 11th of November. Come rep your area and have maximum fun and excitement.  </p>
            </div>
            <div className='entries'>
              <img src={entriesimg}  className ='entriesimg' alt=''/>
              <p className='news'>Watch out for your favorite artiste and guest appearances.  </p>
            </div>
        </div>
        <div className='rightsec'>
            <img src ={rightimg} className='rightimg' alt =''/>
        </div>
      </div>
     </body>
     
    </div>
  );
}

export default App;
