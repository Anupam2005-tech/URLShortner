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

    const response = await fetch(`${backendURL}user/create`, {
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

    const response = await fetch(`${backendURL}user/login`, {
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
  { slNo: number; shortId: string; url: string; createdAt: string; clicks: number }[] | string | number
> {
  try {
    const response = await fetch(`${backendURL}/url/analytics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
    });

    if (response.status === 401) {
      return 401; 
    }

    if (!response.ok) {
      throw new Error("Failed to fetch analytics.");
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    return `Error: ${err.message}`;
  }
}


