import FontFaceObserver from 'fontfaceobserver';

const Fonts = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css?family=Montserrat&display=swap';
  link.rel = 'stylesheet';

  document.head.appendChild(link);

  const montserrat = new FontFaceObserver('Montserrat');

  montserrat.load().then(() => {
    document.documentElement.classList.add('montserrat');
  });
};

export default Fonts;
