function setUpCalender () {
    
    setWeekDays(); // calender header
    let calContentList = setCalContentList(); // calender content
    let r = 0;
    let flag = false;
    cal_content.empty();

    // let prevMonth = getNumberOfDays(year, month - 1);
    // let nextMonth = getNumberOfDays(year, month + 1);

    while (!flag) {
        if (weekdays[r] == calContentList[0].weekday) {
            flag = true;
        } else {
            cal_content.append('<div class="blank"></div>');    
            r++;
        } 
    }
    // for (let k = r; k > 0; k--) {
    //     let dayX = prevMonth - ( k ) + 1;
    //     cal_content.append('<div class="blank">'+ dayX +'</div>');    
    // }
    // let dX = 1;

    for (let i = 0; i < 42 - r; i++) {
        if (i >= calContentList.length) {
            cal_content.append('<div class="blank"></div>');
            // dX++;
        } else {
            let day = calContentList[i].day;
            let dayDiv = checkToday(new Date(year, month - 1, day)) ? '<div class="today">' : '<div>'; 
            cal_content.append(dayDiv + "" + day + "</div>");
        } 
    }
    
    // let monthColor = month_colors[month - 1];
    let monthColor = '#4e9fb7';
    cal_header.css("background-color", monthColor).find("h1").text(months[month-1] + " " + year);
    cal_weekdays.find("div").css("color", monthColor);
    cal_content.find(".today").css("background-color", monthColor);
    calDesign();
}

function setWeekDays () {
    cal_weekdays.empty();
    for (let i = 0; i < 7; i++) {
        cal_weekdays.append("<div>" + weekdays[i].substring(0,3) + "</div>");
    }
}

function setCalContentList () {
    const contentList = [];
    for (let i = 1; i < getNumberOfDays(year, month) + 1; i++) {
        contentList.push({day: i, weekday: weekdays[getWeekDayNumber(year, month, i)]});     
    }
    return contentList;
}

function calDesign () {
    let x;
    let calendar = $('#calendar').css("width", w + 'px');
    calendar.find(x="#calendar_weekdays, #calendar_content").css("width", w + 'px').find("div").css({width:w/7+"px",height:w/7+"px","line-height":w/7+"px"})
    // calendar.find("#calendar_header").css({height:w*(1/4)+"px"}).find('i[class^="icon-chevron"]').css("line-height",w*(1/7)+"px");
}

function getNumberOfDays (year, month) {
    var daysNo = new Date(year, month, 0).getDate();
    return daysNo;
}

function getWeekDayNumber (year, month, day) {
    var dayNo = new Date(year, month - 1, day).getDay();
    return dayNo;
}

function checkToday(date) {
    return dateFormat(new Date) == dateFormat(date); 
}

function dateFormat (date) {
    return date.getFullYear()+"/"+ ( date.getMonth() + 1) + "/" + date.getDate();
}

function updateDate () {
    var date = new Date;
    year = date.getFullYear();
    month = date.getMonth() + 1;
}

// var w = 480;
var w = 240;
var year = 2025;
var month = 8;
var day = [];

var months = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
var weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
// var month_colors = ["#16a085","#1abc9c","#c0392b","#27ae60","#FF6860","#f39c12","#f1c40f","#e67e22","#2ecc71","#e74c3c","#d35400","#2c3e50"];
var calender = $('#calendar');
var cal_header = calender.find('#calendar_header');
var cal_weekdays = calender.find('#calendar_weekdays');
var cal_content = calender.find('#calendar_content'); 

updateDate();
setUpCalender();

cal_header.find('a[class^="icon-chevron"]').on("click", function() {
    var e = $(this);
    var r = function (e) {
        month = e == 'next' ? month+1 : month-1;
        if(month < 1) {
            month = 12;
            year--;
        } else if (month > 12) { 
            month = 1;
            year++;
        }
        setUpCalender();
    };
    if(e.attr("class").indexOf("left")!=-1) { 
        r("previous");
    } else {
        r("next");
    }
});