import homePage from './pages/home-page';
import blogPage from './pages/blog-page';
import articlePage from './pages/article-page';
import plpPage from './pages/plp-page';
import pdpPage from './pages/pdp-page';
import aboutPage from './pages/about-page';
import sustainabilityPage from './pages/sustainability-page';
import contactsPage from './pages/contacts-page';
import accountPage from './pages/account-page';
import shippingCartPage from './pages/shippingCart-page';
import processPage from './pages/process-page';
import searchResultPage from './pages/searchResult-page';
import colorBringsPage from './pages/colorBrings-page';
import colorMapPage from './pages/colorMap-page';

export default function() {
  const pageName = document.body.getAttribute('data-page-name');
  if (!pageName) return;

  const pageList = {
    homePage,
    blogPage,
    articlePage,
    plpPage,
    pdpPage,
    aboutPage,
    sustainabilityPage,
    contactsPage,
    accountPage,
    shippingCartPage,
    processPage,
    searchResultPage,
    colorBringsPage,
    colorMapPage
  };

  if (pageName && pageList[pageName]) pageList[pageName]();
}
