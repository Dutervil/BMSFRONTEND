export  class Beneficiaire{

  public  id:number;
  public  code:string;
  public  nom:string;
  public  prenom:string;
  public  sexe:string;
  public  dateNaissance:string;
  public  adresse:string;
  public  niveauEtude:string;
  public  telephone:string;
  public  imageUrl:string;
  public  nomPersonneReponse:string;
  public  phonePersonneResponsable:string;
  public  dateIntegration:string;
  public  commentaire:string;
  public  type:string;
  public  status:string

  constructor() {
    this.dateIntegration='';
    this.dateNaissance='';
    this.adresse='';
    this.niveauEtude='';
    this.telephone='';
    this.nomPersonneReponse='';
    this.phonePersonneResponsable='';
    this.commentaire='';
    this.imageUrl='';
    this.status='';
    this.id=0;
    this.code='';
    this.nom='';
    this.prenom='';
    this.sexe='';
    this.type=''
  }

}
