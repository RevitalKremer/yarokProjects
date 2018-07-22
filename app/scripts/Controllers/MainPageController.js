class MainPageController
{

    constructor($scope, $rootScope, $timeout)
    {
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$timeout = $timeout;
        
        this.deregisterCallbacks = [];

        this.setKeyboardEventHandlers();
        this.initChangesHandlers();
        this.initTranslationsLoadingCompletedHandler();

        this.$scope.$on('$destroy', function(){
            this.deregisterCallbacks.forEach(function(callback) {
                callback();
            }, this);
        }.bind(this));

    }

    setKeyboardEventHandlers()//default inplementation for base class
    {
        document.body.onkeydown = null;
        // document.body.onkeydown = function(e)
        // {
        //     switch(e.keyCode)
        //     {
        //         default:
        //             alert(String.fromCharCode(e.keyCode)+" --> "+e.keyCode);
        //             break;
        //     }
        // }.bind(this);
    }
    initChangesHandlers() //default inplementation for base class
    {
    }
    initTranslationsLoadingCompletedHandler()//default inplementation for base class
    {
        this.deregisterCallbacks.push(this.$rootScope.$on(Event.translationsLoadingCompleted, function(event, data)
        {
            this.$scope.$broadcast('$$rebind::refresh');
        }.bind(this)));
    }
}


MainPageController.$inject = ['$scope', '$rootScope', '$timeout'];


export default MainPageController;