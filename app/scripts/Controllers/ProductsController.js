import MainPageController from './MainPageController';

class ProductsController extends MainPageController 
{
    constructor($timeout, $scope, $rootScope, $routeParams) 
	{
        //services
        super($scope, $rootScope, $timeout);
        
        var acc = document.getElementsByClassName("accordion");
        

        for (var i = 0; i < acc.length; i++) 
        {
          acc[i].onclick = function() 
          {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight)
            {
              panel.style.maxHeight = null;
            } 
            else 
            {
              if(panel.scrollHeight > 0)
                panel.style.maxHeight = panel.scrollHeight + "px";
              else
                panel.style.maxHeight = "50%";
            } 
          }
        }

        if($routeParams.expand == 'true')
        {
          $timeout( function()
          {
            var acc1 = document.getElementsByClassName("accordion");

            for (var i = 0; i < acc1.length; i++) 
            {
              acc1[i].click();
            }
          }.bind(this), 0 );
            
        }

        
    }
}
 
ProductsController.$inject = ['$timeout', '$scope', '$rootScope', '$routeParams'];
 
export default ProductsController;