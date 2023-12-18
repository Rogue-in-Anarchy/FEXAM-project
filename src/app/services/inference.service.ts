// @ts-nocheck/
import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root'
})
export class InferenceService {
  private model!: tf.LayersModel;

  async loadModel() {
    this.model = await tf.loadLayersModel('../../assets/Face_Morph_Detection_AI_2.json');
  }

  async detectFaceMorphAttack(imageData: string ): Promise<boolean> {
  const imageTensor =  await this.processImageDataUrl(imageData) as unknown as tf.Tensor3D;
  console.log('tensor',imageTensor);
  // const processedImage = this.preprocessImage(imageTensor);
  const expandedImage = tf.sub(tf.div(tf.expandDims(imageTensor
    ), tf.scalar(127.5)), tf.scalar(1)) as tf.Tensor3D;
  console.log('expanded',expandedImage);
  // const expandedImage = imageTensor.expandDims();
  // const predictions = this.model.predict(expandedImage) as tf.Tensor;
  // console.log('result', predictions);
  // Preprocess the image tensor as needed (e.g., resize, normalize)
  const preprocessedTensor = this.preprocessImageTensor(expandedImage);

  // Make the prediction
  const predictions = this.model.predict(preprocessedTensor) as tf.Tensor;
  console.log(predictions);

  // Clean up intermediate tensors
  imageTensor.dispose();
  preprocessedTensor.dispose();
  const predictionsArray = Array.from(predictions.dataSync());
  const threshold = 0.5;
  const isFaceMorphAttack = predictionsArray[0] > threshold;
    
  imageTensor.dispose();
  // processedImage.dispose();
  expandedImage.dispose();
  predictions.dispose();
  console.log('detecting')

  return isFaceMorphAttack;
  }

  private preprocessImage(image: tf.Tensor3D): tf.Tensor3D {
    const processedImage = tf.image.resizeBilinear(image, [224, 224]).div(tf.scalar(255));
    return processedImage as tf.Tensor3D;
  }

  // Perform inference on a sample data
// performInference(inputData: string | number | boolean | tf.TypedArray | tf.RecursiveArray<number | tf.TypedArray | number[]> | tf.RecursiveArray<boolean> | tf.RecursiveArray<string> | Uint8Array[] | tf.WebGLData | tf.WebGPUData) {
//   const inputTensor = tf.tensor(inputData); // Convert your input data to a TensorFlow tensor
//   console.log('inference',inputTensor);
//   const predictions = this.model.predict(inputTensor);
//   return predictions; // Convert predictions to a plain array
// }

async loadImageFromDataUrl(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = dataUrl;
  });
}

imageDataFromImage(image: HTMLImageElement): ImageData {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  ctx!.drawImage(image, 0, 0);
  return ctx!.getImageData(0, 0, image.width, image.height);
}

imageTensorFromImageData(imageData: ImageData): tf.Tensor3D {
  const tensor = tf.browser.fromPixels(imageData) as tf.Tensor3D;
  return tensor;
}

  async processImageDataUrl(dataUrl: string): Promise<tf.Tensor3D> {
  // Load image from data URL
  const image = await this.loadImageFromDataUrl(dataUrl);
  console.log('pikcha', image);
  
  // Draw image on canvas and get pixel data
  const imageData = this.imageDataFromImage(image);
  console.log(imageData);
  
  // Convert pixel data to numerical tensor
  const tensor = this.imageTensorFromImageData(imageData);
  console.log(tensor);

  return tensor;
}

// async predictWithModel(imageTensor: tf.Tensor3D, model: tf.LayersModel): Promise<tf.Tensor> {
//   // Preprocess the image tensor as needed (e.g., resize, normalize)
//   const preprocessedTensor = this.preprocessImageTensor(imageTensor);

//   // Make the prediction
//   const predictions = model.predict(preprocessedTensor);

//   // Clean up intermediate tensors
//   imageTensor.dispose();
//   preprocessedTensor.dispose();

//   return predictions;
// }

// Example preprocess function (you should customize this based on your model requirements)
preprocessImageTensor(imageTensor: tf.Tensor3D): tf.Tensor3D {
  // Example: Resize the image to match the expected input size of your model
  const resizedTensor = tf.image.resizeBilinear(imageTensor, [224, 224]);

  // Example: Normalize the pixel values to be in the range [0, 1]
  const normalizedTensor = resizedTensor.div(tf.scalar(255)) as tf.Tensor3D;

  return normalizedTensor;
}



}
