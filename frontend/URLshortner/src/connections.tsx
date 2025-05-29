import axios from "axios";

axios.defaults.withCredentials=true

interface CreateUserPayload {
    name: string;
    email: string;
    password: string;
  }

  interface CreateUserResponse {
   message:string
  }

async function handleCreate(payload:CreateUserPayload):Promise <CreateUserResponse | void>{
 try{
    const response=await axios.post("http://localhost:8000/user/create",payload)
     return response.data.message
 }
 catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      console.error("Server error message:", error.response.data.message);
    } else {
      console.error("Unexpected error", error.message);
    }
  }

}

export {handleCreate}