
export interface HeadshotStyle {
  name: string;
  prompt: string;
  imageUrl: string;
}

export interface UploadedImage {
  data: string; // base64 encoded string
  mimeType: string;
}
