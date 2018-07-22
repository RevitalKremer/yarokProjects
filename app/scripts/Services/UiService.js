import CRUDService from './CRUDService';

/**
* CRUD service for all client server operations
* (api requests) 
*/
class UiService extends CRUDService
{
    constructor($http, $rootScope, jsonParseService)
    {
        super($http, $rootScope);
        this.jsonParseService = jsonParseService;
    }

    sendMail()
    {
        book={};
        return $http.post('/api/mail', book);
    }

    ////////////////////////////////////////////////////////////////////
    //////////////////      Assets              ////////////////////////
        
    //@@@ HTTP GET /api/assets
    //@@@ HTTP GET /api/assets/connections
    //@@@ HTTP GET /api/assetsConnections?eqType=1&locType=null&hwType=1&architecture=1&side=1
    getSupportedConnections(port){
         return super._read('/api/assetsconnections?assetPortJson='+port);
    }

    ////////////////////////////////////////////////////////////////////
    //////////////////      Locations           ////////////////////////
    
    //@@@ HTTP GET /api/locations
    getLocations(){
        return super._read('/api/locations');
    }
    //@@@ HTTP GET /api/locations/1
    getLocationById(id)
    {
        return super._read('/api/locations/'+id);  
    }
    //@@@ HTTP GET /api/locations?parentId=1&levels=2&asTree=3
    getLocationsByFloor(floorId,levels,asTree){
        return super._read('/api/locations?parentId='+floorId+'&levels='+levels+'&asTree='+asTree);
    }
    
    //@@@ HTTP POST /api/devices?objCount=1&startIndex=2
    //@@@ HTTP POST /api/outlets?objCount=1&startIndex=2
    //@@@ HTTP POST /api/racks?objCount=1&startIndex=2
    //@@@ HTTP POST /api/locations?objCount=1&startIndex=2
    addLocation(apiName, location, objCount, startIndex){
        if(!location)
        {
            throw 'UiService.addLocation() null reference'; 
        }   
        
        if(location.Ports)
        {
            //add outlet or device - send server ports details as well
            let locationPort = location.Ports[0];
            locationPort.MacIps = null; //this is an object therefore cannot be serialized in server side
            location.Ports = null;
            return super._create('/api/'+apiName+'?objCount='+objCount+'&startIndex='+startIndex, {'location': location, 'port': locationPort});
        }
        else
        {
            return super._create('/api/'+apiName+'?objCount='+objCount+'&startIndex='+startIndex, location);
        }
        
    }
    //@@@ HTTP DELETE /api/locations/1
    deleteLocation(id){
        return super._delete('/api/locations/'+id);
    }
    //@@@ HTTP PUT /api/outlets/1
    //@@@ HTTP PUT /api/devices/1
    //@@@ HTTP PUT /api/racks/1
    //@@@ HTTP PUT /api/locations/1
    updateLocation(apiName, location)
    {
        if(!location){
            throw 'UiService.updateLocation() null reference'; 
        } 
        if(location.Ports && location.Ports.length>0)
        {
            //update outlet or device - send server ports details as well
            let locationPort = location.Ports[0];
            locationPort.MacIps = null; //this is an object therefore cannot be serialized in server side
            location.Ports = null;
            return super._update('/api/'+apiName+ '/'+location.LocationID, {'location': location, 'port': locationPort});
        }
        else
        {
            return super._update('/api/'+apiName+ '/'+location.LocationID, location);
        }   
    }
    //@@@ HTTP PUT /api/locations/1/parent?newParentId=2
    //@@@ HTTP PUT /api/locations/1/move?beforeId=2
    reparentLocation(id, newParentId){
        return super._update('/api/locations/'+id+'/parent?newparentId='+newParentId);
    }
    //@@@ HTTP PUT /api/locations/1/picture?pictureId=2
    setLocationPicture(id, pictureId)
    {
        if(!pictureId)
            return;
        return super._update('/api/locations/'+id+'/picture?pictureId='+pictureId);
    }    
    //@@@ HTTP PUT /api/locations/1/address

    
    ////////////////////////////////////////////////////////////////////
    //////////////////  Port Connections        ////////////////////////
    //@@@ HTTP GET /api/PortConnections
    getPortConnections(){
        return super._read('/api/portConnections').then(result => this.jsonParseService.pointerParse(result));
    }
    //@@@ HTTP GET /api/portConnections/validateScanner?portId=1
    validateScannerConnectionForPort(port)
    {
        return super._read('/api/portConnections/validateScanner?portId='+port.PortId);
    }  
    //@@@ HTTP GET /api/patchCords/1
    //@@@ HTTP GET /api/patchCords?portId=1
    //@@@ HTTP GET /api/patchCords/1/full
    //@@@ HTTP PUT /api/portConnections/attach?createdUserId=1&assignedUserId=2&details="blabla"&isWo=false
    attachPorts(portsToAttach, createdUserId, assignedUserId, details, isWo){
        if(!portsToAttach){
            throw 'UiService.attachPorts() null reference'; 
        }    
        return super._create('/api/portConnections/attach?createdUserId='+createdUserId+'&assignedUserId='+assignedUserId+'&details='+details+'&isWo='+isWo, portsToAttach);
    }

