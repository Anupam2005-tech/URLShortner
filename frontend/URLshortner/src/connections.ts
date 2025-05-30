interface UserPrototype {
  name: string;
  email: string;
  password: string;
}
interface CreateUserResponse {
  msg: string;
  redirectTo?: string;
}

interface LoginPrototype{
  email:string,
  password:string
}

interface LoginUserResponse{
  msg:string
  redirectTo?:string
}

// create user handle
export async function CreateUserHandle(payload: UserPrototype): Promise<CreateUserResponse> {
  try {
    const formData = new URLSearchParams();
    formData.append("name", payload.name);
    formData.append("email", payload.email);
    formData.append("password", payload.password);

    const response = await fetch("http://localhost:8000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const result = await response.json();
    return result;
  } catch (err) {
    return {msg:"An error occurred while creating user."};
  }
}


// login user handle 

export async function loginuserHandle(payload: LoginPrototype): Promise<LoginUserResponse> {
  try {
    const formData = new URLSearchParams();
    formData.append("email", payload.email);
    formData.append("password", payload.password);

    const response = await fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include", 
      body: formData.toString(),
    });

    const result = await response.json();
    return result; 
  } catch (err: any) {
    console.error("Login failed:", err);
    return err.message;
  }
}


// url shorten handle

export async function URLshortnerHandle(redirectURL: string): Promise<{ shortId: string }> {
  try {
    const formData = new URLSearchParams();
    formData.append("url", redirectURL);

    const response = await fetch("http://localhost:8000/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: formData.toString(),
    });

    const result = await response.json();

 
    return { shortId: result.id };
  } catch (err) {
    return { shortId: "Error: could not generate URL" };
  }
}
