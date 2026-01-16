import { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export function GeoChurnHeatmap({ data = {} }) {
  const chartRef = useRef(null);

  const gChurn = data?.ChurnersGermany ?? data?.churnersGermany ?? 0;
  const sChurn = data?.ChurnersSpain ?? data?.churnersSpain ?? 0;
  const fChurn = data?.ChurnersFrance ?? data?.churnersFrance ?? 0;

  useEffect(() => {
    if (!chartRef.current) return;

    // --- ROOT ---
    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    // --- MAP CHART ---
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
        homeGeoPoint: { latitude: 48, longitude: 6 },
        homeZoomLevel: 4.5,
       wheelY: "zoom",      // ZOOM CON RUEDA DEL RATÓN
        pinchZoom: true,     // ZOOM TÁCTIL
        
      })
    );
    setTimeout(() => {
    if (!root.isDisposed()) {
      chart.zoomToGeoPoint({ latitude: 47, longitude: 5 }, 5, true);
    }
  }, 200);
    // --- ZOOM CONTROL ---
    // const zoomControl = chart.set(
    //   "zoomControl",
    //   am5map.ZoomControl.new(root, {
    //     centerX: am5.p100,
    //     x: am5.p100,
    //     paddingRight: 20
    //   })
    // );
    // zoomControl.homeButton.set("visible", true);

    // --- POLYGON SERIES (mapa de fondo) ---
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"]
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(0xecf0f1),
      stroke: am5.color(0xbdc3c7),
      interactive: true,
      // tooltipText: "{name}",
      cursorOverStyle: "pointer"
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0xd0d0d0)
    });

    // --- PUNTOS CON NUMERO ---
    const pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        calculateAggregates: true,
      })
    );
    pointSeries.bullets.push(function () {
      const container = am5.Container.new(root, {});

      // Círculo
      container.children.push(
        am5.Circle.new(root, {
          radius: 12,
          fill: am5.color(0xff8c00),
          stroke: am5.color(0xffffff),
          interactive: true,
          strokeWidth: 2,
          tooltipText: "{title}: {value}"
        })
      );

      // Número
      container.children.push(
        am5.Label.new(root, {
          text: "{value}",
          populateText: true,
          fontSize: 12,
          fontWeight: "bold",
          fill: am5.color(0xffffff),
          centerX: am5.p50,
          centerY: am5.p50,
          
        })
      );

      return am5.Bullet.new(root, { sprite: container });
    });

    const processedData = [
      { title: "Alemania", latitude: 51.52, longitude: 10.40, value: gChurn },
      { title: "España", latitude: 40.41, longitude: -3.70, value: sChurn },
      { title: "Francia", latitude: 46.85, longitude: 2.35, value: fChurn },
      { title: "Francia", latitude: 46.85, longitude: 2.35, value: fChurn }
    ].map((c) => ({
      title: c.title,
      value: c.value,
      geometry: { type: "Point", coordinates: [c.longitude, c.latitude] }
    }));

    pointSeries.data.setAll(processedData);

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [gChurn, sChurn, fChurn]);

  return (
    <div className="relative w-full h-full bg-white rounded-lg shadow-md p-4 overflow-hidden">
      <h3 className="text-lg font-semibold mb-2 relative z-10">
        Distribución de Fuga
      </h3>
      <div
        ref={chartRef}
        className="w-full h-125 pointer-events-auto"
        style={{ touchAction: "none" }}
      ></div>
    </div>
  );
}
