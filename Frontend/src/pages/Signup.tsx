import {useState} from 'react'
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Signup = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [firstName, setfirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [gender, setgender] = useState("")
  const [date, setdate] = useState("")
  const [status, setstatus] = useState("")
  const [isSuccess, setisSuccess] = useState<boolean | null>(null)
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()

  async function handlerSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
  e.preventDefault();
  
  try {
    setloading(true);//Humne yaha when click on Submit now then loading ko true kar dena 
    if(!email || !password || !firstName || !lastName || !gender || !date){
      setisSuccess(false) //yaani text red kar dena
      setstatus("All fields are required ") // Yaani yeh message dikha dena 
      setloading(false) //And loading ko rok dena 

      setTimeout(()=>{
      setstatus("");
      },500) //We use setTimeout here , ki yeh nahi ki ek baar screen par "All fields are required " aa gaya hai toh wahi ruke rahe , balki after 500ms wo hat jaaye , just to elevate user experience ....
      return;
    }
    //Uske baad humne likha ki if user ne in sabhi fields me se koi bhi ek bhi firld nahi di hogi toh , AAge mat badna , balki use bol dena ki sabhi fields pehle bharo 

    setstatus("");
    const { data } = await axios.post(
      "http://localhost:3000/signup",
      { email,
        password,
        firstName,
        lastName,
        gender,
        dateOfBirth: date
      },
      {
        withCredentials: true,
        headers: {
        "Content-Type": "application/json",
        }
      }
    );


    if (data.success) {
      //success is came from the response 
      setemail("");
      setpassword("");
      setfirstName("");
      setlastName("");
      setgender("");
      setdate("");
      //clearing the form
      setstatus(data.message);
      setisSuccess(true);
     
      
      setTimeout(()=>{
      setloading(false);
      navigate("/signin");
      },300)
    }
    
  //Remember agar backend me kuch gadbad hui or kuch fail hua jo wo response jiska status code 400 or 500 hai , wo response catch me jaata hai and hum us response ko waha se handle karte hai .Like here we did ki agar koi bhi backend se problem aayegi toh wo catch me jaayegi and waha hum check karenge ki wo error request maarte hue aayi hai kya yaani backend se aayi hai if yes then usme bhi hamare paas response aaya hoga toh wo error waale response ko set kar do status par . Intotal success response is handled by try and fail response will handled by catch always . 
  }catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    setloading(false)
    setstatus(message || "Signup failed");
    setisSuccess(false)
  } else {
    setloading(false)
    setstatus("Unexpected error occurred");
    setisSuccess(false)
  }
  setisSuccess(false);
  } 
  //Yaha humne kya likha hai 
  //Toh humne error ki type "unknown" isliye likhi hai because we do not know error kis type ka hai , it can be in any format.
  //Axios error kya karta hai ki wo ek error guard ki tarah hai , wo un error ko detect karta hai jo axios ki wajah se aa raha hai when making the request .
  //Yani humne yaha likha ki agar toh error(it may be a response that we come when something fails in backend and backend through this response ) axios se aa
  // raha hai yaani request maarne par aa raha hai , tab toh us response me jo message hai use "message" naam ke variable me store kar lo and us message ko ui
  // me show kar do and if the error is not form the axios or the request that we made tab toh kuch networking problem hai , toh us time par show "Unexpected error occured"

  }

 
  

  return (
    <div className='flex flex-row justify-center items-center min-h-screen bg-black'>
      <form onSubmit={handlerSubmit} className='flex flex-col justify-center items-center gap-4'>
       <h1 className='font-bold text-white text-5xl'>Sign up</h1>
       <input type='email' placeholder='Email address' value={email} onChange={(e)=>setemail(e.target.value)} className='border-2 border-red-600 text-red-500/80 font-semibold rounded-lg w-80 h-10 pl-6'/>
       <input type='password' placeholder='Password'  value={password} onChange={(e)=>setpassword(e.target.value)}  className='border-2 border-red-600 text-red-500/80 font-semibold rounded-lg w-80 h-10 pl-6' />
       <input type='text' placeholder='Enter Your First Name' value={firstName} onChange={(e)=>setfirstName(e.target.value)} className='border-2 border-red-600 text-red-500/80 font-semibold rounded-lg w-80 h-10 pl-6' />
       <input type='text' placeholder='Enter Your Last Name' value={lastName} onChange={(e)=>setlastName(e.target.value)} className='border-2 border-red-600 text-red-500/80 font-semibold rounded-lg w-80 h-10 pl-6' />
       <div className="flex flex-col items-center gap-3 w-72 rounded-xl bg-white p-4 shadow-lg">
       <label className="text-2xl font-semibold text-red-600">Choose your gender</label>
       <select value={gender} onChange={(e)=>setgender(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-700 shadow-sm transition  hover:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-400 focus:outline-none">
       <option value="">Select gender</option>
       <option value="Male">Male</option>
       <option value="Female">Female</option>
       <option value="Transgender">Transgender</option>
       </select>
       </div>
       <div className='flex flex-col items-center gap-2 bg-white w-60 h-25 rounded-lg'>
        <label className='text-2xl text-red-600 font-semibold pt-1.5'>Select your Birthday</label>
        <input type='date' value={date} onChange={(e)=>setdate(e.target.value)} className='text-black border-2 border-red-600 rounded-lg px-4 py-2 focus:border-red-500 focus:ring-2 focus:ring-red-400 focus:outline-none transition' />
       </div>
       <button type='submit' disabled={loading} className='bg-red-600 text-white rounded-lg w-30 h-10 font-semibold flex items-center justify-center'>{loading ? (<div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>) : ("Signup Now")}</button>
       { status && (<h1 className= {`${isSuccess ? "text-green-500":"text-red-500"}`} >{status}</h1>)} 
      </form>
    </div>
  )
}

//disabled is a html native thing and it says jab tak yeh true hoga mai button ko click nahi hone dunga and jab yeh disable hoga then only the user can click the button . Like here we used the loading , so when the loading is "true" then we can say button will diable and when loading false then we can click the button.
//Humne yaha bola ki if loading true hoga then "show loading" else "Signup Now"





//humne yaha { status && (<h1 className={`${statusSuccess ? "text-green-500":"text-red-500" }`} >{status}</h1>)}  likha hai ki
//jab status true hoga then hi ise (<h1 className={`${statusSuccess ? "text-green-500":"text-red-500" }`} >{status}</h1>) run karna else not.
//Ab status me toh true-false nahi likha hai , so true-false kaise pata chalega ?
//Toh as because we wrote "" which means "false" hota hai and if "there is something in these double quotes" then that values will be said as "true" . Esa hota hai that's why ---- status ko hum "" false mante hai
//Ab && ka use karne ki jarurat kya thi toh yahi jarurat thi -> ki agar hum ese hi likhte toh hume <h1 class="text-red-500"></h1> yeh render hota and kyuki h1 empty hai toh hume kuch dikhega toh nahi deta but it takes bina matlab ki space and yeh dom me bhi add ho jaata bina matlab ke , So, to make the layout efficient we made it .
export default Signup