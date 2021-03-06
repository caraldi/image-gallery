import template from './album-images.html';
import styles from './album-images.scss';

export default {
  template,
  bindings: {
    id: '<',
    view: '<'
  },
  controller
};

controller.$inject = ['albumService', 'imageService'];

function controller(albums, images) {
  this.styles = styles;

  this.reset = () => {
    this.title = '';
    this.description = '';
    this.url = '';
  };

  this.reset();

  this.$onInit = () => {
    albums.get(this.id).then(album => {
      this.album = album;
    });
  };

  this.uiOnParamsChange = params => {
    this.view = params.view;
  };

  this.addImage = album => {
    images.add({
      title: this.title,
      description: this.description,
      url: this.url,
      album: this.album._id
    })
      .then(saved => {
        this.albums.images.push(saved);
      })
      .then(this.reset());
  };

  this.removeImage = image => {
    images.remove(image._id)
      .then(() => {
        const index = this.album.images.indexOf(image);
        if(index > -1) this.album.images.splice(index, 1);
      });
  };
}
