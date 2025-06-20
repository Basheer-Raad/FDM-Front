<script type="ts" setup>
import { onUnmounted, onMounted, ref } from 'vue';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

const chartEle = ref(null)
const cities = [
    {
        id: "london",
        title: "London",
        geometry: { type: "Point", coordinates: [-0.1262, 51.5002] },
    },
    {
        id: "brussels",
        title: "Brussels",
        geometry: { type: "Point", coordinates: [4.3676, 50.8371] }
    }, {
        id: "prague",
        title: "Prague",
        geometry: { type: "Point", coordinates: [14.4205, 50.0878] }
    }, {
        id: "athens",
        title: "Athens",
        geometry: { type: "Point", coordinates: [23.7166, 37.9792] }
    }, {
        id: "reykjavik",
        title: "Reykjavik",
        geometry: { type: "Point", coordinates: [-21.8952, 64.1353] }
    }, {
        id: "dublin",
        title: "Dublin",
        geometry: { type: "Point", coordinates: [-6.2675, 53.3441] }
    }, {
        id: "oslo",
        title: "Oslo",
        geometry: { type: "Point", coordinates: [10.7387, 59.9138] }
    }, {
        id: "lisbon",
        title: "Lisbon",
        geometry: { type: "Point", coordinates: [-9.1355, 38.7072] }
    }, {
        id: "moscow",
        title: "Moscow",
        geometry: { type: "Point", coordinates: [37.6176, 55.7558] }
    }, {
        id: "belgrade",
        title: "Belgrade",
        geometry: { type: "Point", coordinates: [20.4781, 44.8048] }
    }, {
        id: "bratislava",
        title: "Bratislava",
        geometry: { type: "Point", coordinates: [17.1547, 48.2116] }
    }, {
        id: "ljublana",
        title: "Ljubljana",
        geometry: { type: "Point", coordinates: [14.5060, 46.0514] }
    }, {
        id: "madrid",
        title: "Madrid",
        geometry: { type: "Point", coordinates: [-3.7033, 40.4167] }
    }, {
        id: "stockholm",
        title: "Stockholm",
        geometry: { type: "Point", coordinates: [18.0645, 59.3328] }
    }, {
        id: "bern",
        title: "Bern",
        geometry: { type: "Point", coordinates: [7.4481, 46.9480] }
    }, {
        id: "kiev",
        title: "Kiev",
        geometry: { type: "Point", coordinates: [30.5367, 50.4422] }
    }, {
        id: "paris",
        title: "Paris",
        geometry: { type: "Point", coordinates: [2.3510, 48.8567] }
    }, {
        id: "new york",
        title: "New York",
        geometry: { type: "Point", coordinates: [-74, 40.43] }
    }];

onMounted(() => {
    if (typeof window !== "undefined") {
        loadMap()
    }
})

const loadMap = () => {
    const element = document.getElementById("mapLine");
    if (element) {
        let root = am5.Root.new("mapLine");

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let chart = root.container.children.push(am5map.MapChart.new(root, {
            panX: "translateX",
            panY: "translateY",
            projection: am5map.geoMercator()
        }));

        let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_worldLow
        }));

        let graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
        graticuleSeries.mapLines.template.setAll({
            stroke: root.interfaceColors.get("alternativeBackground"),
            strokeOpacity: 0.08
        });

        let lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));

        lineSeries.mapLines.template.setAll({
            stroke: root.interfaceColors.get("alternativeBackground"),
            strokeOpacity: 0.6
        });

        // destination series
        let citySeries = chart.series.push(
            am5map.MapPointSeries.new(root, {})
        );

        citySeries.bullets.push(function () {
            let circle = am5.Circle.new(root, {
                radius: 5,
                tooltipText: "{title}",
                tooltipY: 0,
                fill: am5.color(0xffba00),
                stroke: root.interfaceColors.get("background"),
                strokeWidth: 2
            });

            return am5.Bullet.new(root, {
                sprite: circle
            });
        });

        // arrow series
        let arrowSeries = chart.series.push(
            am5map.MapPointSeries.new(root, {})
        );

        citySeries.data.setAll(cities);

        // prepare line series data
        let destinations = ["reykjavik", "lisbon", "moscow", "belgrade", "ljublana", "madrid", "stockholm", "bern", "kiev", "new york"];
        // London coordinates
        let originLongitude = -0.1262;
        let originLatitude = 51.5002;

        am5.array.each(destinations, function (did) {
            let destinationDataItem = citySeries.getDataItemById(did);
            let lineDataItem = lineSeries.pushDataItem({ geometry: { type: "LineString", coordinates: [[originLongitude, originLatitude], [destinationDataItem.get("longitude"), destinationDataItem.get("latitude")]] } });

            arrowSeries.pushDataItem({
                lineDataItem: lineDataItem,
                positionOnLine: 0.5,
                autoRotate: true
            });
        })

        polygonSeries.events.on("datavalidated", function () {
            chart.zoomToGeoPoint({ longitude: -0.1262, latitude: 51.5002 }, 5);
        })

        chartEle.value = chart
    }
}

onUnmounted(() => {
    chartEle.value?.dispose();
})
</script>

<template>
  <div id="mapLine" style="height: 340px"></div>
</template>
