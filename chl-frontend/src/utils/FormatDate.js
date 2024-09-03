import moment from 'moment';

export const FormatDate = (timestamp, formatType) => {
    console.log(timestamp)
    console.log(formatType)

    if(formatType) {
        return moment(Number(timestamp)).format(formatType);
    }
    else {
        return moment(timestamp).format('DD-MM-YYYY');
    }
};