let config = {};
if(process.env.NODE_ENV === "production") {
    config= {
        protocol:"http:",
        host:"https://localhost:44321/api/",
        imgUrl:"",
    }
}
if(process.env.NODE_ENV === "development") {
    config= {
        protocol:"http:",
        host:"localhost:8099/api/",
        imgUrl:"",
    }
}
export const context = config;