const DrawerInitiator = {
  init({button, drawer, content}) {
    button.addEventListener('click', (event) => {
      this.toggle(event, drawer);
    });
    content.addEventListener('click', (event) => {
      this.close(event, drawer);
    });
  },
  toggle(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },
  close(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  },
};

export default DrawerInitiator;
