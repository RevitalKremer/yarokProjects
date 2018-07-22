import ContactUs from './ContactUs';
import Calculator from './Calculator';

var moduleName='directives';

angular.module(moduleName, [])
    .directive('contactUs', ['$rootScope', '$http', '$animate', ContactUs.directiveFactory])
    .directive('calculator', ['$rootScope', '$http', '$animate', Calculator.directiveFactory])
    ;

export default moduleName;