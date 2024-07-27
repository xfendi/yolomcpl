import AOS from "aos";
import "aos/dist/aos.css";

export default ({ app }) => {
  setTimeout(function() { AOS.refresh(); }, 500);
  app.AOS = new AOS.init({ 
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  once: true, // whether animation should happen only once - while scrolling down
  });
};