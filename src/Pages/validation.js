
const validation = (values) => {

    let errors={}

    if(!values.firstname){
        errors.firstname="Name is required"
    }
    if(!values.lastname){
        errors.lastname="Name is required"
    }
    else if(values.firstname.length<3){
        errors.firstname="Length of first name must be atleast 3 letter"
    }
    else if(values.lastname.length<3){
        errors.lastname="Length of last name must be atleast 3 letter"
    }
    if(!values.email){
        errors.email="Email is required"
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="The entered Email is invalid"
    }
    if(!values.password){
        errors.password="Password is required"
    }   
    else if (values.password.length<8){
        errors.password="password must be more than 8"

    }
    else if(!/^(?=.*[A-Za-z])/.test(values.password)){
        errors.password="password must contain letters"
    }
    else if(!/^(?=.*[!@#$%^&*])/.test(values.password)){
        errors.password="password must contain special character"
    }
    else if(!/^(?=.*[0-9])/.test(values.password)){
        errors.password="password must contain numbers"
    }
    else if (values.password.length>20){
        errors.password="password must not be more than 20"
    }
   
    return errors;

}

export default validation;