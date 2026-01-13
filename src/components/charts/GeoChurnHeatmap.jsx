import { useEffect, useRef } from "react";

export function GeoChurnHeatmap({ data = {} }) {
  const chartRef = useRef(null);
  const { ChurnersGermany = 0, ChurnersSpain = 0, ChurnersFrance = 0 } = data;

  useEffect(() => {
    // Cargar scripts de amCharts dinámicamente
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initChart = async () => {
      try {
        await loadScript("https://cdn.amcharts.com/lib/5/index.js");
        await loadScript("https://cdn.amcharts.com/lib/5/map.js");
        await loadScript("https://cdn.amcharts.com/lib/5/geodata/worldLow.js");
        await loadScript("https://cdn.amcharts.com/lib/5/themes/Animated.js");

        if (!window.am5) return;

        const am5 = window.am5;
        const am5map = window.am5map;
        const am5themes_Animated = window.am5themes_Animated;
        const am5geodata_worldLow = window.am5geodata_worldLow;

        // Crear root
        const root = am5.Root.new(chartRef.current);
        root.setThemes([am5themes_Animated.new(root)]);

        // Crear mapa
        const chart = root.container.children.push(
          am5map.MapChart.new(root, {
            panX: "rotateX",
            panY: "translateY",
            projection: am5map.geoMercator(),
          })
        );

        const zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
        zoomControl.homeButton.set("visible", true);

        // Series de polígonos (países)
        const polygonSeries = chart.series.push(
          am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_worldLow,
            exclude: ["AQ"],
          })
        );

        polygonSeries.mapPolygons.template.setAll({
          fill: am5.color(0xdadada),
        });

        // Series de puntos (clustered)
        const pointSeries = chart.series.push(am5map.ClusteredPointSeries.new(root, {}));

        // Bullet clustered
        pointSeries.set("clusteredBullet", function (root) {
          const container = am5.Container.new(root, { cursorOverStyle: "pointer" });

          container.children.push(
            am5.Circle.new(root, { radius: 8, tooltipY: 0, fill: am5.color(0xff8c00) })
          );
          container.children.push(
            am5.Circle.new(root, { radius: 12, fillOpacity: 0.3, tooltipY: 0, fill: am5.color(0xff8c00) })
          );
          container.children.push(
            am5.Circle.new(root, { radius: 16, fillOpacity: 0.3, tooltipY: 0, fill: am5.color(0xff8c00) })
          );

          container.children.push(
            am5.Label.new(root, {
              centerX: am5.p50,
              centerY: am5.p50,
              fill: am5.color(0xffffff),
              populateText: true,
              fontSize: "8",
              text: "{value}",
            })
          );

          container.events.on("click", function (e) {
            pointSeries.zoomToCluster(e.target.dataItem);
          });

          return am5.Bullet.new(root, { sprite: container });
        });

        // Bullets regulares
        pointSeries.bullets.push(function () {
          const circle = am5.Circle.new(root, {
            radius: 6,
            tooltipY: 0,
            fill: am5.color(0xff8c00),
            tooltipText: "{title}: {value} churners",
          });
          return am5.Bullet.new(root, { sprite: circle });
        });

        // Datos mockeados - Ciudades europeas con valores de churn
        const cities = [
          { title: "Berlin", latitude: 52.5235, longitude: 13.4115, value: ChurnersGermany },
          { title: "Madrid", latitude: 40.4167, longitude: -3.7033, value: ChurnersSpain },
          { title: "Paris", latitude: 48.8567, longitude: 2.351, value: ChurnersFrance },
          { title: "Vienna", latitude: 48.2092, longitude: 16.3728, value: Math.floor(Math.random() * 200) },
          { title: "Rome", latitude: 41.8955, longitude: 12.4823, value: Math.floor(Math.random() * 200) },
          { title: "Brussels", latitude: 50.8371, longitude: 4.3676, value: Math.floor(Math.random() * 200) },
          { title: "Amsterdam", latitude: 52.3738, longitude: 4.891, value: Math.floor(Math.random() * 200) },
          { title: "Lisbon", latitude: 38.7072, longitude: -9.1355, value: Math.floor(Math.random() * 200) },
          { title: "Prague", latitude: 50.0878, longitude: 14.4205, value: Math.floor(Math.random() * 200) },
          { title: "Copenhagen", latitude: 55.6763, longitude: 12.5681, value: Math.floor(Math.random() * 200) },
          { title: "Stockholm", latitude: 59.3328, longitude: 18.0645, value: Math.floor(Math.random() * 200) },
          { title: "Oslo", latitude: 59.9138, longitude: 10.7387, value: Math.floor(Math.random() * 200) },
          { title: "Warsaw", latitude: 52.2297, longitude: 21.0122, value: Math.floor(Math.random() * 200) },
          { title: "Budapest", latitude: 47.4984, longitude: 19.0408, value: Math.floor(Math.random() * 200) },
          { title: "Athens", latitude: 37.9792, longitude: 23.7166, value: Math.floor(Math.random() * 200) },
        ];

        cities.forEach((city) => {
          pointSeries.data.push({
            geometry: { type: "Point", coordinates: [city.longitude, city.latitude] },
            title: city.title,
            value: city.value,
          });
        });

        chart.appear(1000, 100);

        // Cleanup
        return () => {
          root.dispose();
        };
      } catch (error) {
        console.error("Error loading amCharts:", error);
      }
    };

    initChart();
  }, [ChurnersGermany, ChurnersSpain, ChurnersFrance]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Mapa de Calor de Churn</h3>
      <div ref={chartRef} className="w-full h-96"></div>
    </div>
  );
}
