import moment from 'moment';
import { MATCH_STATUS_COMPLETED, MATCH_STATUS_INPROGRESS, MATCH_STATUS_NEXT_COMING } from '../constants/generalApp';

export const getMatchStatus = (startDate, endDate) => {
    const now = moment();

    if (now.isBefore(moment(startDate))) {
        return MATCH_STATUS_NEXT_COMING;
    } else if (now.isBetween(moment(startDate), moment(endDate))) {
        return MATCH_STATUS_INPROGRESS;
    } else if (now.isAfter(moment(endDate))) {
        return MATCH_STATUS_COMPLETED;
    } else {
        return 'Unknown';
    }
};