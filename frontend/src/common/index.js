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
    }
}


export default SummaryApi