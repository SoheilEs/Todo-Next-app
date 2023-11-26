import { useRouter } from "next/router";
import { useState } from "react";

const signup = () => {
    const router = useRouter()
    const [data, setData] = useState({
        email:"",
        password:"",
        confirmPassword:""
    })
    const changeHandler = e =>{
        const {name, value} = e.target
        setData({
            ...data,
            [name]: value
        })
    }
    const signHandler = async()=>{

        const res = await fetch("/api/auth/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({data})
        })
        const result = await res.json()
        console.log(result);
        if(result.status ==="success") router.push("/signin")

    }
    return (
        <div className="signin-form_container">
            <h1>Sing In</h1>
            <div className="signin-form">
                <label htmlFor="Email">Email</label>
                <input name="email" value={data.email} type="text" placeholder="Enter your Email..." onChange={changeHandler}/>
                <label htmlFor="Password">Password</label>
                <input name="password" value={data.password} type="password" placeholder="Enter your Password..." onChange={changeHandler} />
                <label htmlFor="ConfirmPassword">Confirm Password</label>
                <input name="confirmPassword" value={data.confirmPassword} type="password" placeholder="Enter your Password..."  onChange={changeHandler}/>
                <button onClick={signHandler}>Sing Up</button>
            </div>
        </div>
    );
};

export default signup;