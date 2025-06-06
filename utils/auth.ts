export function get_auth_status(context) {
    const DOPath = context.request.url.split("/api/write/items/")[1];
    if(context.env["GUEST"]){
        if(DOPath.startsWith("_$flaredrive$/thumbnails/"))return true;
        const guestPaths = context.env["GUEST"].split(",")
        for (const path of guestPaths){
            if(path == "*"){
                return true
            }else if(DOPath.startsWith(path)){
                return true
            }
        }
    }
    const headers = new Headers(context.request.headers);
    if(!headers.get('Authorization'))return false
    const Authorization=headers.get('Authorization').split("Basic ")[1]
    const account = atob(Authorization);
    if(!account)return false
    if(!context.env[account])return false
    if(DOPath.startsWith("_$flaredrive$/thumbnails/"))return true;
    const allowedPaths = context.env[account].split(",")
    for (const path of allowedPaths){
        if(path == "*"){
            return true
        }else if(DOPath.startsWith(path)){
            return true
        }
    }
    return false;
  }
