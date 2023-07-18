export class User {

  public  id?:string;
  public  userId?:string;
  public   firstName:string;
  public    lastName:string;
  public   username:string;
  public   password?:string;
  public   email:string;
  public   profileImageUrl?:string;
  public   lastLoginDateDisplay?:Date;
  public   joinDate?:Date;
  public   role:string;
  public   authorities :[];
  public   active:boolean;
  public   notLocked:boolean;
  constructor() {
    this.firstName= '';
    this.lastName= '';
    this.username= '';
    this.email= '';
    this.active=true;
    this.notLocked=true;
    this.role='';
    this.authorities= [];
  }
}
