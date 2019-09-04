export type ImageRatio = '1by1' | '16by9' | '4by3' | '8by3';

export const imageRatiosAvailable: ImageRatio[] = ['1by1', '16by9', '4by3', '8by3'];

export class Image {
  placeholder: string;
  url?: string;
}
