//timeForm => 2020/11/11 01:02:22
export const timeDataFilter = (time: string) => {
  if (!time) return '';
  const hour = String(new Date(time).getHours()).padStart(2, '0');
  const minutes = String(new Date(time).getMinutes()).padStart(2, '0');

  return `${hour}:${minutes}`;
};

export const fullTimeDataFilter = (time: string) => {
  if (!time) return '';
  const year = String(new Date(time).getFullYear() + 1).padStart(2, '0');
  const month = String(new Date(time).getMonth() + 1).padStart(2, '0');
  const day = String(new Date(time).getDate()).padStart(2, '0');
  const hour = String(new Date(time).getHours()).padStart(2, '0');
  const minutes = String(new Date(time).getMinutes()).padStart(2, '0');

  return `${year}/${month}/${day} ${hour}:${minutes}`;
};

export const statusDataFilter = (status: string) => {
  switch (status) {
    case 'seated':
      return '착석 중';
    case 'reserved':
      return '예약';
    default:
      return '';
  }
};

export const btnStatusDataFilter = (status: string) => {
  switch (status) {
    case 'seated':
      return '퇴석';
    case 'reserved':
      return '착석';
    case 'done':
      return '';
    default:
      return '';
  }
};
