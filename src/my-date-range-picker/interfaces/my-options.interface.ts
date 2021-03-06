import { IMyDayLabels } from "./my-day-labels.interface";
import { IMyMonthLabels } from "./my-month-labels.interface";
import { IMyDate } from "./my-date.interface";

export interface IMyOptions {
    dayLabels?: IMyDayLabels;
    monthLabels?: IMyMonthLabels;
    dateFormat?: string;
    showClearBtn?: boolean;
    clearBtnTxt?: string;
    beginDateBtnTxt?: string;
    endDateBtnTxt?: string;
    acceptBtnTxt?: string;
    showSelectDateText?: boolean;
    selectBeginDateTxt?: string;
    selectEndDateTxt?: string;
    firstDayOfWeek?: string;
    sunHighlight?: boolean;
    markCurrentDay?: boolean;
    height?: string;
    width?: string;
    inline: boolean;
    showClearDateRangeBtn?: boolean;
    selectionTxtFontSize?: string;
    alignSelectorRight?: boolean;
    indicateInvalidDateRange?: boolean;
    showDateRangeFormatPlaceholder?: boolean;
    customPlaceholderTxt?: string;
    editableDateRangeField?: boolean;
    editableMonthAndYear?: boolean;
    minYear?: number;
    maxYear?: number;
    disableUntil?: IMyDate;
    disableSince?: IMyDate;
    componentDisabled?: boolean;
    inputValueRequired?: boolean;
    showSelectorArrow?: boolean;
}
