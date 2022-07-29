import headerTheme from '../components/headerTheme';
import {anchorsScroll} from '../components/initAnimations';

export default () => {

    window.scrollTo(0, 0);

    headerTheme(true);
    anchorsScroll();
}