    //@@@ HTTP PUT /api/portConnections/detach?createdUserId=1&assignedUserId=2&details="blabla"&isWo=false
    detachPorts(portsToAttach, createdUserId, assignedUserId, details, isWo){
        if(!portsToAttach){
            throw 'UiService.detachPorts() null reference'; 
        }    
        return super._create('/api/portConnections/detach?createdUserId='+createdUserId+'&assignedUserId='+assignedUserId+'&details='+details+'&isWo='+isWo, portsToAttach);//;
    }

    //@@@ HTTP GET /api/channel/1
     getChannel(portId){
        if(!portId){
            throw 'UiService.getChannel() null reference'; 
        }    
        return super._read('/api/channel/'+portId);
    } 

    //@@@ HTTP GET /api/channel?outlets=1&outlets=2&outlets=3
    refreshOutletsState(outletIds)
    {
        if(!outletIds)
            throw 'UiService.refreshOutletsState() null reference';
        let ids = '';
        outletIds.forEach(function(id) {
            if(ids.length>0)
                ids+= '&';
            ids += 'outlets=' + id;
        }, this);
        return super._read('/api/channel?'+ids);
    }
      
    //@@@ HTTP PUT /api/patchCords/1/design?isDesign=true
    //@@@ HTTP PUT /api/patchCords/confirm?panelId=1?isDesign=true
    //@@@ HTTP PUT /api/patchCords/confirm?scannerId=1?isDesign=true
    //@@@ HTTP PUT /api/patchCords/attach?isWo=true

    ////////////////////////////////////////////////////////////////////
    //////////////////  Ports                   ////////////////////////
    //@@@ HTTP GET /api/ports/1
    
    //@@@ HTTP PUT /api/fiberPort/1
    //@@@ HTTP PUT /api/copperPort/1
    //@@@ HTTP PUT /api/G2Port/1
    //@@@ HTTP PUT /api/contactPanelPort/1
    //@@@ HTTP PUT /api/passivePort/1
    //@@@ HTTP PUT /api/switchPort/1
    //@@@ HTTP PUT /api/serverPort/1
    //@@@ HTTP PUT /api/outletPort/1
    //@@@ HTTP PUT /api/devicePort/1
    updatePort(apiName, port)
    {
        if(!port){
            throw 'UiService.updatePort() null reference'; 
        }    
        return super._update('/api/'+apiName+ '/'+port.PortId, port);
    }
    //@@@ HTTP PUT /api/contactPorts/1/led?isOn=true
    //@@@ HTTP PUT /api/smartPorts/1/led?isOn=true
    //@@@ HTTP PUT /api/smartPorts/1/rescanChannelState
    rescanChannelState(portId)
    {
        if(!portId){
            throw 'UiService.rescanChannelState() null reference'; 
        }    
        return super._update('/api/smartPorts/'+portId+'/rescanChannelState');
    }
    //@@@ HTTP PUT /api/mpo/1
    updateMpo(mpo)
    {
        if(!mpo){
            throw 'UiService.updateMpo() null reference'; 
        }    
        return super._update('/api/mpo/'+mpo.Id, mpo);
    }
    ////////////////////////////////////////////////////////////////////
    //////////////////  Rack Equipment          ////////////////////////
    //@@@ HTTP GET /api/rackEquipment
    getRackEquipment()
	{
        return super._read('/api/rackEquipment');
    }
    //@@@ HTTP GET /api/RackEquipment/1
    getRackEquipmentById(id)
	{
        return super._read('/api/rackEquipment/'+id);
    }
    //@@@ HTTP GET /api/rackEquipment?rackId=1
    getRackEquipmentByRack(rackId)
	{
        return super._read('/api/rackEquipment?rackId='+rackId);
    }

