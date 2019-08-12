import generateIdenticon from '@/assets/js/identicon-avatar';

export default class ImageCollectionHandler {
  constructor(options) {
    this.images = [];
    this.loadedIds = [];
    this.nodesToLoad = [];
    this.interrupted = false;
    this.onImageLoaded =
      'onImageLoaded' in options ? options.onImageLoaded : (key, image) => {};
  }
  loadImagesFromNodes(nodes) {
    return new Promise((res, rej) => {
      this.nodesToLoad = nodes.slice(0);
      const loadNextNode = () => {
        const self = this;
        if (this.nodesToLoad.length === 0) {
          res(this.images);
          return;
        }
        const poppedNode = this.nodesToLoad.shift();
        if (this.loadedIds.includes(poppedNode.username)) {
          console.log('Already loaded: ', poppedNode.username);
          loadNextNode();
          return;
        }
        let { picture, username } = poppedNode;
        let url = null;
        let img = null;
        if (
          picture === null ||
          picture === '' ||
          picture === 'default:' ||
          picture.startsWith('https://s3.amazonaws.com/')
        ) {
          img = new Image();
          generateIdenticon(username, 40).then((src) => {
            url = src;
            img.src = url;
          });
        } else {
          img = new Image();
          url = `${picture}?size=40`;
          img.src = url;
        }

        img.onload = function() {
          self.images.unshift(img);
          self.loadedIds.unshift(poppedNode.username);
          self.onImageLoaded(poppedNode.username, this);
          if (self.interrupted) {
            if (Array.isArray(self.interrupted)) {
              self.nodesToLoad = self.interrupted.concat(self.nodesToLoad);
            } else {
              self.nodesToLoad.push(self.interrupted);
            }
            self.interrupted = false;
            loadNextNode();
          } else {
            loadNextNode();
          }
        };
        img.onerror = function() {
          loadNextNode();
          console.log("Couldn't load: ", url);
        };
      };
      loadNextNode();
    });
  }
  interruptImagesWithNode(id) {
    for (let i = 0, len = this.nodesToLoad.length; i < len; i++) {
      if (this.nodesToLoad[i].username === id) {
        this.interrupted = this.nodesToLoad[i];
        break;
      }
    }
  }
  interruptImagesWithNodeList(ids) {
    const interruptedSet = [];
    for (let i = 0, len = this.nodesToLoad.length; i < len; i++) {
      if (ids.includes(this.nodesToLoad[i].username)) {
        interruptedSet.push(this.nodesToLoad[i]);
      }
    }
    this.interrupted = interruptedSet;
  }
}
