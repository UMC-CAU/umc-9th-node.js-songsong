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

export class HasNotJoinedMissionError extends Error{
    reason: string
    data: Record<string,any>
    errorCode = "RV001";
    
    constructor(reason:string, data:Record<string, any>){
        super(reason);
        this.reason=reason;
        this.data=data;
    }
}

export class HasNotFinishedMissionError extends Error{
    reason: string
    data: Record<string,any>
    errorCode = "RV002";
    
    constructor(reason:string, data:Record<string, any>){
        super(reason);
        this.reason=reason;
        this.data=data;
    }
}

export class RestarantNotAddedError extends Error{
    reason: string
    data: Record<string,any>
    errorCode = "RS001";
    
    constructor(reason:string, data:Record<string, any>){
        super(reason);
        this.reason=reason;
        this.data=data;
    }
}

export class MissionAlreadyChallengedError extends Error{
    reason: string
    data: Record<string,any>
    errorCode = "M001";
    
    constructor(reason:string, data:Record<string, any>){
        super(reason);
        this.reason=reason;
        this.data=data;
    }
}

export class ReviewNotExistError extends Error{
    reason: string
    data: Record<string,any>
    errorCode = "M002";
    
    constructor(reason:string, data:Record<string, any>){
        super(reason);
        this.reason=reason;
        this.data=data;
    }
}


export class MissionAlreadyFinishedError extends Error{
    reason: string
    data: Record<string,any>
    errorCode = "M003";
    
    constructor(reason:string, data:Record<string, any>){
        super(reason);
        this.reason=reason;
        this.data=data;
    }
}

export class UndefinedMissionStatusError extends Error{
    reason: string
    data: Record<string,any>
    errorCode = "M004";
    
    constructor(reason:string, data:Record<string, any>){
        super(reason);
        this.reason=reason;
        this.data=data;
    }
}

export class MissionNotExistError extends Error{
    reason: string
    data: Record<string,any>
    errorCode = "M005";
    
    constructor(reason:string, data:Record<string, any>){
        super(reason);
        this.reason=reason;
        this.data=data;
    }
}