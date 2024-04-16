export const formatDateTime = (
  date: string,
  type: string,
  yearOption?: 'numeric'
): string => {
  if (type === 'time') {
    const tIndex = date.indexOf('T')
    return date.slice(tIndex + 1, tIndex + 6)
  } else if (type === 'date') {
    if (yearOption) {
      return new Date(date).toLocaleDateString('ru-RU', {
        month: 'long',
        day: 'numeric',
        year: yearOption
      })
    }
    return new Date(date).toLocaleDateString('ru-RU', {
      month: 'long',
      day: 'numeric'
    })
  }

  return ''
}

export const getWeekDay = (date: string): string => {
  const weekDays = [
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
    'воскресенье'
  ]
  const day = new Date(date).getDay() - 1
  return weekDays.filter((_, index) => index === day)[0]
}
