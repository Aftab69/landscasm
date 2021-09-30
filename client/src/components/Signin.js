import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

const Signin = () => {
    const [user,setUser] = useState({
        email:"", password:""
    });
    const history = useHistory();

    const handleInputs = (e) =>{
        let x = e.target.name;
        let y = e.target.value;
        setUser({
            ...user,[x]:y
        })
    }
    const verifyData = async (e) =>{
        e.preventDefault();
        const {email, password} = user;
        const res = await fetch("/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({email, password })
        })
        const data = await res.json
        if(res.status === 422 || !data){
            window.alert("Invalid Credentials");
            console.log("Invalid Credentials");
        } else {
            window.alert("Login Successful");
            console.log("Login Successful");
            history.push("/");
        }

    }

    return (
        <div className="login_background">
            <div className="container container_position login_banner_background">
                    <form method="POST">
                        <hr />
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input name="email" value={user.email} placeholder="your email" onChange={handleInputs} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input name="password" value={user.password} placeholder="your password" onChange={handleInputs} type="password" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <button type="submit" onClick={verifyData} class="btn btn-primary">Submit</button>
                        <hr />
                    </form>       
            </div>
        </div>
    )
}

export default Signin;

/*
            <form method="POST">
            <input name="email" value={user.email} placeholder="your email" onChange={handleInputs} />
            <hr />
            <input name="password" value={user.password} placeholder="your password" onChange={handleInputs} />
            <hr />
            <button type="submit" onClick={verifyData}>Login</button>
            </form>
*/

