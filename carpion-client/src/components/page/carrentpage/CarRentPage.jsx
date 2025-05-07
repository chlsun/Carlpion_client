import Select from "react-select";
import "./CarRentPage.css";
import CarRentMap from "../../include/map/carRentMap/CarRentMap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CarRentPage = () => {
  const navi = useNavigate();

  const [rentalDates, setRentalDates] = useState(null);
  const [returnDates, setReturnDates] = useState(null);
  const [searchAddr, setSearchAddr] = useState(null);

  const [rentalDate, setRentalDate] = useState(null);
  const [rentalHour, setRentalHour] = useState(null);

  const [returnDate, setReturnDate] = useState(null);
  const [returnHour, setReturnHour] = useState(null);

  const [returnHourOption, setReturnHourOption] = useState(null);

  const [rentalDateYMDH, setRentalDateYMDH] = useState(null);
  const [returnDateYMDH, setReturnDateYMDH] = useState(null);

  const [isRentalDateDisabled, setIsRentalDateDisabled] = useState(true);
  const [isDateDisabled, setIsDateDisabled] = useState(true);
  const [isHourDisabled, setIsHourDisabled] = useState(true);

  const [checked, setChecked] = useState(false);

  const [diffHour, setDiffHour] = useState(0);
  const [dateError, setDateError] = useState("");

  const [rentCarList, setRentCarList] = useState(null);

  const parkingAddr = [
    { value: "", label: "전체 지역" },
    { value: "강남구", label: "강남구" },
    { value: "강동구", label: "강동구" },
    { value: "강북구", label: "강북구" },
    { value: "강서구", label: "강서구" },
    { value: "관악구", label: "관악구" },
    { value: "광진구", label: "광진구" },
    { value: "구로구", label: "구로구" },
    { value: "금천구", label: "금천구" },
    { value: "노원구", label: "노원구" },
    { value: "도봉구", label: "도봉구" },
    { value: "동대문구", label: "동대문구" },
    { value: "동작구", label: "동작구" },
    { value: "마포구", label: "마포구" },
    { value: "서대문구", label: "서대문구" },
    { value: "서초구", label: "서초구" },
    { value: "성동구", label: "성동구" },
    { value: "성북구", label: "성북구" },
    { value: "송파구", label: "송파구" },
    { value: "양천구", label: "양천구" },
    { value: "영등포구", label: "영등포구" },
    { value: "용산구", label: "용산구" },
    { value: "은평구", label: "은평구" },
    { value: "종로구", label: "종로구" },
    { value: "중구", label: "중구" },
    { value: "중랑구", label: "중랑구" },
  ];

  const defaultRentalHourOption = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return { value: `${hour}:00:00`, label: `${hour}:00` };
  });

  const getRentalHour = (startHour) => {
    const paramHour = parseInt(startHour);

    return Array.from({ length: 24 - paramHour - 1 }, (_, i) => {
      const hour = (paramHour + i + 1).toString().padStart(2, "0");
      return { value: `${hour}:00:00`, label: `${hour}:00` };
    });
  };

  const getReturnHour = (startHour) => {
    if (startHour == -1) {
      const defaultHour = 0;

      return Array.from({ length: 24 }, (_, i) => {
        const hour = i.toString().padStart(2, "0");
        return { value: `${hour}:00:00`, label: `${hour}:00` };
      });
    }

    return Array.from({ length: 24 - startHour - 1 }, (_, i) => {
      const hour = (startHour + i + 1).toString().padStart(2, "0");
      return { value: `${hour}:00:00`, label: `${hour}:00` };
    });
  };

  useEffect(() => {
    setRentalDates(getNextTenDays(new Date()));
  }, []);

  useEffect(() => {
    setRentCarList(null);

    if (checked && searchAddr && rentalDateYMDH && returnDateYMDH) {
      axios
        .get("http://localhost/rents", {
          params: {
            rentalDate: rentalDateYMDH
              ? requestToStringByDate(rentalDateYMDH)
              : null,
            returnDate: returnDateYMDH
              ? requestToStringByDate(returnDateYMDH)
              : null,
            parkingAddr: searchAddr ? searchAddr.value : "no-search",
          },
        })
        .then((result) => {
          console.log(result);
          setRentCarList(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchAddr, rentalDateYMDH, returnDateYMDH]);

  const handleAddrSelectChange = (selectedOption) => {
    setSearchAddr(selectedOption);
  };

  const handleRentalDate = (selectedOption) => {
    setRentalDate(selectedOption);
  };
  const handleRentalHour = (selectedOption) => {
    setRentalHour(selectedOption);
  };
  const handleReturnDate = (selectedOption) => {
    setReturnDate(selectedOption);
  };
  const handleReturnHour = (selectedOption) => {
    setReturnHour(selectedOption);
  };

  useEffect(() => {
    if (rentalDate) {
      const date = new Date();
      const matchDate = toStringByDate2(date);

      if (matchDate == rentalDate.value) {
        const hour = String(date.getHours()).padStart(2, "0");
        setRentalHourOption(getRentalHour(hour));
      } else {
        setRentalHourOption(defaultRentalHourOption);
      }

      setIsRentalDateDisabled(false);
    }

    if (rentalDate && rentalHour) {
      setReturnDates(getNextTenDays(new Date(rentalDate.value)));
      setIsDateDisabled(false);
    }

    if (returnDate) {
      if (rentalDate.value == returnDate.value) {
        const hour = parseInt(rentalHour.value.slice(0, 2), 10);
        setReturnHourOption(getReturnHour(hour));
      } else {
        setReturnHourOption(getReturnHour(0));
        setReturnHourOption(getReturnHour(-1));
      }
      setIsHourDisabled(false);
    }

    if (rentalDate && returnDate && rentalHour && returnHour) {
      setRentalDateYMDH(getDateYMDH(rentalDate, rentalHour));
      setReturnDateYMDH(getDateYMDH(returnDate, returnHour));

      if (searchAddr) {
        setChecked(true);
      }
    }
  }, [rentalDate, returnDate, rentalHour, returnHour, searchAddr]);

  useEffect(() => {
    if (rentalDateYMDH && returnDateYMDH) {
      setDateError("");
      setDiffHour(0);
      const diffMSec = returnDateYMDH.getTime() - rentalDateYMDH.getTime();
      const diffHour = diffMSec / (60 * 60 * 1000);
      /*          if (!diffHour < 1 || !diffHour < 24 * 10) {
            setDiffHour(diffHour);
         } */

      if (diffHour < 1) {
        setDateError("대여 / 반납일을 다시 선택해주세요.");
        setChecked(false);
      } else if (diffHour >= 24 * 10) {
        setDateError("10일 이상 렌트가 불가능합니다.");
        setChecked(false);
      } else {
        if (searchAddr) {
          setChecked(true);
        }
        setDiffHour(diffHour);
      }
    }
  }, [rentalDateYMDH, returnDateYMDH]);

  const getNextTenDays = (currentDate) => {
    const dates = [];

    for (let i = 0; i < 10; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);

      const value = `${String(nextDate.getFullYear())}/${String(
        nextDate.getMonth() + 1
      ).padStart(2, "0")}/${String(nextDate.getDate()).padStart(2, "0")}`;
      const label = `${nextDate.getFullYear()}/${String(
        nextDate.getMonth() + 1
      ).padStart(2, "0")}/${String(nextDate.getDate()).padStart(2, "0")}`;

      dates.push({ value, label });
    }

    return dates;
  };

  const getDateYMDH = (date, hour) => {
    return new Date(date.value + " " + hour.value);
  };

  function toStringByDate(date) {
    const year = String(date.getFullYear()).substr(2, 4);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일 ${hour}시`;
  }

  function toStringByDate2(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  }
  function requestToStringByDate(date) {
    const year = String(date.getFullYear()).substr(2, 4);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");

    return `${year}/${month}/${day} ${hour}`;
  }

  const goToReservation = (carNo) => {
    navi(`/rent/${carNo}`, {
      state: {
        diffHour: diffHour,
        rentalDateYMDH: requestToStringByDate(rentalDateYMDH),
        returnDateYMDH: requestToStringByDate(returnDateYMDH),
      },
    });
  };

  return (
    <>
      <main id="car-rent-page">
        <section className="banner">
          <div className="map">
            {checked && rentCarList && rentCarList.length != 0 ? (
              <CarRentMap
                rentCarList={rentCarList}
                searchAddr={searchAddr}
                rentalDateYMDH={requestToStringByDate(rentalDateYMDH)}
                returnDateYMDH={requestToStringByDate(returnDateYMDH)}
              />
            ) : (
              <h2>
                {checked
                  ? "검색 정보가 없습니다."
                  : "원하는 대여일 반납일 지역 정보를 기입해주세요"}
              </h2>
            )}
          </div>

          <div className="select-container">
            <div className="rental-date">
              <h3 className="title">대여</h3>
              <div className="select-box">
                <Select
                  options={rentalDates}
                  placeholder="대여일"
                  onChange={handleRentalDate}
                  value={rentalDate}
                  className="rental-yymmdd"
                />
                <Select
                  options={rentalHourOption}
                  placeholder="대여시간"
                  onChange={handleRentalHour}
                  value={rentalHour}
                  isDisabled={isRentalDateDisabled}
                  className="rental-hour"
                />
              </div>
            </div>
            <div className="return-date">
              <h3 className="title">반납</h3>
              <div className="select-box">
                <Select
                  options={returnDates}
                  placeholder="반납일"
                  onChange={handleReturnDate}
                  value={returnDate}
                  isDisabled={isDateDisabled}
                  className="rental-yymmdd"
                />
                <Select
                  options={returnHourOption}
                  placeholder="반납시간"
                  onChange={handleReturnHour}
                  value={returnHour}
                  isDisabled={isHourDisabled}
                  className="rental-hour"
                />
              </div>
            </div>
            <div className="addr">
              <h3 className="title">지역</h3>
              <div className="select-box">
                <Select
                  options={parkingAddr}
                  placeholder="지역"
                  className="rental-yymmdd"
                  onChange={handleAddrSelectChange}
                />
              </div>
            </div>
          </div>

          {diffHour != 0 && rentCarList && rentCarList.length != 0 ? (
            <div className="dateMessage-box">
              <h3 className="dateMessage between">
                <b>{toStringByDate(rentalDateYMDH)}</b> ~{" "}
                <b>{toStringByDate(returnDateYMDH)}</b>
              </h3>
              <h3 className="dateMessage">
                총 <b>{diffHour}</b>시간
              </h3>
            </div>
          ) : (
            <h3 className="dateMessage error">{dateError}</h3>
          )}
        </section>

        {checked && rentCarList && rentCarList.length != 0 ? (
          <section className="car-list">
            {rentCarList.map((rentCar) => (
              <div
                key={rentCar.carNo}
                className={`rent-car ${rentCar.reservationRental && "active"}`}
              >
                <div className="car-info">
                  <div className="car-img">
                    <img src={rentCar.carModel.imgURL} alt="" />
                  </div>
                  <div className="info">
                    <p className="car-model">
                      {rentCar.carModel.carModel} / {rentCar.carModel.seatCount}
                      인승
                    </p>
                    <p className="rent-price">{rentCar.carModel.rentPrice}원</p>
                    <p className="hour-price">
                      {rentCar.carModel.hourPrice}원/h
                    </p>
                    <p className="total-price">
                      예상 가격 :{" "}
                      {rentCar.carModel.rentPrice +
                        rentCar.carModel.hourPrice * diffHour}
                      원
                    </p>
                  </div>
                </div>
                <p className="parking-name">{rentCar.parking.parkingTitle}</p>
                <p className="parking-addr">{rentCar.parking.parkingAddr}</p>
                <button
                  className="rent-btn"
                  onClick={() => goToReservation(rentCar.carNo)}
                >
                  예약하기
                </button>
                <div className="no-rent">
                  <div className="txt">예약불가</div>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <div className="no-search-box"></div>
        )}
      </main>
    </>
  );
};

export default CarRentPage;
