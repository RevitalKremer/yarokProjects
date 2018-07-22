
class Calculator {
    constructor($rootScope, $http, $animate) 
    {
        this.restrict = 'AE';
        this.templateUrl = '../../templates/Directives/calculatorTemplate.html';
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$animate = $animate;
        this.scope = {
            yearCunsumeInNis: "=",
        };


        this.link = function(scope)
        {
            this.directiveScope = scope;
            scope.$rootScope = this.$rootScope;

            scope.productionPerKVat = 1700;
            scope.pricePerKVat = 0.54;
            if(!scope.yearCunsumeInNis)
                scope.yearCunsumeInNis = 12000;

            scope.calc = function() 
            {
                scope.systemSizeInKVat = scope.yearCunsumeInNis/(scope.pricePerKVat*scope.productionPerKVat);
                scope.systemSizeInKVat = parseFloat(scope.systemSizeInKVat).toFixed(1);

                scope.systemSizeInMM = scope.systemSizeInKVat*12;
                scope.systemSizeInMM = parseFloat(scope.systemSizeInMM).toFixed(0);
            }.bind(this);

            if(scope.yearCunsumeInNis>0)
                scope.calc();

            

            
            
            

        }.bind(this);
    }

 
    static directiveFactory($rootScope, $http, $animate) {
        Calculator.instance = new Calculator($rootScope, $http, $animate);
        return Calculator.instance;
    }
}

Calculator.$inject = ['$rootScope', '$http', '$animate'];

export default Calculator;