    //@@@ HTTP POST /api/scanners?rackId=1&objCount=2&startUnum=3&startIndex=4&scannerId=5
    //@@@ HTTP POST /api/smartPanels?rackId=1&objCount=2&startUnum=3&startIndex=4
    //@@@ HTTP POST /api/contactPanels?rackId=1&objCount=2&startUnum=3&startIndex=4
    //@@@ HTTP POST /api/passivePanels?rackId=1&objCount=2&startUnum=3&startIndex=4
    //@@@ HTTP POST /api/switches?rackId=1&objCount=2&startUnum=3&startIndex=4
    //@@@ HTTP POST /api/servers?rackId=1&objCount=2&startUnum=3&startIndex=4
    //@@@ HTTP POST /api/rackEquipment?rackId=1&objCount=2&startUnum=3&startIndex=4
    addRackEquipment(apiName, rackEquip, objCount, startUnum, startIndex)
    {
        if(!rackEquip)
        {
            throw 'UiService.addRackEquipment() null reference'; 
        }    
        var rackId = rackEquip.RackId;
        if(rackEquip.ScannerHWID)
        {
            return super._create('/api/'+apiName+'?rackId='+rackId+'&objCount='+objCount+'&startUnum='+startUnum+'&startIndex='+startIndex+'&scannerId='+rackEquip.ScannerHWID, rackEquip);          
        }
       
        return super._create('/api/'+apiName+'?rackId='+rackId+'&objCount='+objCount+'&startUnum='+startUnum+'&startIndex='+startIndex, rackEquip);
    }
    
    //@@@ HTTP DELETE /api/RackEquipment/1
    deleteRackEquipment(id){
        return super._delete('/api/RackEquipment/'+id);
    }

    //@@@ HTTP PUT /api/rackEquipment/1/move?newUnum=2
    moveRackEquipment(EquipID, newPosition)
    {
        return super._update('/api/rackEquipment/'+EquipID+'/move?newUnum='+newPosition);
    }

    //@@@ HTTP PUT /api/scanners/1
    //@@@ HTTP PUT /api/smartPanels/1
    //@@@ HTTP PUT /api/contactPanels/1
    //@@@ HTTP PUT /api/passivePanels/1
    //@@@ HTTP PUT /api/switches/1
    //@@@ HTTP PUT /api/servers/1
    //@@@ HTTP PUT /api/rackEquipment/1
    updateRackEquipment(apiName, rackEquip){
        if(!rackEquip){
            throw 'UiService.updateRackEquipment() null reference'; 
        }    
        return super._update('/api/'+apiName+ '/'+rackEquip.EquipID, rackEquip);
    }
    //@@@ HTTP PUT /api/panels/1/setLed?isOn=true

