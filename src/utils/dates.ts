export const formatDateTime = (
  date: string,
  type: string,
  yearOption?: 'numeric'
): string => {
  const timezoneOffset = new Date(date).getTimezoneOffset() * 60000

  if (type === 'time') {
    const tIndex = date.indexOf('T')
    return date.slice(tIndex + 1, tIndex + 6)
  } else if (type === 'date') {
    if (yearOption) {
      return new Date(new Date(date).getTime() + timezoneOffset).toLocaleDateString('ru-RU', {
        month: 'long',
        day: 'numeric',
        year: yearOption
      })
    }

    return new Date(new Date(date).getTime() + timezoneOffset).toLocaleDateString('ru-RU', {
      month: 'long',
      day: 'numeric'
    })
  }

  return ''
}

export const getWeekDay = (date: string): string => {
  const weekDays = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота'
  ]
  const timezoneOffset = new Date(date).getTimezoneOffset() * 60000
  const day = new Date(new Date(date).getTime() + timezoneOffset).getDay()
  return weekDays.filter((_, index) => index === day)[0]
}
