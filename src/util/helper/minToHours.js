export const timeTransform = (minutes, obj) => {
    const hours = Math.floor(minutes/60);
    let restMinutes = minutes % 60;
    restMinutes = restMinutes < 10 ? `0${restMinutes}` : restMinutes;
    return `${hours}${obj.hour} ${restMinutes}${obj.minute}`;
}