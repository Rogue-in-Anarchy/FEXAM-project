import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
// import { Plugin } from '@capacitor/core';

@Component({
  selector: 'app-examiner',
  templateUrl: './examiner.page.html',
  styleUrls: ['./examiner.page.scss'],
})
export class ExaminerPage implements OnInit {
  public capturedImage?: any;

  constructor(
    
  ) { }

  ngOnInit(): void {
    Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    })
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      saveToGallery: false
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    const imageUrl = image.dataUrl;
    console.log(image);
  
    // Can be set to the src of an image now
    this.capturedImage = image.dataUrl;
  };

}
