export const hasClass = (element, className) => {
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}