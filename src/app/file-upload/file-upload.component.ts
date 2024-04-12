import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  imageUrl: any;
  base64Image: any;
  analysisResults: any;
  showSpinner: boolean = false;
  constructor(private http: HttpClient) {}

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    this.imageUrl = URL.createObjectURL(file);
    await this.analyzeImage();
  }

  async analyzeImage() {
    this.showSpinner = true;
    try {
      if (!this.imageUrl) {
        alert('Please select an image');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(
        await fetch(this.imageUrl).then((response) => response.blob())
      );

      reader.onload = async () => {
        this.base64Image = reader.result;
        const apiKey = process.env['API_KEY_API'];
        const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

        const requestedData = {
          requests: [
            {
              image: {
                content: this.base64Image.split(',')[1],
              },
              features: [{ type: 'LABEL_DETECTION', maxResults: 10 }],
            },
          ],
        };

        // const apiResponse = await firstValueFrom(
        //   this.http.post(apiURL, requestedData)
        // );
        this.http.post(apiURL, requestedData).subscribe((data: any) => {
          console.log(data.responses[0].labelAnnotations);
          this.analysisResults = data.responses[0].labelAnnotations;
          this.showSpinner = false;
        });
        // console.log(apiResponse);
        // this.analysisResults = await apiResponse;
      };
    } catch (error) {
      console.error('Error analyzing image: ', error);
      alert('Error analyzing image. Please try again later');
    }
  }
}
