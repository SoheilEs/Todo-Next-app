import { getSession } from "next-auth/react";

import { useState } from "react";

const dashboard = () => {
    const[userInfo, setUserInfo] = useState({
        firstname:"",
        lastname:"",
        password: "",
    })
    const changeHandler = e =>{
        const{name, value} = e.target
        setUserInfo({
            ...userInfo,
            [name]: value
        })
    }
    const submitHandler = async () =>{
        const res = await fetch("/api/update-info",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userInfo})
        })
        const result = await res.json()
        console.log(result)
    }
    console.log(userInfo);
   
    return (
        <div>
            <h1>Dashboard</h1>
            <label htmlFor="Firstname">Firstname</label>
            <input name="firstname" value={userInfo.firstname} type="text" onChange={changeHandler} />
            <label htmlFor="Lastname">Lastname</label>
            <input name="lastname" value={userInfo.lastname} type="text" onChange={changeHandler} />
            <label htmlFor="Password">Password</label>
            <input name="password" value={userInfo.password} type="password" onChange={changeHandler} />
            <button onClick={submitHandler}>Submit</button>
        </div>
    );
};

export default dashboard;

export async function getServerSideProps(context){
    const {req} = context

    const session= await getSession({req})
   
    if(!session){
        return{
            redirect:{
                destination:"/signin",
                permanent: false,
            }
        }
    }
    return{
        props:{session}
    }
}