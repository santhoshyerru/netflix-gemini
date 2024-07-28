export const checkValidData = (name, email, password)=>{
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const isNameValid = /^[a-z ,.'-]+$/i.test(name);
    if(!isEmailValid){
        return "Email is not valid"
    }
    else if(!isPasswordValid){
        return "Password is not valid"
    }
    else if(!isNameValid){
        return "Name is not valid"
    }
    return null;

}