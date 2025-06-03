const backendURL = import.meta.env.VITE_BACKEND_URL;

interface UserPrototype {
  name: string;
  email: string;
  password: string;
}
interface CreateUserResponse {
  msg: string;
  redirectTo?: string;
}

interface LoginPrototype {
  email: string;
  password: string;
}
interface UpdateUserPayload {
  newName?: string;
  newEmail?: string;
  newPassword?: string;
}

interface UpdateUserResponse {
  msg: string;
  user?: any;
}

interface LoginUserResponse {
  msg: string;
  redirectTo?: string;
}
interface deleteUserResponse{
  msg:string
}

// create user handle
export async function CreateUserHandle(
  payload: UserPrototype
): Promise<CreateUserResponse> {
  try {
    const formData = new URLSearchParams();
    formData.append("name", payload.name);
    formData.append("email", payload.email);
    formData.append("password", payload.password);

    const response = await fetch(`${backendURL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const result = await response.json();
    return result;
  } catch (err) {
    return { msg: `An error occurred while creating user. ` };
  }
}

// login user handle

export async function loginuserHandle(
  payload: LoginPrototype
): Promise<LoginUserResponse> {
  try {
    const formData = new URLSearchParams();
    formData.append("email", payload.email);
    formData.append("password", payload.password);

    const response = await fetch(`${backendURL}/user/login`, {
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
    return { msg: "Login failed" };
  }
}
export async function updateUserHandle(payload:UpdateUserPayload):Promise<UpdateUserResponse> {
  try {
    const formData=new URLSearchParams()
    if(payload.newEmail){
      formData.append("newEmail",payload.newEmail)
    }
    if(payload.newName){
      formData.append("newName",payload.newName)
    }
    if(payload.newPassword){
      formData.append("newPassword",payload.newPassword)
    }
    const response = await fetch(`${backendURL}/user/update`, {
      method: "PUT",
      credentials: "include",
      headers:{
        "Content-Type":  "application/x-www-form-urlencoded",
      },
      body:formData.toString()
    });
    if (!response.ok) {
      return {msg:`Failed to update data`};
    }
    const result = await response.json();
    return result;
  } catch (err) {
    return {msg:`Network error or server unreachable.`};
  }
}

export async function deleteUserHandle():Promise<deleteUserResponse> {
  try {
    const response = await fetch(`${backendURL}/user/delete`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      return {msg:`Failed to delete account`};
    }
    const result = await response.json();
    return result;
  } catch (err) {
    return {msg:`Network error or server unreachable.`};
  }
}

export async function logOutUserHandle(){
 try{
  const response=await fetch(`${backendURL}/user/logout`, {
    method: "POST",
    credentials: "include",
  });
  if(!response.ok){
    return {msg:`Failed to LogOut `};
  }
  const result = await response.json();
  return result;
 }catch(err){
  return {msg:`Network error or server unreachable.`};
 }
}
// url shorten handle

export async function URLshortnerHandle(
  redirectURL: string,
  navigate: (path: string) => void
): Promise<{ shortId: string; error?: string }> {
  try {
    const formData = new URLSearchParams();
    formData.append("url", redirectURL);

    const response = await fetch(`${backendURL}/url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: formData.toString(),
    });

    if (response.status === 401) {
      navigate("/user/login");
      return { shortId: "", error: "Unauthorized. Redirecting to login." };
    }

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      return {
        shortId: "",
        error: errorBody.message || `Error: ${response.statusText}`,
      };
    }

    const result = await response.json();
    return { shortId: result.id };
  } catch (err) {
    return { shortId: "", error: "Network error or server unreachable." };
  }
}

export async function URLanalyticsHandle(): Promise<
  | {
      slNo: number;
      shortId: string;
      url: string;
      createdAt: string;
      clicks: number;
    }[]
  | string
  | number
> {
  try {
    const response = await fetch(`${backendURL}/url/analytics`, {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 401) {
      return `unauthorized`;
    }

    if (!response.ok) {
      return "Failed to fetch analytics.";
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    return `Error: ${err.message}`;
  }
}

export async function analyticsDeleteHandle() {
  try {
    const response = await fetch(`${backendURL}/url/analytics/delete`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      return "Failed to delete analytics";
    } else {
      const data = await response.json();
      return data;
    }
  } catch (err: any) {
    return `Network error or server unreachable.`;
  }
}
