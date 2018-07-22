import MainPageController from './MainPageController';

class MoneNetoController extends MainPageController 
{
    constructor($timeout, $scope, $rootScope) 
	{
        //services
        super($scope, $rootScope, $timeout);
        
        
    }
}
 
MoneNetoController.$inject = ['$timeout', '$scope', '$rootScope'];
 
export default MoneNetoController;