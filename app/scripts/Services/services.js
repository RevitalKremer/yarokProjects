import UiService from './UiService';

var moduleName='services';

angular.module(moduleName, [])
    .factory('uiService', UiService.serviceFactory)
    ;

export default moduleName;
