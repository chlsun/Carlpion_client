import { useEffect } from "react";

const { kakao } = window;

const ParkingMap = ({ parkingInfo }) => {
   useEffect(() => {
      const container = document.getElementById("map");
      const options = {
         center: new kakao.maps.LatLng(parkingInfo.lat, parkingInfo.lot),
         level: 1,
      };
      const map = new kakao.maps.Map(container, options);

      var position = new kakao.maps.LatLng(parkingInfo.lat, parkingInfo.lot);

      var marker = new kakao.maps.Marker({
         position: position,
         clickable: true,
      });

      marker.setMap(map);
   }, [parkingInfo]);

   return (
      <>
         <div id="map"></div>
      </>
   );
};

export default ParkingMap;
