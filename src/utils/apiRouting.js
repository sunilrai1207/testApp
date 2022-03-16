import  {context} from "../configs"
export const getApiRoute = async (routeName,params) => {
        const {protocol,host} = context;
        
        const serverName = `${protocol}//${host}`;
        const url = `${serverName}${routeName}`;
        return url;
}