    ////////////////////////////////////////////////////////////////////
    //////////////////      Scanners            ////////////////////////
    //@@@ HTTP GET /api/scanners/ports/1
    //@@@ HTTP GET /api/scanners/ports/1/full
    //@@@ HTTP PUT /api/scanners/ports/1/led?isOn=true
    //@@@ HTTP PUT /api/scanners/1/panelScan
    //@@@ HTTP PUT /api/scanners/1/patchcordScan
    //@@@ HTTP PUT /api/scanners/1/state
    //@@@ HTTP PUT /api/scanners/1/rescanPatchcords
    //@@@ HTTP PUT /api/scanners/1/rescanPatchcords?portNum=1&portType=1
    //@@@ HTTP PUT /api/scanners/ports/1/activate?isActive=true
    activateScanner(scannerPortId, isActive){
        return super._update('/api/scanners/ports/'+scannerPortId+'/activate?isActive='+isActive);
    }
    //@@@ HTTP PUT /api/scanners/ports/1/attach?panelId=1&createdUserId=1&assignedUserId=1&details=text&isAttach=true&isActive=false&isWo=false
    attachScanner(scannerPortId, panelId, createdUserId, assignedUserId, details, isWo, isActive, isAttach){
        return super._update('/api/scanners/ports/'+scannerPortId+'/attach?panelId='+panelId+'&createdUserId='+createdUserId+'&assignedUserId='+assignedUserId+'&details='+details+'&isAttach='+isAttach+'&isActive='+isActive+'&isWo='+isWo);
    }
    //@@@ HTTP POST /api/scannerLicense/1?key=abc
    //@@@ HTTP DELETE /api/scannerLicenses/1
    //@@@ HTTP GET /api/scannerLicenses
    getScannersLicenses()
	{
        return super._read('/api/scannerLicenses');
    }
    //@@@ HTTP GET /api/scanners/free
    getFreeScannersIds(){
        return super._read('/api/scanners/free');
    }
    //@@@ HTTP POST /api/scannerLicenses/1000
    addScannerLicense(scannerHwID, activationKey)
    {
        return super._create('/api/scannerLicenses/'+scannerHwID, JSON.stringify(activationKey));
    }
    //@@@ HTTP DELETE /api/scannerLicenses/1000
    deleteScannerLicense(scannerHwID)
    {
        return super._delete('/api/scannerLicenses/'+scannerHwID);
    }

    ////////////////////////////////////////////////////////////////////
    //////////////////  work Orders             ////////////////////////
    //@@@ HTTP GET /api/workOrders?startId=1&count=2
    getWorkOrders(startId)
    {
        let count = 100;
        return super._read('/api//workOrders?startId='+startId+'&count='+count);        
    }
    //@@@ HTTP GET /api/workOrders/count
    getWorkOrdersCount()
    {
        return super._read('/api/workOrders/count');        
    }
    //@@@ HTTP PUT /api/workOrders/1/cancel
    cancelWorkOrder(woId)
    {
        return super._update('/api/workOrders/'+woId+'/cancel');        
    }
    //@@@ HTTP PUT /api/workOrders/1/done
    completeWorkOrder(woId)
    {
        return super._update('/api/workOrders/'+woId+'/done');        
    }
    //@@@ HTTP PUT /api/workOrders/1/current
    backToCurrent(woId)
    {
        return super._update('/api/workOrders/'+woId+'/current');        
    }
    //@@@ HTTP PUT /api/workOrders/cancel?portId=1&side=front
    cancelPortWorkOrder(portId,side)
    {
        return super._update('/api/workOrders/cancel?portId='+portId+'&side='+side);        
    }
    //@@@ HTTP PUT /api/workOrders/done?portId=1&side=front
    completePortWorkOrder(portId,side)
    {
        return super._update('/api/workOrders/done?portId='+portId+'&side='+side);        
    }
    //@@@ HTTP PUT /api/workOrders/1?assignedUser=1&started=2017-01-17T00:30:00.000Z&due=2017-01-17T00:30:00.000Z
    updateWorkOrder(workOrder)
    {
        if(!workOrder)
            throw 'UiService.updateWorkOrder() null reference';
        
        let start, due;
        if(workOrder.StartDateUTC)
            start = workOrder.StartDateUTC.toISOString();
        if(workOrder.DueDateUTC)
            due = workOrder.DueDateUTC.toISOString();
        
        return super._update('/api/workOrders/'+workOrder.WoID+'?assignedUser='+workOrder.AssignedToUserID+'&started='+start+'&due='+due);      
    }
    //@@@ HTTP DELETE /api/workOrders/1
    //@@@ HTTP DELETE /api/workOrders?ids=1&ids=2&ids=3
    deleteWorkOrders(woIds)
    {
        if(!woIds)
            throw 'UiService.deleteWorkOrders() null reference';
        let ids = '';
        woIds.forEach(function(id) {
            if(ids.length>0)
                ids+= '&';
            ids += 'ids=' + id;
        }, this);
        return super._delete('/api/workOrders?'+ids);
    }


