import React, { useState } from 'react'
import backicon from './Vector.svg';
import './Ticket.css';
import { useForm } from "react-hook-form";
import { useNavigate} from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';

function Ticket() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    createPost(data);
  }
    const [count, setCount] = useState(1)
    const maxGuests = 10
    const minGuests = 1
  
    const handleCount = (e) => {
      if (e > maxGuests) {
        setCount(maxGuests)
      } else if (e < minGuests) {
        setCount(minGuests)
      } else setCount(e)
    }
  
    const decrementCount = () => {
      if (count > minGuests) setCount(count - 1)
    }
  
    const incrementCount = () => {
      if (count < maxGuests) setCount(count + 1)
      else if (count > maxGuests) setCount(maxGuests)
    }

    function onlyNumberKey(evt) {
          
      // Only ASCII character in that range allowed
      var ASCIICode = (evt.which) ? evt.which : evt.keyCode
      if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
          return false;
      return true;
  }

  let navigate = useNavigate();

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
        quantity:count,

     
      
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
        <div className='Ticket'>
            <header className='ticketheader' >
                <button  alt="logo" className='back' onClick={() => navigate(-1)}></button>
                <h4 className='headertitle'>  Get Tickets </h4>
            </header>
            <form className='ticketform' onSubmit={handleSubmit(onSubmit)}>
                <div className='emaildivticket'>
                <p className='label'>E-mail Address</p>
                 <input  name='email' className='emailticket' type='email'  {...register("email", { required: true,pattern: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, })} />
                 {errors.email?.type=== 'required' && <p className='errormsg'>Email is required</p>}
                {errors.email?.type=== 'pattern' && <p className='errormsg'>Invalid email address</p>}
                </div>

                <div className='selectticket'>
                
                <p className='label'>Select Ticket Type</p>
                <select  name="tickettype" form="ticketform"  className='ticket' {...register("tickettype", {required:true})}>
                <option value="" disabled selected hidden></option>
                <option value="Regular">Regular N2000</option>
                <option value="VIP">Vip N5000</option>
                </select>
                {errors.tickettype?.type=== 'required' && <p className='errormsg'>please select a ticket type</p>}
                </div>

                                <div className='flex gap-3 py-4 my-3'>
                                <p className='label'>Number Of Tickets</p>
                        <input
                        type='button'
                        onClick={() => decrementCount()}
                        value='-'
                        className='cursor-pointer'
                        />
                        <input
                        required
                        type='number'
                        className='ticketamount'
                        name='counter'
                        {...register("ticketqty" ,{required:true, min: 1, max: 10})}
                        value={count}
                        pattern="[0-9]+"
                        onChange={(event) => {
                            handleCount(event.target.value)
                        }}
                        />
                        <input
                        type='button'
                        onClick={() => incrementCount()}
                        value='+'
                        className='cursor-pointer'
                        />
                    </div>
                                        <div className='sidediv'>
                                        <p className='sidep'>Select A Side</p>
                    <input type="radio"  name="side" value="Island" className='radio' {...register("team",{ required: true, })}/>
                    <label for="child">Island</label>
                    <input type="radio"  name="side" value="Mainland" className='radio' {...register("team",{ required: true,  })}/>
                    <label for="adult">Mainland</label>
                    {errors.team?.type=== 'required' && <p className='errormsgradio'>please pick a side</p>}
                    </div>

                    <button type='submit' className='submit'>Get Tickets</button>
            </form>
         </div>
     );
}
export default Ticket;