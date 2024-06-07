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
    },
    updateProduct:
    {
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    categoryProduct:
    {
        url: `${backendDomain}/api/get-categoryproduct`,
        method:"get"
    },
    categoryWiseProduct:
    {
        url: `${backendDomain}/api/category-product`,
        method: "post"
    },
    productDetails:
    {
        url: `${backendDomain}/api/product-details`,
        method: "post"
    },
    addToCartProduct:
    {
        url: `${backendDomain}/api/addtocart`,
        method: "post"
    },
    addToCartProductCount:
    {
        url: `${backendDomain}/api/countAddToCartProduct`,
        method: "get"
    },
    addToCartProductView:
    {
        url: `${backendDomain}/api/viewcartproduct`,
        method: "get"
    },
    updateCartProduct:
    {
        url: `${backendDomain}/api/updatecartproduct`,
        method: "post"
    },
    deleteCartProduct:
    {
        url: `${backendDomain}/api/deletecartproduct`,
        method: "post"
    },
    searchProduct:
    {
        url: `${backendDomain}/api/search`,
        method: "get"
    },
    filterProduct:
    {
        url: `${backendDomain}/api/filterproduct`,
        method: "post"
    }
}


export default SummaryApi