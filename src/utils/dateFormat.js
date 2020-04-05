/**
 * 为 月、时、分、秒 前补零
 *
 * @param {Number | String} value 月、时、分、秒 
 * @returns
 */
function fillZero(value) {
    value = (value < 10 ? "0" : "") + value;
    return value;
}

/**
 * 对时间戳进行格式化
 *
 * @param {Number} timestamp 时间戳，仅支持支持 10 位 与 13 位
 * @returns
 */
function format(timestamp) {
    let len = timestamp.toString().length;
    timestamp *= len === 10 ? 1000 : 1;
    let date = new Date(timestamp);
    let Y = date.getFullYear();
    let M = fillZero(date.getMonth() + 1);
    let D = fillZero(date.getDate());
    let h = fillZero(date.getHours());
    let m = fillZero(date.getMinutes());
    let s = fillZero(date.getSeconds());
    return `${Y}-${M}-${D} ${h}:${m}:${s}`;
}

export default format;