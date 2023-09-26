import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest} from "@angular/common/http";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-add-doc',
  templateUrl: './add-doc.component.html',
  styleUrls: ['./add-doc.component.css']
})
export class AddDocComponent implements OnInit {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  selectedFile: File | null = null;
  uploadProgress = 0;
  pdfPreviewUrl: SafeResourceUrl | null = null; // Use SafeResourceUrl

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    // Display the PDF preview when a PDF file is selected
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
      formData.append('userId', 'your_user_id');
      const req = new HttpRequest('POST', 'your_backend_url_here', formData, {
        reportProgress: true // This enables progress tracking.
      });

      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // @ts-ignore
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {

          console.log('File upload complete:', event.body);
        }
      });
    } else {
      console.error('No file selected.');
    }
  }

  readAndPreviewPdf() {
    const reader = new FileReader();

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
}
