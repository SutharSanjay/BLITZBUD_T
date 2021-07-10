import API from "../../backend"

export const getallproduct = () =>{
    return fetch(`https://fakestoreapi.com/products`,{
        method:"GET",
    })
    .then(response=>{
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getManager = (ManagerID,id,token) =>{
    return fetch(`${API}/manager/update/${ManagerID}/${id}`,{
        method:"GET",
        headers:{Authorization:`Bearer ${token}`}
    })
    .then(response=>{
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getallmanagers = (id,token) =>{
    return fetch(`${API}/manager/all/${id}`,{
        method:"GET",
        headers:{Authorization : `Bearer ${token}`}
    })
    .then(response=>{
        return response.json()
    })
    .catch(err => console.log(err))
}

export const deleteManager = (ManagerID,id,token) =>{
    return fetch(`${API}/manager/remove/${ManagerID}/${id}`,{
        method:"GET",
        headers:{Authorization : `Bearer ${token}`}
    })
    .then(response=>{
        return response.json()
    })
    .catch(err => console.log(err))
}

export const updateManager = (user,ManagerID) =>{
    return fetch(`${API}/manager/update/${ManagerID}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err => console.log(err))
}


