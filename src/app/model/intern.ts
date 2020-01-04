export interface IIntern {
    pInfo: {
        branch: {type:string},
        collegeName: {type:string},
        date: {type:string},
        domain: {type:string}
        email: {type:string},
        exp: {type:string},
        isSelected: {type:Boolean},
        marks: {type:number},
        name: {type:string},
        phone: {type:string},
        rollNo: {type:string},
        _id: {type:string}
    },
    depNo: {
        type: number,
    },
    bankAc: {
        type: string,
    },
    ifsc: {
        type: string,
    },
    repOfficer: {
        type: object,
    },
    date: {
        type: Date,
    }
}