import * as React from 'react';
import backicon from './Vector.svg';
import { Wizard, useWizard } from 'react-use-wizard';
import './Team.css';
import { useForm } from "react-hook-form";
import { useNavigate} from "react-router-dom";
import { useEffect, useState,createContext, useContext } from 'react';
import axios from 'axios';



const Team = () => (

        
      
      
        //       async function createPost(data) {
        //         const team_mates = [
        //                 {
        //                         name: data.playername1,
        //                         phone: data.playerphone1,
        //                 },
        
        //                 {
        //                         name: data.playername2,
        //                         phone: data.playerphone2,
        //                 },
        //                 {
        //                         name: data.playername3,
        //                         phone: data.playerphone3,
        //                 },
        //                 {
        //                         name: data.playername4,
        //                         phone: data.playerphone4,
        //                 },
        //                 {
        //                         name: data.playername5,
        //                         phone: data.playerphone5,
        //                 },
        //                 {
        //                         name: data.playername6,
        //                         phone: data.playerphone6,
        //                 },
        //                 {
        //                         name: data.playername7,
        //                         phone: data.playerphone7,
        //                 },
        //                 {
        //                         name: data.playername8,
        //                         phone: data.playerphone8,
        //                 }
        
        // ]
        //         try{
        //             const response = await   axios
        //           .post('https://gidifusion.herokuapp.com/team/', {
        //             email: data.email,
        //             coach_name: data.coachname,
        //             team_name: data.teamname,
        //             team_mates:team_mates,
        //             team_side:data.team,
            
                 
                  
        //           })
            
            
                  
        //           console.log(response)
        //           const auth = response.data.payment_redirect.data.authorization_url
        //           console.log(auth)
            
        //           await window.location.assign(auth)
                
        //         } catch(err){
        //             console.error(err)
        //           }
        //           // .then((response) => {
        //           //   setPost(response.data);
        //           //   console.log(response)
        //           // });
            
                 
                  
        //       },

  <Wizard>
    <Step1 />
    <Step2/>
    
    
  </Wizard>
);



