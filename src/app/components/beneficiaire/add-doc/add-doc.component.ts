import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest} from "@angular/common/http";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {NotificationType} from "../../../enum/notification-type.enum";
import {BeneficiaireService} from "../../../service/beneficiaire.service";
import {NotificationService} from "../../../notification.service";
import {Beneficiaire} from "../../../model/Beneficiaire";

@Component({
  selector: 'app-add-doc',
  templateUrl: './add-doc.component.html',
  styleUrls: ['./add-doc.component.css']
})
export class AddDocComponent implements OnInit {

  constructor(private http: HttpClient, private notificationService:NotificationService,
              private sanitizer: DomSanitizer,private beneService:BeneficiaireService,) {
  }
  public beneficiaire: Beneficiaire[] = []
  selectedFile: File | null = null;
  uploadProgress = 0;
  pdfPreviewUrl: SafeResourceUrl | null = null; // Use SafeResourceUrl
  isUpload:boolean=false;

  userId:any;
  docTitle:any;
  ngOnInit(): void {
    this.getBeneficiares(true);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile && this.selectedFile.type === 'application/pdf') {
      this.readAndPreviewPdf();
    } else {
      this.pdfPreviewUrl = null;
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('userId', this.userId);
      formData.append('title', this.docTitle);

        this.http.post('http://localhost:8181/dossier/upload', formData, {
          reportProgress: true,
          observe: 'events' // This enables progress tracking.
        }).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            // @ts-ignore
            this.uploadProgress = Math.round((100 * event.loaded) / event.total);
            this.pdfPreviewUrl = null;
          } else if (event.type === HttpEventType.Response) {

            console.log('File upload complete:', event.body);
          }
        }, error => {
          console.error('Error uploading the file:', error);
        });
      }


  }

  readAndPreviewPdf() {
    const reader = new FileReader();
    this.isUpload=true;
    reader.onload = (e: any) => {
      // Sanitize and set the PDF data URL as a SafeResourceUrl
      this.pdfPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(e.target.result);
    };

    reader.onerror = (error) => {
      console.error('Error reading the file:', error);
    };

    // @ts-ignore
    reader.readAsDataURL(this.selectedFile);
  }

  getBeneficiares(showNotification: boolean){
    this.beneService.listBeneficiaire().subscribe(
      response => {
        console.log(response);
        this.beneficiaire = response;

        if (showNotification) {
          if (this.beneficiaire.length > 0) {
            this.sentErrorNotification(NotificationType.SUCCESS, `${this.beneficiaire.length} beneficiaire(s) trouve(s)`);
          } else {
            this.sentErrorNotification(NotificationType.INFO, `La liste est vide`);
          }
        }
      },
      error => {
        this.sentErrorNotification(NotificationType.ERROR, error.error.message);
      }
    );
  }

  sentErrorNotification(error: NotificationType, message: string) {

    if (message){
      this.notificationService.notify(error,message)
    }else{
      this.notificationService.notify(error,"AN ERROR OCCURED. PLEASE TRY AGAIN")
    }
  }
}
