// @ts-nocheck/
import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs'

@Injectable({
  providedIn: 'root'
})
export class InferenceService {
  private model!: tf.LayersModel;

  async loadModel() {
    this.model = await tf.loadLayersModel('../../assets/Face-morph_Detection_AI_2.json');
  }

  async detectFaceMorphAttack(imageData: string | number | boolean | tf.TypedArray | tf.RecursiveArray<number | number[] | tf.TypedArray> | tf.RecursiveArray<boolean> | tf.RecursiveArray<string> | Uint8Array[] | tf.WebGLData | tf.WebGPUData): Promise<boolean> {
    const imageTensor = tf.tensor(imageData) as tf.Tensor3D;
    console.log('tensor',imageTensor.array());
    const processedImage = this.preprocessImage(imageTensor);
    const expandedImage = processedImage.expandDims();
    const predictions = this.model.predict(expandedImage) as tf.Tensor;
    const predictionsArray = Array.from(predictions.dataSync());
    const threshold = 0.5;
    const isFaceMorphAttack = predictionsArray[0] > threshold;
    
    imageTensor.dispose();
    processedImage.dispose();
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

}
