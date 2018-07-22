import MainPageController from './MainPageController';

class HomeController extends MainPageController 
{
    constructor($timeout, $scope, $rootScope) 
	{
        //services
        super($scope, $rootScope, $timeout);
        
        
    }
    test()
    {
        location.href = "mailto:"+emailTo+'?cc='+emailCC+'&subject='+emailSub+'&body='+emailBody;
    }
}
 
HomeController.$inject = ['$timeout', '$scope', '$rootScope'];
 
export default HomeController;