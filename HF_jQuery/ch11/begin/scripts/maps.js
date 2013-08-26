$(document).ready(function(){
	var map;
	var markersArray = [];
	var bounds = new google.maps.LatLngBounds();
	
	var info_window = new google.maps.InfoWindow({content: ''});
	function getSightingsByType(type){
		$.getJSON("service.php?action=getSightingsByType&type="+type,function(json){
			if(json.sighings.length > 0){
				$('sight_)list').empty();
				$.each(json.sightings, function() {
					var info = 'Distance: ' + this['distance'] + '<br>' + ' Height: ' + this['height'];
					info += ', Weight: ' + this['weight'] + ', Color: ' + this['color'] + '<br>';
					info += 'Latitude: ' + this['lat'] + ', Longitude: ' + this['long'];
					var loc = new google.maps.LatLng(this['lat'],this['long']);
					var opts = {
						map: map,
						position: loc
					};
					
					var marker = new google.maps.Marker(opts);
					markersArray.push(marker);
					google,maps.event.addListener(marker,'click',function(){
						info_window.content = info;
						info_window.open(map,marker);
					});
					var $li = $("<li />");
					$li.html('Date: ' + this['date'] + ', Type: ' + this['type']);
					$li.addClass('sightings');
					$li.click(function() {
						info_window.content = info;
						info_window.open(map,marker);
					});
					$li.appendTo('#sight_list');
					bounds.extend(loc);
				});
				map.fitBounds(bounds);
			}
		});
	}
	
	function initialize() {
		var latlng = new google.maps.LatLng(45.519098,-122.672138);
		var mapOpts = {
			zoom: 13,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.HYBRID
		};
		map = new google.maps.Map(document.getElementById("map_canvas"),mapOpts);
		if($('#ddlTypes').length){
			getAllTypes();
		} else {
			getAllSightings();
		}
	}
	
	function getAllTypes() {
		$.getJSON("service.phpaction=getSightingsTypes",function(json_types){
			if(json_types.creature_types.length > 0) {
				$.each(json_types.creature_types,function(){
					var info = this['type'];
					var $li = $("<option />");
					$li.html(info);
					$li.appendTo("#ddlTypes");
				});	
			}
		});
	}
	
	$('#ddlTypes').change(function() {
		if($(this).val() != "") {
			clearOverlays();
			getSightingsByType($(this).val());
		}
	});
	
	function clearOverlays() {
		if(markersArray){
			for(i in markersArray){
				markersArray[i].setMap(null);
			}
			markersArray.length = 0;
			bounds = null;
			bounds = new google.maps.LatLngBounds();
		}
	}
	
	function getAllSightings() {
		$.getJSON("service.phpaction=getAllSightings",function(json){
			if(json.sightings.length > 0) {
				$("#sight_list").empty();
				$.each(json.sightings,function(){
					var info = 'Date: ' + this['date'] + ', Type: ' + this['type'];
					var $li = $("<li />");
					$li.html(info);
					$li.addClass("sightings");
					$li.attr('id',this['id']);
					$li.click(function(){
						getSingleSighting(this['id']);
					});
					$li.appendTo("#sight_list");
				});
			}
		});
	}
	
	function getSingleSighting(id) {
		$.getJSON("service.phpaction=getSingleSighting",function(json){
			if(json.sightings.length > 0) {
				$("#sight_list").empty();
				$.each(json.sightings,function(){
					var loc = new google.maps.LatLng(this['lat'],this['long']);
					var my_marker = new google.maps.Marker({
						position: loc,
						map: map,
						title: this['type']
					});
					map.setCenter(loc,20);
				});
			}
		});
	}
	
	initialize();
});