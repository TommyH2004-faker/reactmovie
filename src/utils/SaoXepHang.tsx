// @ts-ignore
import { StarFill } from 'react-bootstrap-icons';
import React from 'react';
const renderRating = (rating: number | undefined) => {
    let result = [];
    for(let i =  1 ; i<=5;i++){
        if (i <= (rating ?? 0)) {
            result.push(<StarFill key={i} className="text-warning" />);
        } else {
            result.push(<StarFill key={i} className="text-secondary" />);
        }

    }
    return result;
}
export default renderRating;