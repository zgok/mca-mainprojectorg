export class Navigation {
    name: string = '';
    path: string = '';
    roles: string = '';
}

export interface userObj {
    uid: string;
    username: string;
    phno: string;
    email: string;
    address: string;
    roles: string;
    photo?: string;
}

export class FileUpload {
    key!: string;
    name!: string;
    url!: string;
    file: File;

    constructor(file: File) {
        this.file = file;
    }
}

export interface adminObj {
    uid: string;
    firstname: string,
    lastname: string,
    position: string,
    street: string,
    zipcode: string,
    place: string,
    country: string,
    code: string,
    phno: string,
    email: string,
    password: string,
    roles: string
}
export interface bookObj {
    bid:string;
    uid: string;
    uname?: string;
    bname: string;
    category: string;
    nofpages: string;
    price: string; 
    acctno: string; 
    target: string; 
    receivedorders:string;
    dateexpected: string;
     description: string;
}
export interface imgObj{
    name: string;
    url?: string;
}
export interface orderObj{
    oid:string;
    uid:string;
    bid:string;
    dateoforder:string;
}