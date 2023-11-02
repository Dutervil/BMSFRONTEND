import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BeneficiaireService} from "../../../service/beneficiaire.service";

@Component({
  selector: 'app-docs-list',
  templateUrl: './docs-list.component.html',
  styleUrls: ['./docs-list.component.css']
})
export class DocsListComponent implements OnInit {

  constructor(private route: ActivatedRoute,private service:BeneficiaireService,private router:Router) { }
  docs:any;
  blobUrlToDownload:string="";
  p:  number=1
  ngOnInit(): void {

    this.service.getAllDocs().subscribe(
      resp=>{
        console.log("Data from server ",resp)
        this.docs=resp;
      },error => {
        console.log(error)
      }
    )
  }

  viewDoc(file: any) {

    const pdfViewer = document.getElementById('pdfViewer');
    const downloadButton = document.getElementById('downloadButton') as HTMLElement



    const base64Data = "data:application/pdf;base64,"+file;
    const base64String = base64Data.split(',')[1];
    const binaryData = atob(base64String);
    const uint8Array = new Uint8Array(binaryData.length);

    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: 'application/pdf' });

    const blobUrl = URL.createObjectURL(blob); // Use URL.createObjectURL
    console.log(blobUrl)
    this.blobUrlToDownload=blobUrl;
    // @ts-ignore
    pdfViewer.src = blobUrl;



  }
  goToCreateDossier() {
  this.router.navigate(['BMS/beneficiaire/doc'])
  }
  onDelete(id: any) {
    if(confirm("Etes-vous sure")){
      this.service.delete(id).subscribe(
        resp=>{
          alert("Suppression reussite")
          this.router.navigate(["BMS/beneficiaire/docs"])
        },error => {
          console.log(error)
        }
      )
    }
  }
}
