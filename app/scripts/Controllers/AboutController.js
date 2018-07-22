import MainPageController from './MainPageController';

class AboutController extends MainPageController 
{
    constructor($timeout, $scope, $rootScope) 
	{
        //services
        super($scope, $rootScope, $timeout);

        var mapElement = document.getElementById('map');
        if(mapElement)
        {
            var myLatLng = {lat: 32.706, lng: 35.509};

            var map = new google.maps.Map(mapElement, {
            zoom: 12,
            center: myLatLng
            });

            var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'ירוק פרויקטים'
            });
        }
    }   
}
 
AboutController.$inject = ['$timeout', '$scope', '$rootScope'];
 
export default AboutController;