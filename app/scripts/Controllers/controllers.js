import MainPageController from './MainPageController';
import HomeController from './HomeController';
import ProjectsController from './ProjectsController';
import AboutController from './AboutController';
import MoneNetoController from './MoneNetoController';
import ProductsController from './ProductsController';
import ContactController from './ContactController';
import AppController from './AppController';

var moduleName='controllers';

angular.module(moduleName, [])
    .controller('mainPageController', MainPageController)
    .controller('homeController', HomeController)
    .controller('projectsController', ProjectsController)
    .controller('aboutController', AboutController)
    .controller('moneNetoController', MoneNetoController)
    .controller('productsController', ProductsController)
    .controller('contactController', ContactController)
    .controller('appController', AppController)
    ;

export default moduleName;