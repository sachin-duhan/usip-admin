export interface Officer {

    _id: string,
    name: string,
    phone: number,
    email: string,
    deptt: string,
    interns: [
        {
            _id: string,
            pInfo: string,
            date: Date,
        }
    ]
    
}
