
const Pvalidation = (values) => {

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
    
   
    return errors;

}

export default Pvalidation;