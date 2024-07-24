const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("ref");
var targetRef = myParam;

var textControl;
var featurearray = [];
var map;
var autoZoom = true;

function onEachFeatureClosure(refdata) {
  return function onEachFeature(feature, layer) {
    if (refdata.Type != "KC3CP") {
      var areaok = true;

      var p = geoLookup[refdata.Type].areaPropName;
      // console.log(p);
      if (p) {
        var a = feature.properties[p];
        // console.log(a);
        if (a < 100) {
          areaok = false;
        }
      }
      if (true) {
        layer.bindTooltip(refdata.Ref + " " + refdata.Title, {
          permanent: false,
          direction: "auto",
          // className: "blah",
        });
      }
    }
    dataToPush = {
      POTAData: refdata,
      layer: layer,
      turflayer: feature,
    };

    featurearray.push(dataToPush);
  };
}

function dispRef(ref) {
  var value, foundvalue;
  value = RefLookup[ref];
  if (value && value.ID != "" && value.Type != "") {
    foundvalue = value;
    var URL =
      geoLookup[foundvalue.Type].URL +
      (foundvalue.ID == "" ? "" : foundvalue.ID + "%27");

    $.getJSON(URL, function (data) {
      // console.log(data);
      var l = L.geoJSON(data, {
        style: { color: geoLookup[foundvalue.Type].color },
        onEachFeature: onEachFeatureClosure(RefLookup[ref]),
      }).addTo(lg);

      if (autoZoom) {
        map.fitBounds(l.getBounds());
      }
      var POTAURL = "https://api.pota.app/park/" + ref;

      $.getJSON(POTAURL, function (potadata) {
        $(".searchbox").val(ref);
      });
    });
  }
}
function mouseClick(e) {
  var boxText = "";
  var gothits = 0;
  var turfpoint = turf.point([e.latlng.lng, e.latlng.lat]);
  featurearray.forEach(function (f) {
    var hit;
    //console.log(f);
    if (f.turflayer.geometry.type == "LineString") {
      var d = turf.pointToLineDistance(turfpoint, f.turflayer, {
        units: "feet",
      });

      hit = d < 100;
    } else if (f.turflayer.geometry.type == "MultiLineString") {
      console.log(f.turflayer);
      var d = 101;
      turf.flattenReduce(f.turflayer, function (prev, feat, index) {
        console.log(feat);
        var d1 = turf.pointToLineDistance(turfpoint, feat, {
          units: "feet",
        });
        console.log(d1, " ", d);
        d = Math.min(d1, d);
        return feat;
      });
      console.log(d);
      hit = d < 100;
    }
    // Polygon
    else {
      hit = turf.booleanWithin(turfpoint, f.turflayer);
    }
    if (hit) {
      boxText +=
        f.POTAData.Ref + " - " + RefLookup[f.POTAData.Ref].Title + "<br>";
      gothits++;
    }
  });

  L.popup()
    .setLatLng(e.latlng)
    .openOn(map)
    .setContent(gothits > 0 ? boxText : "None");
}

function clearFeatures() {
  lg.clearLayers();
  lgpota.clearLayers();
  featurearray = [];
  $(".searchbox").val("");
}
var lg = L.layerGroup();
var lgpota = L.layerGroup();

$(document).ready(function () {
  // Initialise the Leaflet map
  map = L.map("map").setView([52.195346022693265, -2.2239665315347334], 6);

  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  lg.addTo(map);
  lgpota.addTo(map);

  buttonControl = L.control();
  buttonControl.onAdd = function (map) {
    var div = L.DomUtil.create("div", "leaflet-control");
    div.innerHTML += '<button class="clearbutton">Clear</button />';
    return div;
  };
  map.addControl(buttonControl);

  buttonControl1 = L.control();
  buttonControl1.onAdd = function (map) {
    var div = L.DomUtil.create("div", "leaflet-control");
    div.innerHTML += '<button class="allbutton">All</button />';
    return div;
  };
  map.addControl(buttonControl1);

  textControl = L.control();

  textControl.onAdd = function (map) {
    var div = L.DomUtil.create("div", "leaflet-control");
    div.innerHTML += '<input type="textbox" class="searchbox" />';

    return div;
  };

  map.addControl(textControl);

  $(".allbutton").on("click", function (e) {
    for (const [key, value] of Object.entries(RefLookup)) {
      autoZoom = false;
      console.log(key);
      dispRef(key);
    }
  });

  $(".clearbutton").on("click", function (e) {
    clearFeatures();

    e.stopPropagation();
  });

  map.on("click", mouseClick);

  $(".searchbox").on("click dblclick", function (e) {
    e.stopPropagation();
  });

  $(".searchbox").on("keydown", function search(e) {
    if (e.keyCode == 13) {
      dispRef($(this).val().toUpperCase());
    }
  });

  map
    .locate({
      setView: false,
      watch: true,
    }) /* This will return map so you can do chaining */
    .on("locationfound", function (e) {
      var marker = L.marker([e.latitude, e.longitude]).bindPopup(
        "Your are here :)",
      );
      var circle = L.circle([e.latitude, e.longitude], e.accuracy / 2, {
        weight: 1,
        color: "blue",
        fillColor: "#cacaca",
        fillOpacity: 0.2,
      });
      map.addLayer(marker);
      map.addLayer(circle);
    })
    .on("locationerror", function (e) {
      console.log(e);
      alert("Location access denied.");
    });

  // dispRef("GB-0711");
  //Object.keys(RefLookup).forEach(function (ref) {
  //  autoZoom = false;
  //  dispRef(ref);
  // });
});
