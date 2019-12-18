import bigDecimal from "js-big-decimal";

// 截取字符串小数位数
export const subStringNum = (a, num) => {
    num = num || 8;
    const a_type = typeof a;
    const num_type = typeof num;
    var aStr;
    if (num_type !== "number") {
        num = Number(num);
    }
    if (a_type === "number") {
        aStr = a.toString();
        var aArr = aStr.split(".");
    } else if (a_type === "string") {
        aStr = a;
        var aArr = a.split(".");
    }
    if (aArr.length > 1) {
        a = aArr[0] + "." + aArr[1].substr(0, num);
    }
    let strVal = a.toString();
    let searchVal = strVal.indexOf(".");
    if (searchVal < 0) {
        searchVal = strVal.length;
        strVal += ".";
    }
    while (strVal.length <= searchVal + num) {
        strVal += "0";
    }
    return strVal == 0 ? bigDecimal.round(0, num) : strVal;
};

//时间处理
export const  formatTime = (time, split) => {
    let date = new Date(time - 0);
    let s = split;
    if (!s) {
        s = '-'
    }
    let year = date.getFullYear(),
        month = date.getMonth() + 1, //月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    let newTime =
        year +
        s +
        (month < 10 ? "0" + month : month) +
        s +
        (day < 10 ? "0" + day : day) +
        " " +
        (hour < 10 ? "0" + hour : hour) +
        ":" +
        (min < 10 ? "0" + min : min) +
        ":" +
        (sec < 10 ? "0" + sec : sec);

    return newTime;
}
