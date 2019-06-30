//@ Firework JS 

'use strict';
$(window).on('load', function() { 
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut(); 
	$("#preloder").delay(400).fadeOut("slow");


	/*------------------
		Isotope Filter
	--------------------*/
	var $container = $('.isotope_items');
	$container.isotope();

	$('.portfolio-filter li').on("click", function(){
		$(".portfolio-filter li").removeClass("active");
		$(this).addClass("active");				 
		var selector = $(this).attr('data-filter');
		$(".isotope_items").isotope({
				filter: selector,
				animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false,
			}
		});
		return false;
	});
});



(function($){
	/*------------------
		Navigation
	--------------------*/
	$('.nav-switch').on('click', function(event) {
		$('.mainmenu').toggleClass('active');
		$(this).toggleClass('active');
		event.preventDefault();
	});
	$('.menu-list li a').on('click', function(event) {
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top - 0
		}, 1000);
		if ($(window).width() < 768) {
			$('.nav-switch').removeClass('active');
			$('.mainmenu').removeClass('active');
		}
		event.preventDefault();
	});





	/*------------------
		BG Parallax
	--------------------*/
	if ($(window).width() > 768) {
		$('.intro-bg').parallax("50%", 0.4);
		$('.promotion-bg').parallax("5%", -0.4);
	}


	/*------------------
		Text Rotator
	--------------------*/
	$(".rotate").textrotator({
		animation: "dissolve",
		separator: ",",
		speed: 2500
	});



	/*------------------
		Service Carousel
	--------------------*/
	$('#service-carousel').owlCarousel({
		dots: false,
		nav: true,
		margin:30,
		smartSpeed: 700,
		navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
		responsive:{
			0:{
				items:1,
			},
			600:{
				items:2,
			},
			1000:{
				items:3,
			}
		}
	});


	/*------------------
		Review Carousel
	--------------------*/
	$('.review-carousel').owlCarousel({
		dots: false,
		nav: true,
		loop: true,
		margin:30,
		smartSpeed: 700,
		items:1,
		autoplay:true,
		navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
	});


	/*------------------
		Magnific Popup
	--------------------*/
	$('.work-popup').magnificPopup({
		type:'image',
		gallery:{enabled:true}
	});


	/*------------------
		ScrollUp
	--------------------*/
	if ($(window).width() > 768) {
		$.scrollUp({
			scrollText: '<i class="fa fa-long-arrow-up"></i>',
			easingType: 'linear',
			scrollSpeed: 900,
			animation: 'fade',
			zIndex: 999
		});
	}



	/*------------------
		WOW JS
	--------------------*/
	new WOW().init();


	/*------------------
		Contact Form
	--------------------*/
	$('#con_form').on('submit', function() {
		var send_btn = $('#send-form'),
			form = $(this),
			formdata = $(this).serialize(),
			chack = $('#form-chack');
			send_btn.text('Wait...');

		function reset_form(){
		 	$("#name").val('');
			$("#email").val('');
			$("#massage").val('');
		}

		$.ajax({
			url:  $(form).attr('action'),
			type: 'POST',
			data: formdata,
			success : function(text){
				if (text == "success"){
					send_btn.addClass('done');
					send_btn.text('Success');
					setTimeout(function() {
						reset_form();
						send_btn.removeClass('done');
						send_btn.text('Send A Massege');
					}, 5000);
				}
				else {
					reset_form();
					send_btn.addClass('error');
					send_btn.text('Error');
					setTimeout(function() {
						send_btn.removeClass('error');
						send_btn.text('Send A Massege');
					}, 4000);
				}
			}
		});
		return false;
	});


	/*------------------
	GOOGLE MAP
	--------------------*/
	function initialize() {
		var myOptions = {
			zoom: 15,
			center: new google.maps.LatLng(-33.864083, 150.973713), //change the coordinates
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: false,
			mapTypeControl: false,
			zoomControl: false,
			streetViewControl: false
		};
		var map = new google.maps.Map(document.getElementById("map"), myOptions);
		var image = "img/marker.png";
		var marker = new google.maps.Marker({
			map: map,
			animation: google.maps.Animation.DROP,
			position: new google.maps.LatLng(-33.864083, 150.973713), //change the coordinates
			icon: image
		});
		google.maps.event.addListener(marker, "click", function() {
			infowindow.open(map, marker);
		});
	}
	google.maps.event.addDomListener(window, 'load', initialize);





})(jQuery);