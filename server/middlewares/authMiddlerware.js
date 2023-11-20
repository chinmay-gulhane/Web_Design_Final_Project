

const userAuthenticationMiddleware = () => {

    try{

    }
    catch(error){
        console.log("Error while authenticating User ", error.message);
        res.status(401).send({
            success: false,
            message: "Access denied",
            error: "User is unauthenticated"
        })
    }
}

export {
    userAuthenticationMiddleware
}