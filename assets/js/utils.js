export function calculateScrollProgress(currentScroll, maxScroll) {
  return Math.max(0, Math.min(1, currentScroll / maxScroll));
}