const Step1 = (data) => {


  const { handleStep,   goToStep, nextStep, stepCount , activeStep} = useWizard();
  const { register, handleSubmit, formState: { errors } } = useForm();
 
  const onSubmit = (newdata) => {
        console.log(newdata)
    nextStep(data);
    
  }
  // Attach an optional handler
  handleStep(() => {
    'Going to step 2';
  });
  let navigate = useNavigate();

  
  useEffect(() => {
        const sendGetRequest = async () => {
          try {
              const resp = await axios.get('https://gidifusion.herokuapp.com/team/');
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
    

     
  return (
     
    <div className='Ticket'>
    <header className='ticketheader' >
    <button  alt="logo" className='back' onClick={() => navigate(-1)}></button>
        <h4 className='headertitle'>  Team Up </h4>
    </header>
    <form className='ticketform'  onSubmit={handleSubmit(onSubmit)}>
        <div className='teamdiv'>
        <p className='label'>Team Name</p>
         <input  name='teamname' className='teamname' type='text'  {...register("teamname", { required: true,pattern: /^[A-Za-z]+$/, })} />
         {errors.teamname?.type=== 'required' && <p className='errormsg'>Team name is required</p>}
                {errors.teamname?.type=== 'pattern' && <p className='errormsg'>No special characters</p>}
        </div>

        <div className='teamdiv'>
        <p className='label'>Coach Name</p>
         <input  name='coachname' className='teamname' type='text'  {...register("coachname", {required:true, pattern: /^[A-Za-z]+$/})} />
         {errors.coachname?.type=== 'required' && <p className='errormsg'>Enter coach name</p>}
        </div>

        <div className='teamdiv'>
        <p className='label'>Email Address</p>
         <input  name='teamemail' className='teamname' type='email'  {...register("email", { required: true,pattern: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, })} />
         {errors.email?.type=== 'required' && <p className='errormsg'>Email is required</p>}
         {errors.email?.type=== 'pattern' && <p className='errormsg'>Invalid email address</p>}
        </div>
                                <div className='sidediv'>
                                <p className='sidep'>Select A Side</p>
            <input type="radio"  name="side" value="island" className='radio'  {...register("team",{ required: true, })}/>
            <label for="child">Island</label>
            <input type="radio"  name="side" value="adult" className='radio' {...register("team",{ required: true, })}/>
            <label for="adult">Mainland</label>
            {errors.team?.type=== 'required' && <p className='errormsgradio'>please pick a side</p>}
            </div>

            <button   type='submit' className='submit'>Next</button>
    </form>
 </div> 

  );
};
   


const Step2 = () => {
       


  const { handleStep,   goToStep, nextStep, stepCount , activeStep,previousStep,} = useWizard();
  const { register, handleSubmit, formState: { errors,  } } = useForm();
  // Attach an optional handler
  handleStep(() => {
    ;
  });
  let navigate = useNavigate();

 
  const onSubmit = (onedata) => {
        
        createPost(onedata);
        
  }
  
  async function createPost(onedata) {
        const team_mates = [
                {
                        name: onedata.playername1,
                        phone: onedata.playerphone1,
                },

                {
                        name: onedata.playername2,
                        phone: onedata.playerphone2,
                },
                {
                        name: onedata.playername3,
                        phone: onedata.playerphone3,
                },
                {
                        name: onedata.playername4,
                        phone: onedata.playerphone4,
                },
                {
                        name: onedata.playername5,
                        phone: onedata.playerphone5,
                },
                {
                        name: onedata.playername6,
                        phone: onedata.playerphone6,
                },
                {
                        name: onedata.playername7,
                        phone: onedata.playerphone7,
                },
                {
                        name: onedata.playername8,
                        phone: onedata.playerphone8,
                }

]
        try{
                console.log(team_mates)
            const response = await   axios
          .post('https://gidifusion.herokuapp.com/team/', {
            email: "yuu@dnnd.com",
            coach_name: {onedata}.coachname,
            team_name: onedata.teamname,
            team_mates:team_mates,
            team_side: onedata.team,
    
         
          
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
    
         
          
      };

    function handleTeam(data) {
       
     
}

  return (
    <div className='Ticket'>
    <header className='ticketheader' >
    <button  alt="logo" className='back' onClick={() => navigate(-1)}> </button>
            <h4 className='headertitle'>  Team Up  </h4>
    </header>
    <form className='ticketform' onSubmit={handleSubmit(onSubmit)}>
        <div className='teamdiv'>
        <p className='label'>Player 1</p>
         <input  name='teamname' className='teamname' type='text'  {...register("playername1", { required: true,pattern: /^[A-Za-z]+$/, })} />
         {errors.playername1?.type=== 'required' && <p className='errormsg'>Player name is required</p>}
                {errors.playername1?.type=== 'pattern' && <p className='errormsg'>No special characters</p>}
        </div>

        <div className='teamdiv'>
        <p className='label'>Player 1 Phone Number</p>
         <input  name='coachname' className='teamname' type='text' {...register("playerphone1", { required: true, maxLength:11, minLength:11 })} />
         {errors.playerphone?.type=== 'required' && <p className='errormsg'>Phone number is required</p>}
                {errors.playerphone?.type=== 'maxLength' && <p className='errormsg'>Invalid Phone number</p>}
                {errors.playerphone?.type=== 'minLength' && <p className='errormsg'>Invalid Phone number</p>}
        </div>

        <div className='teamdiv'>
        <p className='label'>Player 2</p>
         <input  name='teamname' className='teamname' type='text' {...register("playername2", { required: true,pattern: /^[A-Za-z]+$/, })} />
         {errors.playername2?.type=== 'required' && <p className='errormsg'>Player name is required</p>}
                {errors.playername2?.type=== 'pattern' && <p className='errormsg'>No special characters</p>}
        </div>

        <div className='teamdiv'>
        <p className='label'>Player 2 Phone Number</p>
         <input  name='coachname' className='teamname' type='text' {...register("playerphone2", { required: true, maxLength:11, minLength:11 })} />
         {errors.playerphone?.type=== 'required' && <p className='errormsg'>Phone number is required</p>}
                {errors.playerphone?.type=== 'maxLength' && <p className='errormsg'>Invalid Phone number</p>}
                {errors.playerphone?.type=== 'minLength' && <p className='errormsg'>Invalid Phone number</p>}
        </div>

        <div className='teamdiv'>
        <p className='label'>Player 3</p>
         <input  name='teamname' className='teamname' type='text' {...register("playername3", { required: true,pattern: /^[A-Za-z]+$/, })} />
         {errors.playername3?.type=== 'required' && <p className='errormsg'>Player name is required</p>}
                {errors.playername3?.type=== 'pattern' && <p className='errormsg'>No special characters</p>}
        </div>

        <div className='teamdiv'>
        <p className='label'>Player 3 Phone Number</p>
         <input  name='coachname' className='teamname' type='text' {...register("playerphone3", { required: true, maxLength:11, minLength:11 })} />
         {errors.playerphone?.type=== 'required' && <p className='errormsg'>Phone number is required</p>}
                {errors.playerphone?.type=== 'maxLength' && <p className='errormsg'>Invalid Phone number</p>}
                {errors.playerphone?.type=== 'minLength' && <p className='errormsg'>Invalid Phone number</p>}
        </div>

        <div className='teamdiv'>
        <p className='label'>Player 4</p>
         <input  name='teamname' className='teamname' type='text' {...register("playername4", { required: true,pattern: /^[A-Za-z]+$/, })} />
         {errors.playername4?.type=== 'required' && <p className='errormsg'>Player name is required</p>}
                {errors.playername4?.type=== 'pattern' && <p className='errormsg'>No special characters</p>}
        </div>

        <div className='teamdiv'>
        <p className='label'>Player 4 Phone Number</p>
         <input  name='coachname' className='teamname' type='text' {...register("playerphone4", { required: true, maxLength:11, minLength:11 })} />
         {errors.playerphone?.type=== 'required' && <p className='errormsg'>Phone number is required</p>}
                {errors.playerphone?.type=== 'maxLength' && <p className='errormsg'>Invalid Phone number</p>}
                {errors.playerphone?.type=== 'minLength' && <p className='errormsg'>Invalid Phone number</p>}
        </div>
        <div className='teamdiv'>
        <p className='label'>Player 5</p>
         <input  name='teamname' className='teamname' type='text' {...register("playername5", { required: true,pattern: /^[A-Za-z]+$/, })} />
         {errors.playername5?.type=== 'required' && <p className='errormsg'>Player name is required</p>}
                {errors.playername5?.type=== 'pattern' && <p className='errormsg'>No special characters</p>}
        </div>

        <div className='teamdiv'>
        <p className='label'>Player 5 Phone Number</p>
         <input  name='coachname' className='teamname' type='text' {...register("playerphone5", { required: true, maxLength:11, minLength:11 })} />
         {errors.playerphone?.type=== 'required' && <p className='errormsg'>Phone number is required</p>}
                {errors.playerphone?.type=== 'maxLength' && <p className='errormsg'>Invalid Phone number</p>}
                {errors.playerphone?.type=== 'minLength' && <p className='errormsg'>Invalid Phone number</p>}
        </div>
        <div className='teamdiv'>
        <p className='label'>Player 6</p>
         <input  name='teamname' className='teamname' type='text' {...register("playername6", { required: true,pattern: /^[A-Za-z]+$/, })} />
         {errors.playername6?.type=== 'required' && <p className='errormsg'>Player name is required</p>}
                {errors.playername6?.type=== 'pattern' && <p className='errormsg'>No special characters</p>}
        </div>

        <div className='teamdiv'>
        <p className='label'>Player 6 Phone Number</p>
         <input  name='coachname' className='teamname' type='text' {...register("playerphone6", { required: true, maxLength:11, minLength:11 })} />
         {errors.playerphone?.type=== 'required' && <p className='errormsg'>Phone number is required</p>}
                {errors.playerphone?.type=== 'maxLength' && <p className='errormsg'>Invalid Phone number</p>}
                {errors.playerphone?.type=== 'minLength' && <p className='errormsg'>Invalid Phone number</p>}
        </div>

        <div className='teamdiv'>
        <p className='label'>Player 7</p>
         <input  name='teamname' className='teamname' type='text' {...register("playername7", { required: true,pattern: /^[A-Za-z]+$/, })} />
         {errors.playername7?.type=== 'required' && <p className='errormsg'>Player name is required</p>}
                {errors.playername7?.type=== 'pattern' && <p className='errormsg'>No special characters</p>}
        </div>

        <div className='teamdiv'>
        <p className='label'>Player 7 Phone Number</p>
         <input  name='coachname' className='teamname' type='text' {...register("playerphone7", { required: true, maxLength:11, minLength:11 })} />
         {errors.playerphone?.type=== 'required' && <p className='errormsg'>Phone number is required</p>}
                {errors.playerphone?.type=== 'maxLength' && <p className='errormsg'>Invalid Phone number</p>}
                {errors.playerphone?.type=== 'minLength' && <p className='errormsg'>Invalid Phone number</p>}
        
        </div>
        <div className='teamdiv'>
        <p className='label'>Player 8</p>
         <input  name='teamname' className='teamname' type='text' {...register("playername8", { required: true,pattern: /^[A-Za-z]+$/, })} />
         {errors.playername8?.type=== 'required' && <p className='errormsg'>Player name is required</p>}
                {errors.playername8?.type=== 'pattern' && <p className='errormsg'>No special characters</p>}
        </div>

        <div className='teamdiv'>
        <p className='label'>Player 8 Phone Number</p>
         <input  name='coachname' className='teamname' type='text'{...register("playerphone8", { required: true, maxLength:11, minLength:11 })}  />
         {errors.playerphone?.type=== 'required' && <p className='errormsg'>Phone number is required</p>}
                {errors.playerphone?.type=== 'maxLength' && <p className='errormsg'>Invalid Phone number</p>}
                {errors.playerphone?.type=== 'minLength' && <p className='errormsg'>Invalid Phone number</p>}
        </div>
            <button type='submit' className='submit'>Register</button>
    </form>
 </div> 
  );
};

 

 export default Team;