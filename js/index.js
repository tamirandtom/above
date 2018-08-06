mapboxgl.accessToken = 'pk.eyJ1IjoidGFtaXJwIiwiYSI6ImNqNmtvcjBieTFtOGgzMm52NWQ1Nnc1NTkifQ.CxOvrXtNgryGkkgXkiShsQ';

var chapters;
var activeChapterName;

// Set up map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/tamirp/cjimm2wsc0e0h2rod6cza0kxb',
    bearing: 150,
    center: [35.220873,31.780924],
    zoom: 14.5,
    pitch: 230
});

map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));

$.getJSON("model/mapData.json", function (data) {
    console.log('loaded data!');
    chapters = data;
    activeChapterName = Object.keys(chapters)[0];
if (isMobileDevice() || window.innerWidth<600) {
    console.log('here!')
    document.getElementById('map').setAttribute('style', 'height:'+(window.innerHeight+56)+'px;');
}
});
var buttonTrigger = false;
if (isMobileDevice()) {
    buttonTrigger = true;
}

// On every scroll event, check which element is on screen
window.onscroll = function () {
    if (chapters) {
        var chapterNames = Object.keys(chapters);
        for (var i = 0; i < chapterNames.length; i++) {
            var chapterName = chapterNames[i];
            if (isElementOnScreen(chapterName)) {
                setActiveChapter(chapterName);
                break;
            }
        }
    }
};

function setActiveChapter(chapterName) {
    if (chapterName === activeChapterName) return;
    map.flyTo(chapters[chapterName]);
    document.getElementById(chapterName).setAttribute('class', 'active');
    document.getElementById(activeChapterName).setAttribute('class', '');
    activeChapterName = chapterName;
}

// return element bottom bounds relative to screen
function isElementOnScreen(id) {
    var element = document.getElementById(id);
    var bounds = element.getBoundingClientRect();
    return (bounds.top - (window.innerHeight/2)) < window.innerHeight && bounds.bottom > (window.innerHeight/2);
}

// Scroll animation for inner links
$('a[href^="#"]').on('click', function(event) {
    var target = $( $(this).attr('href') );
    if( target.length ) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 500);
    }

});

// Toggle map button
var mapToggle = false
$( "#toggle-map" ).on( "click", function() {
    if (mapToggle)
    {
        $( "#toggle-map" ).removeClass('on');
        $("#features").removeClass('disabled');
    } else {
        $( "#toggle-map" ).addClass('on');
        $("#features").addClass('disabled');
    }
    mapToggle = !mapToggle;
  });

// Check if mobile device
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

switchHE();

$( ".lang-he" ).on( "click", function() {
    switchHE();
});

$( ".lang-en" ).on( "click", function() {
    switchEN();
});

$( ".lang-ar" ).on( "click", function() {
    switchAR();
});

function switchEN() {
    $( ".translateable" ).each(function( index ) {
        if ( $( this ).hasClass( "translateable-ar" )) {
            $( this ).addClass('inactiveLang');
           }
           if ( $( this ).hasClass( "translateable-he" )) {
            $( this ).addClass('inactiveLang');
           }
           if ( $( this ).hasClass( "translateable-en" )) {
            $( this ).removeClass('inactiveLang');
           }
      });
};

function switchHE() {
    $( ".translateable" ).each(function( index ) {
        if ( $( this ).hasClass( "translateable-ar" )) {
            $( this ).addClass('inactiveLang');
           }
           if ( $( this ).hasClass( "translateable-he" )) {
            $( this ).removeClass('inactiveLang');
           }
           if ( $( this ).hasClass( "translateable-en" )) {
            $( this ).addClass('inactiveLang');
           }
      });
};

function switchAR() {
    $( ".translateable" ).each(function( index ) {
        if ( $( this ).hasClass( "translateable-ar" )) {
            $( this ).removeClass('inactiveLang');
           }
           if ( $( this ).hasClass( "translateable-he" )) {
            $( this ).addClass('inactiveLang');
           }
           if ( $( this ).hasClass( "translateable-en" )) {
            $( this ).addClass('inactiveLang');
           }
      });
};



