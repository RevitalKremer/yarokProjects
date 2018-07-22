import MainPageController from './MainPageController';

class ContactController extends MainPageController 
{
    constructor($timeout, $scope, $rootScope) 
	{
        //services
        super($scope, $rootScope, $timeout);
        
        
    }
}
 
ContactController.$inject = ['$timeout', '$scope', '$rootScope'];
 
export default ContactController;