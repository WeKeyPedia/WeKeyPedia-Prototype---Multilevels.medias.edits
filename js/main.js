var niveau = 0;
function hyphenate(str) {
	return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
var toc = $('.rubrique .col3');


$(document).ready(

	function(){

/*
		$('.container .colonne').eq(niveau).addClass('focused');
		$('#toolbar').addClass('niveau'+niveau);
		$('.container .rubrique .col3').addClass('focused');
		$('.container .rubrique .col3:nth-child('+ 1 + ')').removeClass('focused');
*/

		$('body').addClass("niveau0");
		$('#toolbar').css("opacity", 1);
		$('.container').css("opacity", 1);
		$('.container').css("width", "300vw");

/*
		$("#paperclipicon").click ( {
			$("#popup").css("-webkit-transform", "translate(0,-400px)");
		});
*/

		$('.rubrique > .col3').click ( function () {
			movecol($(this).data("gotoniveau"));
		});

		// gogo colonne cliquées
		var movecol = function (gotoniveau) {
			console.log(gotoniveau);
			$('#masque').animate({
				scrollLeft: $('#masque').scrollLeft() + $('.colonne[data-col=' + gotoniveau + ']').offset().left
			}, { duration: 400, queue: false });
			$('body').removeClass("niveau0 niveau1 niveau2");
			$('body').addClass(gotoniveau);
		};

		// si clique sur titre (id de l'élément à scroller)
		var movetitre = function (selector) {
			// scroll du haut
			$('#masque').animate({
				scrollTop: $('#masque').scrollTop() + selector.offset().top - 80
			}, { duration: 400, queue: false });
		};

		$('.colonne p, .colonne h4').wrap('<div class="bloctext"></div>');

		$('.colonne p, .colonne h4').append("<span class='edit'><small>edit</small></span>");

		// bordure gauche-droite
		$('<div class="border border-left"></div><div class="border border-right"></div>').insertAfter('.colonne p, .colonne h4');
		// icone a cote du titre
		$('<div class="gene"><img src="img/genealogy.svg" alt="glyphicons_008_film" width="" height="" /></div>').insertBefore('.inside h1');
		// icone dans toolbar
		$('#titrearticle').append('<div class="gene"><img src="img/genealogy.svg" alt="glyphicons_008_film" width="" height="" /></div>');

		// au clique sur les bordures
		$(".border-right").click(function() {
			niveau += 1;
			movecol( "niveau" + checkniveau(niveau) );
			movetitre( $("h2[data-topic=" + "development" + checkniveau(niveau) + "]") );
		});
		$(".border-left").click(function() {
			niveau -= 1;
			movecol( "niveau" + checkniveau(niveau) );
			movetitre( $("h2[data-topic=" + "development" + checkniveau(niveau) + "]") );
		});

		// toc
		var counter = 0;
		$('.colonne.simple h2').each(function() {
			var refcounter = 'simple'+counter++;
			$(this).attr('id', refcounter);
			$('.rubrique .simple ol').append('<li><h5 data-goto="'+refcounter+'">'+$(this).text()+'</h5></li>');
		});
		counter = 0;
		$('.colonne.moyen h2').each(function() {
			var refcounter = 'moyen'+counter++;
			$(this).attr('id', refcounter);
			$('.rubrique .moyen ol').append('<li><h5 data-goto="'+refcounter+'">'+$(this).text()+'</h5></li>');
		});
		counter = 0;
		$('.colonne.complex h2').each(function() {
			var refcounter = 'complex'+counter++;
			$(this).attr('id', refcounter);
			$('.rubrique .complex ol').append('<li><h5 data-goto="'+refcounter+'">'+$(this).text()+'</h5></li>');
		});

		$('.rubrique ol h5').click(function () {
			movetitre($(".colonne h2[id=" + $(this).data("goto") + "]"));
		});

		$('#masque').bind("scroll", function () {
			var scrollduhaut = $('#masque').scrollTop();
			if ( scrollduhaut < 80 ) {
				$('#toolbar').removeClass("far");
			} else {
				$('#toolbar').addClass("far");
			}
			//articleProche(scollduhaut);
			//$('.toolbar-fond')
		});

		var checkniveau = function (level) {
			level = level < 0 ? 0 : level;
			level = level > 2 ? 2 : level;
			return level;
		}


	}
);