    ////////////////////////////////////////////////////////////////////
    //////////////////  users                   ////////////////////////
    //@@@ HTTP POST /api/Authentication/Logout
    logout(){        
        return super._post('/api/Authentication/logout');
    }
    //@@@ HTTP POST /api/Authentication?loginName=admin&password=c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec&IsRememberMe=true
    login(loginName, password, rememberMe){
        return super._post('/api/Authentication?'+'loginName='+loginName+'&password='+password+'&IsRememberMe='+rememberMe);
    }
    
     //@@@ HTTP GET /api/Authentication/domainNames
    getDomainNames(){        
        return super._read('/api/Authentication/domainNames');
    }
    //@@@ HTTP POST /api/users?password=1& tbd revital: how should filter be sent?
    //@@@ HTTP GET /api/users
    getUsers(){
         return super._read('/api/users');
    }
    //@@@ HTTP GET /api/users?username=aaa
    //@@@ HTTP GET /api/currentUser    
    getCurrentUser(){       
         return super._read('/api/currentUser');
    }
    //@@@ HTTP PUT /api/users/1
    //@@@ HTTP PUT /api/users/admin/changePassword?oldPassword=2&newPassword=3
    //@@@ HTTP PUT /api/users/admin/resetPassword?password=2
    //@@@ HTTP DELETE /api/users/1

    ////////////////////////////////////////////////////////////////////
    //////////////////  pictures                ////////////////////////
    //@@@ HTTP GET /api/pictures
    getPictures()
    {
        return super._read('/api/pictures');
    }
    //@@@ HTTP GET /api/pictures/1
    getPicture(id)
    {
        return super._read('/api/pictures/'+id);
    }
    //@@@ HTTP GET /api/pictures?locationId=1
    getPictureByLocation(locationId)
    {
        return super._read('/api/pictures?locationId='+locationId);
    }
    //@@@ HTTP PUT /api/pictures/1?fileName=aaa&description=bbb
    updatePicture(id,fileName,description)
    {
        return super._update('/api/pictures/'+id+'?fileName='+fileName+'&description='+description);
    }
    //@@@ HTTP DELETE /api/pictures/1
    deletePicture(id)
    {
        return super._delete('/api/pictures/'+id);
    }

    ////////////////////////////////////////////////////////////////////
    //////////////////  configuration           ////////////////////////
    //@@@ HTTP GET /api/configuration
    getConfiguration()
    {
        return super._read('/api/configuration');
    }
    //@@@ HTTP GET /api/configuration/serverlocaltime
    getServerLocalTime()
    {
        return super._read('/api/configuration/serverlocaltime');
    }
    //@@@ HTTP GET /api/configuration/brand
    getBrandConfiguration()
    {
        return super._read('/api/configuration/brand');
    }
    //@@@ HTTP GET /api/configuration/culture
    getCulture()
    {
        return super._read('/api/configuration/culture');
    }
    //@@@ HTTP GET /api/configuration/general
    getGeneralConfiguration()
    {
        return super._read('/api/configuration/general');
    }
    //@@@ HTTP GET /api/configuration/snmpAgent
    getSnmpAgent()
    {
        return super._read('/api/configuration/snmpAgent');
    }
    //@@@ HTTP GET /api/configuration/ad/frequency
    getActiveDirectoryFrequency()
    {
        return super._read('/api/configuration/ad/frequency');
    }
    //@@@ HTTP GET /api/configuration/ad/group
    getActiveDirectoryGroupName()
    {
        return super._read('/api/configuration/ad/group');
    }
    
