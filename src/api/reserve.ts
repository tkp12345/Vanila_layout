const RESERVATION_URL = `https://frontend.tabling.co.kr/v1/store/9533/reservations`;

//예약정보 조회 함수
export const getReservation = async () => {
  try {
    const res = await fetch(RESERVATION_URL);
    if (res.ok) return res.json();

    throw new Error(`[${res?.status}] : ${res.statusText}`);
  } catch (err) {
    console.error(`GET RESERVATION ERROR: ${err}`);
  }
};
