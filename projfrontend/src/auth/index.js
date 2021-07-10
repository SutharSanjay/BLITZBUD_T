import API from "../backend"

export const signup = user =>{
    return fetch(`${API}/signup`,{
        method: "POST",
        headers :{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(Response=>{
        return Response.json();
    })
    .catch(err=>console.log(err))
}

export const signin = user =>{
    return fetch(`${API}/signin`,{
        method:"POST",
        headers:{
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    })
    .then(Response=>{
        return Response.json()
    })
    .catch(err=>console.log(err))
}

export const signout = next =>{
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
        next()
    }
    
}

export const authenticate = (data,next)=>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
        next()

        return fetch(`${API}/signout`,{
            method:"GET",
        })
        .then(Response=>console.log("signout Success"))
        .catch(err => console.log(err))
    }
}


export const isAuthenticated = ()=>{
    if(typeof window == "undefined"){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else
    {
        return false;
    }
}