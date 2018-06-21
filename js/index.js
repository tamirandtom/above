mapboxgl.accessToken = 'pk.eyJ1IjoidGFtaXJwIiwiYSI6ImNqNmtvcjBieTFtOGgzMm52NWQ1Nnc1NTkifQ.CxOvrXtNgryGkkgXkiShsQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-0.15591514, 51.51830379],
    zoom: 15.5,
    bearing: 27,
    pitch: 45
});
var chapters;
var activeChapterName;

$.getJSON("model/mapData.json", function (data) {
    console.log('loaded data!');
    chapters = data;
    activeChapterName = Object.keys(chapters)[0];
    console.log(activeChapterName);
    for (var k in chapters) {
        if (chapters.hasOwnProperty(k)) {
            //  alert("Key is " + k + ", value is" + chapters[k]);
            $("#features").append("<section id='" + k + "'><h3>" + k + "</h3><p>foo</p></section>");

        }
    }
});



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

function isElementOnScreen(id) {
    var element = document.getElementById(id);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}