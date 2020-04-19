const height = window.innerHeight;
const width = window.innerWidth;

export function getDimensionFullStyle() {
    return 'height:' + (0.76 * height) + 'px;width: ' + width * 0.9 + 'px';
}

export function getDimensionHalfStyle() {
    return 'height:' + (0.38 * height) + 'px;width: ' + width * 0.9 + 'px';
}

export function getDimensionQuarterStyle() {
    return 'height:' + (0.32 * height) + 'px;width: ' + 0.45 * width + 'px';

}

