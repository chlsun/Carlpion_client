import React, { useEffect, useState } from "react";
import * as styles from "./Map.styles";

const zcodeMap = {
  11: "서울특별시",
  26: "부산광역시",
  27: "대구광역시",
  28: "인천광역시",
  29: "광주광역시",
  30: "대전광역시",
  31: "울산광역시",
  36: "세종특별자치시",
  41: "경기도",
  42: "강원도",
  43: "충청북도",
  44: "충청남도",
  45: "전라북도",
  46: "전라남도",
  47: "경상북도",
  48: "경상남도",
  50: "제주특별자치도",
};

const Map = () => {
  const [map, setMap] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(5);
  const [infoWindow, setInfoWindow] = useState(null);
  const [stations, setStations] = useState([]);
  const [selectedZCode, setSelectedZCode] = useState("ALL");
  const [renderedMarkers, setRenderedMarkers] = useState([]);
  const [myPosition, setMyPosition] = useState(null);
  const [nearbyMode, setNearbyMode] = useState(false);

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setMyPosition({ lat, lng });
        setNearbyMode(true);
      });
    } else {
      alert("브라우저에서 위치 정보를 지원하지 않습니다.");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=361d11eeebfc10bc75aef84ccc1dd06b&autoload=false"; // 클러스터러 라이브러리 제외
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울시 좌표
          level: 5,
        };
        const createdMap = new window.kakao.maps.Map(container, options);
        setMap(createdMap);

        setInfoWindow(new window.kakao.maps.InfoWindow({ zIndex: 1 }));
      });
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await fetch(
          `https://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=kIvnwFRd3GPweqdM6X80qykhOXtjmwucvruNkSZS4w%2FT7F31GxppqkuvWz8RsVZECLuvHtQZQoi7df0XM2hDIw%3D%3D&numOfRows=9999&pageNo=1&dataType=JSON`
        );
        const json = await res.json();
        const items = json.items?.item || [];
        setStations(items);
      } catch (err) {
        console.error("충전소 API 오류", err);
        setStations([]);
      }
    };
    fetchStations();
  }, []);

  useEffect(() => {
    if (!map || !infoWindow) return;

    renderedMarkers.forEach((m) => m.setMap(null)); // 기존 마커 제거

    let filteredStations;
    if (nearbyMode && myPosition) {
      const radius = 3000;
      const toLatLng = (lat, lng) => new window.kakao.maps.LatLng(lat, lng);
      const getDistance = (a, b) => {
        const dx = a.La - b.La;
        const dy = a.Ma - b.Ma;
        return Math.sqrt(dx * dx + dy * dy) * 111000;
      };

      const myLatLng = toLatLng(myPosition.lat, myPosition.lng);
      filteredStations = stations.filter((station) => {
        const stationLatLng = toLatLng(
          parseFloat(station.lat),
          parseFloat(station.lng)
        );
        return getDistance(myLatLng, stationLatLng) <= radius;
      });

      const myMarker = new window.kakao.maps.Marker({
        position: myLatLng,
        title: "내 위치",
      });

      myMarker.setMap(map); // 내 위치 마커 추가

      map.setCenter(myLatLng);
      map.setLevel(5);
      setZoomLevel(5);
    } else {
      filteredStations =
        selectedZCode === "ALL"
          ? stations
          : stations.filter((s) => s.zcode === selectedZCode);
    }

    const newMarkers = filteredStations.map((station) => {
      const position = new window.kakao.maps.LatLng(
        parseFloat(station.lat),
        parseFloat(station.lng)
      );
      const marker = new window.kakao.maps.Marker({
        position,
        title: station.statNm,
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        const content = `
  <div style="padding:15px; font-size:16px; line-height:1.8; max-height:260px; overflow-y:auto; word-break:keep-all;">
    <div style="font-weight:bold; margin-bottom:8px;">
      ${station.statNm}
    </div>
    <div>📍 <strong>주소</strong><br/>${station.addr}</div>
    <div>⏰ <strong>이용시간</strong><br/>${
      station.useTime || "정보 없음"
    }</div>
    <div>☎️ <strong>연락처</strong><br/>${station.busiCall || "없음"}</div>
    <div>⚡ <strong>충전기</strong><br/>${station.powerType || "기본"}</div>
    ${
      station.note
        ? `<div>ℹ️ <strong>안내</strong><br/>${station.note}</div>`
        : ""
    }
  </div>
`;
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
        map.setCenter(position);
        map.setLevel(3);
        setZoomLevel(3);
      });

      marker.setMap(map); // 지도에 마커 추가

      return marker;
    });

    setRenderedMarkers(newMarkers);

    if (!nearbyMode && filteredStations.length > 0) {
      const center =
        selectedZCode === "ALL"
          ? new window.kakao.maps.LatLng(36.5, 127.5)
          : new window.kakao.maps.LatLng(
              parseFloat(filteredStations[0].lat),
              parseFloat(filteredStations[0].lng)
            );
      const level = selectedZCode === "ALL" ? 13 : 5;
      map.setCenter(center);
      map.setLevel(level);
      setZoomLevel(level);
    }
  }, [stations, selectedZCode, map, infoWindow, myPosition, nearbyMode]);

  useEffect(() => {
    if (!map || !infoWindow) return;

    const closeInfo = () => infoWindow.close();

    window.kakao.maps.event.addListener(map, "click", closeInfo);
    window.kakao.maps.event.addListener(map, "dragstart", closeInfo);
    window.kakao.maps.event.addListener(map, "zoom_changed", () => {
      setZoomLevel(map.getLevel());
    });

    return () => {
      window.kakao.maps.event.removeListener(map, "click", closeInfo);
      window.kakao.maps.event.removeListener(map, "dragstart", closeInfo);
    };
  }, [map, infoWindow]);

  const zoomIn = () => {
    const level = Math.max(1, zoomLevel - 1);
    map.setLevel(level);
    setZoomLevel(level);
  };

  const zoomOut = () => {
    const level = Math.min(12, zoomLevel + 1);
    map.setLevel(level);
    setZoomLevel(level);
  };

  return (
    <div style={styles.container}>
      <h2>🔌 전기차 충전소 지도</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "12px",
        }}
      >
        <button
          style={{
            ...styles.regionButton,
            ...(selectedZCode === "ALL" && !nearbyMode
              ? styles.activeRegion
              : {}),
          }}
          onClick={() => {
            setSelectedZCode("ALL");
            setNearbyMode(false);
          }}
        >
          전체
        </button>
        <button
          style={{
            ...styles.regionButton,
            ...(nearbyMode ? styles.activeRegion : {}),
          }}
          onClick={handleMyLocation}
        >
          내 주변 3km
        </button>
        {Object.entries(zcodeMap).map(([code, name]) => (
          <button
            key={code}
            onClick={() => {
              setSelectedZCode(code);
              setNearbyMode(false);
            }}
            style={{
              ...styles.regionButton,
              ...(selectedZCode === code && !nearbyMode
                ? styles.activeRegion
                : {}),
            }}
          >
            {name}
          </button>
        ))}
      </div>

      <div style={styles.mapBox}>
        <div id="map" style={styles.mapStyle}></div>

        <div style={styles.zoomControl}>
          <button onClick={zoomIn} style={styles.zoomButton}>
            ＋
          </button>
          <input
            type="range"
            min="1"
            max="12"
            value={13 - zoomLevel}
            onChange={(e) => {
              const newLevel = 13 - parseInt(e.target.value);
              map.setLevel(newLevel);
              setZoomLevel(newLevel);
            }}
            style={styles.zoomSlider}
          />
          <button onClick={zoomOut} style={styles.zoomButton}>
            －
          </button>
          <span style={styles.zoomLevelText}>Lv {zoomLevel}</span>
        </div>
      </div>
    </div>
  );
};

export default Map;
