
class AppController{
    constructor($rootScope, $scope)
    {                 
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        $scope.$on('$routeChangeSuccess', function(angularEvent, current, previous) 
        { 
            $('.primary-button').removeClass('selected');
            if(!current || !current.originalPath)
                return;
            let btnId = current.originalPath.replace('/', '');
            if(!btnId)
                btnId='home';
                
            $('.primary-button#'+btnId).addClass('selected');
        });

        $scope.$on('$viewContentLoaded', function() 
        {
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (!d.getElementById(id))
                {
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=300958150346221";
                    fjs.parentNode.insertBefore(js, fjs);
                }

                if (window.FB) {
                window.FB.XFBML.parse();
            }
            }(document, 'script', 'facebook-jssdk'));            
        }.bind(this));
    }
}

AppController.$inject = ['$rootScope', '$scope'];

export default AppController;