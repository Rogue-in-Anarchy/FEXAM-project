// @ts-nocheck/
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { InferenceService } from '../services/inference.service';
// import * as tf from '@tensorflow/tfjs-node'
// import { Plugin } from '@capacitor/core';

@Component({
  selector: 'app-examiner',
  templateUrl: './examiner.page.html',
  styleUrls: ['./examiner.page.scss'],
})
export class ExaminerPage implements OnInit {
  public capturedImage?: any;
  public capturedImageString?: any;
  reader = new FileReader();
  // private model!: tf.LayersModel;

  uint8Array!: any;

  constructor(
    private infer: InferenceService
    ) {}

  ngOnInit(): void {
    this.takePicture()
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      saveToGallery: false,
      webUseInput: true
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    const imageUrl = image.dataUrl;
    console.log(image);
    
    // Can be set to the src of an image now
    this.capturedImage = imageUrl;
    console.log('image urls',imageUrl);
    this.uint8Array = await this.convertDataURIToBinary(imageUrl!);
    console.log("converted to Unit", this.uint8Array.object, this.uint8Array.uint8Array);
    this.capturedImageString = image.path;
  };

  examine(){
    // console.log("image url:", this.uint8Array.uint8Array);
    // console.log("unit:", this.uint8Array.object);
    // console.log("image url:", this.uint8Array.length);
    // console.log("image url string:", this.capturedImageString);
    console.log("image", this.capturedImage);
    const result = this.infer.detectFaceMorphAttack(this.capturedImage);
    // const result = this.infer.performInference(this.capturedImage);
    console.log("image result:",result);
    return result
  }

  dataUrlToUint8Array(dataUrl: string): Uint8Array | null {
    console.log("converting", dataUrl);
    // Check if the Data URL is well-formed
    const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
    if (!match) {
      console.error('Invalid Data URL');
      return null;
    }
    
    const [ mimeType, base64String] = match;
    const binaryString = atob(base64String);
    const length = binaryString.length;
    const uint8Array = new Uint8Array(length);
    const ynit = [];
    console.log("converted to", binaryString);
    
    for (let i = 0; i < length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
      ynit.push(uint8Array[i])
    }
    console.log("converted to", uint8Array)
  
    return uint8Array;
  }

  convertDataURIToBinary(dataURI: string): Uint8Array {
    const ynit = new Uint8Array(window.atob(dataURI.replace(/^data[^,]+,/, '')).split('').map(char => char.charCodeAt(0)));
    console.log('ynit', ynit.BYTES_PER_ELEMENT, ynit.length, ynit[0]);
    return ynit
  }
  

}