    //@@@ HTTP PUT /api/configuration/validateLicense
    validateLicense()
    {
        return super._update('/api/configuration/validateLicense');
    }
    //@@@ HTTP PUT /api/configuration/license
    updateSiteLicenseIp(ip)
    {
        return super._update('/api/configuration/license',JSON.stringify(ip));
    }
    //@@@ HTTP PUT /api/configuration/culture
    updateCulture(culture2LettersCode)
    {
        return super._update('/api/configuration/culture', JSON.stringify(culture2LettersCode));
    }
    //@@@ HTTP PUT /api/configuration/wanName
    updateServerWanName(name)
    {
        return super._update('/api/configuration/wanName',JSON.stringify(name));
    }

    //@@@ HTTP PUT /api/configuration/snmpAgent
    updateSnmpAgent(obj)
    {
        return super._update('/api/configuration/snmpAgent',obj);
    }

    //@@@ HTTP PUT /api/configuration/ad/frequency
    updateActiveDirectoryFrequency(interval)
    {
        return super._update('/api/configuration/ad/frequency',interval);
    }
    //@@@ HTTP PUT /api/configuration/ad/group
    updateActiveDirectoryGroupName(name)
    {
        return super._update('/api/configuration/ad/group',JSON.stringify(name));
    }
    //@@@ HTTP PUT /api/configuration/ad/sync
    syncActiveDirectory()
    {
        return super._update('/api/configuration/ad/sync');
    }



    ////////////////////////////////////////////////////////////////////
    //////////////////  discovery               ////////////////////////
    //@@@ HTTP GET /api/discovery
    getDiscoveryInfo()
    {
        return super._read('/api/discovery');        
    }
    //@@@ HTTP GET /api/discovery/macips
    //@@@ HTTP GET /api/discovery/switches
    //@@@ HTTP GET /api/discovery/switches/1/subnets
    getSwitchSubnets(switchId)
    {
        return super._read('/api/discovery/switches/'+switchId+'/subnets');                
    }
    //@@@ HTTP POST /api/discovery/subnets
    //@@@ HTTP DELETE /api/discovery/subnets/1
    //@@@ HTTP PUT /api/discovery/subnets
    //@@@ HTTP PUT /api/discovery
    //@@@ HTTP PUT /api/discovery/switch/1
    startSwitchDiscovery(switchId)
    {
        return super._update('/api/discovery/switch/'+switchId);        
    }
    //@@@ HTTP PUT /api/discovery/snmp?ip=1.2.3.4
    updateSnmpDetails(ip)
    {
        return super._update('/api/discovery/snmp?ip='+JSON.stringify(ip));                
    }
    //@@@ HTTP PUT /api/discovery/switches/1/subnets
    setSwitchSubnets(switchId, subnetIds)
    {
        return super._update('/api/discovery/switches/'+switchId+'/subnets',subnetIds);                
    }

    ////////////////////////////////////////////////////////////////////
    //////////////////  dashboard               ////////////////////////
    //@@@ HTTP GET /api/dashboard/enableCollect
    getDashboardCollectEnableFlag(switchId)
    {
        return super._read('/api/dashboard/enableCollect');                
    }
    //@@@ HTTP GET /api/dashboard/enableCollect
    updateDashboardCollectEnableFlag(enable)
    {
        return super._update('/api/dashboard/enableCollect',enable === true);                
    }
    //@@@ HTTP DELETE /api/dashboard/data
    clearDataHistory()
    {
        return super._delete('/api/dashboard/data');                
    }


    ////////////////////////////////////////////////////////////////////
    //////////////////  changes                 ////////////////////////
    //@@@ HTTP POST /api/changes?requestTime=2017-01-17T00:30:00.000Z
    getChanges(registeredObj)
    {
        return new Promise(function(resolve, reject)
        {
            let reqDate = new Date();
            return super._post('/api/changes?requestTime='+reqDate.toISOString(), registeredObj ).then(result =>
            { 
                if(result.data)
                {
                    let test = this.jsonParseService.pointerParse(result.data);
                }
                resolve(result);
            })
        }.bind(this));
    }

    



    static serviceFactory($http, $rootScope, jsonParseService){
      return new UiService($http, $rootScope ,jsonParseService);
  }
}

UiService.serviceFactory.$inject = ['$http', '$rootScope', 'jsonParseService'];


export default UiService;
