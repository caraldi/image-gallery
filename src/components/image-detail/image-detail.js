import template from './image-detail.html';

export default {
  template,
  bindings: {
    image: '='
  },
  controller
};

function controller() {
  this.selected = 'detail';
}