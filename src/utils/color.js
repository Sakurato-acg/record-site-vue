export const randomColor = () => {
  const list = [
    '#CCFF99',
    '#99CCFF',
    '99CCCC',
    '#CCFFCC',
    '#66CCCC',
    '#CCCCFF',
    '#FFFFCC',
    '#CCFFFF',
    '#66CCFF',
    '#6699CC',
    '#6699CC'
  ]
  return list[parseInt(Math.random() * list.length)]
}
