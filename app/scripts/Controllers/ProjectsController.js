import MainPageController from './MainPageController';


class ProjectsController extends MainPageController 
{
    constructor($scope, $rootScope, $timeout)
    {
        super($scope, $rootScope, $timeout);
        // Set of Photos
        this.photos = [
            {category : 'מערכות עסקיות', src: 'tiratZvi.jpg', desc: 'מערכת סולארית בהספק של 50 קילו וואט בטירת צבי'},
            {category : 'מערכות ביתיות', src: 'yavneel.jpg', desc: 'מערכת סולארית ביתית בהספק של 25 קילו וואט ביבנאל'},
            {src: 'yahel1.jpg', desc: '45 מערכות סולאריות ביתיות ועוד 6 מערכות עסקיות בקיבוץ יהל'},
            {src: 'yahel2.jpg', desc: '45 מערכות סולאריות ביתיות ועוד 6 מערכות עסקיות בקיבוץ יהל'},
            {src: 'poria.jpg', desc: 'מערכת סולארית ביתית בהספק של 15 קילו וואט בפוריה'},

            {src: 'netivHagdud.jpg', desc : 'מערכת סולארית קרקעית עוקבת שמש בהספק של 4 מגה וואט בנתיב הגדוד'},
            {src: 'netivHagdud1.jpg', desc : 'מערכת סולארית קרקעית עוקבת שמש בהספק של 4 מגה וואט בנתיב הגדוד'},

            {src: 'arbel.jpg', desc : 'מערכת סולארית ביתית בהספק של 15 קילו וואט בארבל'},
            {src: 'kfarZeitim.jpg', desc : 'מערכת סולארית בהספק של 50 קילו וואט בכפר זיתים'},
            {src: 'kfarZeitim1.jpg', desc : 'מערכת סולארית ביתית בהספק של 15 קילו וואט בכפר זיתים'},
            {src: 'neveOved.jpg', desc : 'מערכת סולארית ביתית בהספק של 15 קילו וואט בנווה עובד'},
            {src: 'SdeIlan.jpg', desc : 'מערכת סולארית ביתית בהספק של 15 קילו וואט בשדה אילן'},
            {src: 'SdeIlan1.jpg', desc : 'מערכת סולארית ביתית בהספק של 15 קילו וואט בשדה אילן'},
            {src: 'SdeIlan2.jpg', desc : 'מערכת סולארית בהספק של 30 קילו וואט בשדה אילן'},
            {src: 'SdeIlanB.jpg', desc : 'שדה אילן - 3 מערכות סולאריות מסחריות בהספק של 50 קילו וואט כל אחת ועוד מערכת סולארית בהספק של 150 קילו וואט במונה נטו'},
            {src: 'barkan.jpg', desc : 'מערכת סולארית בהספק של 630 קילו וואט בא.ת. ברקן'},
            {src: 'migdalhaemek.jpg', desc : 'מערכת סולארית בהספק של 50 קילו וואט במגדל העמק'},
            {src: 'migdalhaemek3.jpg', desc : 'מערכת סולארית בהספק של 50 קילו וואט במגדל העמק'},

            {src: 'shadmotdevora1.jpg', desc : 'מערכת סולארית ביתית בהספק של 15 קילו וואט בשדמות דבורה'},
            {src: 'shadmotdevora.jpg', desc : 'מערכת סולארית ביתית בהספק של 15 קילו וואט בשדמות דבורה'},
            {src: 'sarona.jpg', desc : 'שרונה -  מערכת ביתית בהספק של 15 קילו וואט בעלת 3 מפנים. מחוברת לאופטימייזרים של solar edge למיקסום הגג'},
            {src: 'sarona2.jpg', desc : 'שרונה -  מערכת ביתית בהספק של 8 קילו וואט בעלת 2 מפנים. מחוברת לאופטימייזרים של solar edge למיקסום הגג'},
            {src: 'kfartavor2.jpg', desc : 'מערכת סולארית ביתית בהספק של 15 קילו וואט בכפר תבור'},
            {src: 'kfartavor.jpg', desc : 'מערכת סולארית ביתית בהספק של 15 קילו וואט בכפר תבור'},
        ];
        // initial image index
        this._Index = 0;
        // if a current image is the same as requested image
        this.isActive = function (index) {
        return this._Index === index;
        };
        // show prev image
        this.showPrev = function () {
        this._Index = (this._Index > 0) ? --this._Index : this.photos.length - 1;
        };
        // show next image
        this.showNext = function () {
        this._Index = (this._Index < this.photos.length - 1) ? ++this._Index : 0;
        };
        // show a certain image
        this.showPhoto = function (index) {
        this._Index = index;
        };
    }
}

// class ProjectsController extends MainPageController 
// {
//     constructor($scope, $rootScope, $timeout)
//     {
//         super($scope, $rootScope, $timeout);
    
//         this.images = [
            
//             {category : 'מערכות ביתיות', image : 'DJI_0015.jpg', description : ' '},
//             {category : 'מערכות ביתיות', image : 'DJI_0025.jpg', description : 'יבנאל'},
//             {category : 'מערכות ביתיות', image : 'DSC06915.jpg', description : 'יהל'},
//             {category : 'מערכות ביתיות', image : 'DSC07021.jpg', description : 'יהל'},
            
//             {category : 'מערכות ביתיות', image : 'img1.jpg', description : 'פוריה'},
//             // {category : 'מערכות ביתיות', image : 'img2.jpg', description : 'פוריה'},
//             // {category : 'מערכות ביתיות', image : 'img3.jpg', description : 'לא יודעת'},
//             // {category : 'מערכות ביתיות', image : 'img4.jpg', description : 'לא יודעת'},
//             // {category : 'מערכות ביתיות', image : 'img5.jpg', description : 'לא יודעת'},
//             {category : 'מערכות ביתיות', image : 'img6.jpg', description : 'פוריה'},

//             {category : 'מערכות עסקיות', image : '20170514012131_1.jpg', description : 'טרקרים נתיב הגדוד'},
//             {category : 'מערכות עסקיות', image : 'DJI_0016.jpg', description : 'טרקרים נתיב הגדוד'},
//             {category : 'מערכות עסקיות', image : 'DJI_0019.jpg', description : ' '},

//             {category : 'אחר', image : 'IMG-20170529-WA0209.jpg', description : 'מסלול מונה נטו אחיד'},
//         ];
        
//         this.currentImage = _.first(this.images);
        
//         this.imageCategories = _.uniq(_.pluck(this.images, 'category'));
            
//         this.setCurrentImage = function(image) {
//             this.currentImage = image;
//         };
//     }
// }

ProjectsController.$inject = ['$scope', '$rootScope', '$timeout'];


export default ProjectsController;