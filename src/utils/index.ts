export function isMobile(): boolean {
    return 'ontouchstart' in window || navigator.msMaxTouchPoints > 0
}
