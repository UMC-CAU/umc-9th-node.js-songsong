class BaseError extends Error{
    reason: string;
    data: Record<string,any>;
    statusCode: number;
    errorCode: string;

    constructor(reason:string, data:Record<string, any>, statusCode=400, errorCode="UNKNOWN"){
        super(reason);
        this.reason=reason;
        this.data=data;
        this.statusCode=statusCode;
        this.errorCode=errorCode;
    }
}

export class DuplicateUserEmailError extends BaseError{

   constructor(reason:string, data:Record<string, any>){
    super(reason, data, 400, "U001");
   }
}

export class HasNotJoinedMissionError extends BaseError{
   constructor(reason:string, data:Record<string, any>){
    super(reason, data, 400, "RV001");
   }
}

export class HasNotFinishedMissionError extends BaseError{
    constructor(reason:string, data:Record<string, any>){
    super(reason, data, 400, "RV002");
   }
}

export class RestarantNotAddedError extends BaseError{
    constructor(reason:string, data:Record<string, any>){
    super(reason, data, 400, "RS001");
   }
}

export class MissionAlreadyChallengedError extends BaseError{
    constructor(reason:string, data:Record<string, any>){
    super(reason, data, 400, "M001");
   }
}

export class ReviewNotExistError extends BaseError{
    constructor(reason:string, data:Record<string, any>){
    super(reason, data, 400, "M002");
   }
}


export class MissionAlreadyFinishedError extends BaseError{
    constructor(reason:string, data:Record<string, any>){
    super(reason, data, 400, "M003");
   }
}

export class UndefinedMissionStatusError extends BaseError{
    constructor(reason:string, data:Record<string, any>){
    super(reason, data, 400, "M004");
   }
}

export class MissionNotExistError extends BaseError{
    constructor(reason:string, data:Record<string, any>){
    super(reason, data, 400, "M005");
   }
}

