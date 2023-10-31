import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router, RouterLink} from "@angular/router";
import {BeneficiaireService} from "../../../service/beneficiaire.service";

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {

  constructor(private route: ActivatedRoute,private service:BeneficiaireService) { }
   docs:any;
  blobUrlToDownload:string="";
  ngOnInit(): void {
    let id =this.route.snapshot.paramMap.get("id")
    this.service.getDocs(id).subscribe(
      resp=>{
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




}
