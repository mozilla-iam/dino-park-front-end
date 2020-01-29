import featuresJson from '@/features.json';

export default class Features {
  static get(feature) {
    if (feature in featuresJson) {
      return featuresJson[feature];
    }
    return false;
  }
}
