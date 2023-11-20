
export const registerController = (req,res) => {
    try{

    }catch(error){
        console.log("Error while registering user. ", error);
        res.status(500).json({
            success: false,
            message: "Failed to register user",
            error: error.message
        })
    }
}

export const loginController = (req,res) => {
    try{

    }catch(error){
        console.log("Error while logging user ", error);
        res.status(500).json({
            success: false,
            message: "Failed to login user",
            error: error.message
        })
    }
}
