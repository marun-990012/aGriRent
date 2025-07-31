import User from "../models/user-model.js";

//user registration validation schema
export const userRegisterValidation = {

    //validation for name field
    name:{
        in:['body'],
        exists:{
            errorMessage:"name field requires"
        },
        notEmpty:{
            errorMessage:'name field should not be empty'
        },
        isLength: {
            options: { min: 3 },
            errorMessage: 'Name must be at least 3 characters long',
          },
        trim:true,

    },

    //validation for email filed
    email:{
        in:["body"],
        exists:{
            errorMessage:"email field is require"
        },
        notEmpty:{
            errorMessage:"email field should not be empty"
        },
        trim:true,
        isEmail:{
            errorMessage:"email should be in valid format"
        },
        custom:{
            options: async function(value){
                try{
                    const user = await User.findOne({email:value});
                    if(user){
                        throw new Error("email already exists try with another eamil");
                    }
                }catch(error){
                    throw new Error(error.message);
                }
                return true;
            }
        }
    },

    //validation for password filed
    password:{
        in:['body'],
        exists:{
            errorMessage:'password field is required'
        },
        notEmpty:{
            errorMessage:"password filed should not be empty"
        },
        trim:true,
        isStrongPassword:{
            options:{
                minLength:8,
                minUpperCase:1,
                minLowerCase:1,
                minNumber:1,
                minSymbol:1
            },
            errorMessage:"password length sould be 8 charecter and password sould contain 1 number, 1 symbol, 1 uppercase, 1 lowercase"
        }
    },

    //validation for userType filed
    userType:{
        in:['body'],
        exists:{
            errorMessage:"userType field is required"
        },
        notEmpty:{
            errorMessage:"userType field is should not be empty"
        },
        isIn:{
            options:[['admin','farmer','renter',]],
            errorMessage:'usertype should be farmer or renter'
        }
    },

};



//user login validation schema
export const userLoginValidation = {

    //validation for email filed
    email:{
        in:['body'],
        exists:{
            errorMessage:'email field required'
        },
        notEmpty:{
            errorMessage:'email field Should not be empty'
        },
        trim:true,
        isEmail:{
            errorMessage:'email should be in valid format'
        }
    },

    //validation for password filed
    password:{
        in:['body'],
        exists:{
            errorMessage:'password field is reqiured'
        },
        notEmpty:{
            errorMessage:'password field should not be empty'
        },
        trim:true,
        isStrongPassword:{
            options:{
                minLength:8,
                minUpperCase:1,
                minLowerCase:1,
                minNumber:1,
                minSymbol:1
            },
            errorMessage:'password length sould be 8 charecter and password sould contain 1 number, 1 symbol, 1 uppercase, 1 lowercase'
        }
    }
};


export const emailVerificationValidation = {
    code:{
        in:['body'],
        exists:{
            errorMessage:'code field is required'
        },
        notEmpty:{
            errorMessage:'code field should not be empty'
        },
        trim:true
    }
};

export const forgotPasswordValidation = {
    email:{
        in:['body'],
        exists:{
            errorMessage:'email field is required'
        },
        notEmpty:{
            errorMessage:'email field should not be empty'
        },
        trim:true,
        isEmail:{
            errorMessage:'email should be in valid format'
        }
    }
};

export const resetPasswordValidation ={
    token:{
        in:['body'],
        exists:{
            errorMessage:'token field is required'
        },
        notEmpty:{
            errorMessage:'token field should not be empty'
        },
        trim:true,
    },
    newPassword:{
        in:['body'],
        exists:{
            errorMessage:'newPassword field is required'
        },
        notEmpty:{
            errorMessage:'newPassword field should not be empty'
        },
        trim:true,
        isStrongPassword:{
            options:{
                minLength:8,
                minUpperCase:1,
                minLowerCase:1,
                minNumber:1,
                minSymbol:1
            },
            errorMessage:'password length sould be 8 charecter and password sould contain 1 number, 1 symbol, 1 uppercase, 1 lowercase'
        }
    }
};


export const ImageUploadValidation = {
    imageUrl:{
        in:['body'],
        exists:{
            errorMessage:'Image field is required'
        },
        notEmpty:{
            errorMessage:'Image field should not be empty'
        },
        trim:true,
    }
};



export const updateProfileValidation = {
    
    name:{
        in:['body'],
        exists:{
            errorMessage:'name field is required'
        },
        notEmpty:{
            errorMessage:'name field should not be empty'
        },
        trim:true,
    },
    phoneNumber:{
        in:['body'],
        exists:{
            errorMessage:'phoneNumber field is required'
        },
        notEmpty:{
            errorMessage:'phoneNumber field should not be empty'
        },
        trim:true,
        isMobilePhone:{
            errorMessage:'mobile number is not valid'
        }
    }
};


export const updateAddressValidation = {
    address:{
        in:['body'],
        exists:{
            errorMessage:'address field is required'
        },
        notEmpty:{
            errorMessage:'address field should not be empty'
        },
        trim:true,
    }
};

 