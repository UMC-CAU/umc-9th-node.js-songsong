export class DuplicateUserEmailError extends Error{

    reason: string
    data: Record<string,any>
    errorCode = "U001";
    
    constructor(reason:string, data:Record<string, any>){
        super(reason);
        this.reason=reason;
        this.data=data;
    }
}