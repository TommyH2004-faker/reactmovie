// // @ts-ignore
// import { StarFill } from 'react-bootstrap-icons';
// import React from 'react';
// const renderRating = (rating: number | undefined) => {
//     let result = [];
//     for(let i =  1 ; i<=5;i++){
//         if (i <= (rating ?? 0)) {
//             result.push(<StarFill key={i} className="text-warning" />);
//         } else {
//             result.push(<StarFill key={i} className="text-secondary" />);
//         }

//     }
//     return result;
// }
// export default renderRating;

// @ts-ignore
import { StarFill } from "react-bootstrap-icons";
import React from "react";

const renderRating = (
  rating: number | undefined,
  onRate?: (value: number) => void // 👈 thêm callback optional
) => {
  let result = [];
  for (let i = 1; i <= 5; i++) {
    result.push(
      <StarFill
        key={i}
        className={i <= (rating ?? 0) ? "text-warning" : "text-secondary"}
        style={{
          cursor: onRate ? "pointer" : "default",
          fontSize: "1.5rem",
          marginRight: "4px",
        }}
        onClick={() => onRate && onRate(i)} // 👈 click chọn sao
      />
    );
  }
  return result;
};

export default renderRating;

