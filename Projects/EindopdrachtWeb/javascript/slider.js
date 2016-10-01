/* Matthieu Van Wambeke
 1NMCT1
 EINDOPDRACHT WEB
 -------------------
 */

$(document).ready(function(){
     var slides = $('#slider ul li');
     var slideAantal = slides.length;
     if  (document.body.offsetWidth > 800){
	 Breedte = 800;
	 }
	 else{
		Breedte = 450; 
	 }
     var huidig = 0;
$('#slider ul').css('width', slideAantal * Breedte);
     $('.navigatie a').click(function() {
		 if  (document.body.offsetWidth > 800){
	 Breedte = 800;
	 }
	 else{
		Breedte = 450; 
	 }
	 
           if ($(this).attr('id') == 'volgende') {
           
                huidig = huidig + 1;
           }

           else {
                
                huidig = huidig - 1;
           }
           navigatie(huidig);
$('#slider ul').animate({
                'marginLeft' : (-huidig * Breedte)
           });
});
function navigatie(huidig) {

if (slideAantal - 1 == huidig) {
$('#volgende').hide()
} 
else {
                $('#volgende').show()
           }
           
           if (huidig == 0) {
$('#vorige').hide()
} 
else {
                $('#vorige').show()
           }
}
     navigatie(huidig);
});