const backendDomain = "http://localhost:8080"

const SummaryApi = 
{
    signUP : {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIN: {
        url : `${backendDomain}/api/signin`,
        method: "post"
    },
    current_user:{
        url: `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout_user: {
        url: `${backendDomain}/api/user-logout`,
        method: "get"
    },
    allUser: {
        url: `${backendDomain}/api/all-user`,
        method:"get"
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    uploadProduct:
    {
        url: `${backendDomain}/api/upload-product`,
        method: "post"
    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: "get"
    }
}


export default SummaryApi