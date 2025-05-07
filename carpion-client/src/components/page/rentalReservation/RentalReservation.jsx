import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReservationMap from "../../include/map/reservationMap/ReservationMap";
import "./RentalReservation.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { v4 as uuidv4 } from "uuid";

const RentalReservation = () => {
  const navi = useNavigate();
  const { id } = useParams("id");
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  const reservationDate = location.state;

  const [errorMsg, setErrorMsg] = useState("");
  const [rentCarInfo, setRentCarInfo] = useState(null);

  useEffect(() => {
    if (window.IMP) {
      window.IMP.init("imp26534526");
    }

    if (id) {
      axios
        .get(`http://localhost/rents/details/${id}`)
        .then((result) => {
          setRentCarInfo(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const handlePayment = async () => {
    console.log("하이?");

    if (!auth.accessToken) {
      alert("로그인 후 다시 시도해주세요");
      return;
    }

    if (rentCarInfo) {
      const merchantUid = `rent_${uuidv4()}`;

      try {
        const prepareRes = await axios.post(
          "http://localhost/rents/payment/prepare",
          {
            merchantUid: merchantUid,
            carNo: rentCarInfo[0].carNo,
            rentalDate: reservationDate.rentalDateYMDH,
            returnDate: reservationDate.returnDateYMDH,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );

        const totalPrice = prepareRes.data.totalPrice;

        IMP.request_pay(
          {
            pg: "tosspay.tosstest",
            pay_method: "card",
            merchant_uid: merchantUid,
            name: "차량 렌트 결제",
            amount: totalPrice,
          },
          async (rsp) => {
            try {
              if (rsp.success) {
                await axios.post(
                  "http://localhost/rents/payment/complate",
                  {
                    carNo: rentCarInfo[0].carNo,
                    rentalDate: reservationDate.rentalDateYMDH,
                    returnDate: reservationDate.returnDateYMDH,
                    totalPrice: totalPrice,
                    merchantUid: merchantUid,
                    impUID: rsp.imp_uid,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${auth.accessToken}`,
                    },
                  }
                );
                alert("결제 성공!");
                navi("/rent");
              } else {
                alert("결제 실패: " + rsp.error_msg);
              }
            } catch (error) {
              setErrorMsg(error.response.data);
            }
          }
        );
      } catch (error) {
        setErrorMsg(error.response.data);
      }
    }
  };

  useEffect(() => {
    if (errorMsg.length > 0) {
      alert(errorMsg);
      setErrorMsg("");
    }
  }, [errorMsg]);

  return (
    <>
      <main id="rental-reservation">
        <div className="map">
          <ReservationMap
            rentCarInfo={rentCarInfo}
            reservationDate={reservationDate}
            handlePayment={handlePayment}
          />
        </div>
      </main>
    </>
  );
};

export default RentalReservation;
