import ReservationMap from "../../include/map/reservationMap/ReservationMap";
import "./RentalReservation.css";

const RentalReservation = () => {
   return (
      <>
         <main id="rental-reservation">
            <div className="map">
               <ReservationMap />
            </div>
         </main>
      </>
   );
};

export default RentalReservation;
