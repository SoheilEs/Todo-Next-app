import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

const signin = () => {
    const router = useRouter()
    const [userData, setUserData] = useState({
        email:"",
        password:"",
    })
    const {status} = useSession()
    const changeHandler = e =>{
        const {name, value} = e.target
        setUserData({
            ...userData,
            [name]: value
        })
    }
    const signHandler = async(e)=>{
        const res = await signIn("credentials",{
            email: userData.email,
            password: userData.password,
            redirect: false
        })

        if(!res.error) router.replace("/dashboard")

    }
    useEffect(()=>{
        if(status==="authenticated") router.replace("/dashboard")
    },[status])
    return (
        <div className="signin-form_container">
            <h1>Sing In</h1>
            <div className="signin-form">
                <label htmlFor="Email">Email</label>
                <input name="email" value={userData.email} type="text" placeholder="Enter your Email..." onChange={changeHandler}/>
                <label htmlFor="Password">Password</label>
                <input name="password" value={userData.password} type="password" placeholder="Enter your Password..." onChange={changeHandler} />
                <button onClick={signHandler}>Sing In</button>
            </div>
        </div>
    );
};

export default signin;