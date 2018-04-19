/**
* 获取考勤记录
*
* @author liukeyi <liukeyi@meituan.com>
* @created 2018/4/10
* @updated 2018/4/10
*/
const https = require('https')

const ssoid = 'a45dd04893*a4d1ba5cfd9786ea40789'
const month = (new Date('2018-04-01')).getTime()

const postData = {
  month
}
const cookie = `ssoid=${ssoid}`

let rawData = ''

const req = https.request({
  method: 'post',
  hostname: 'hr.sankuai.com',
  path: '/kaoqin/api/attendance/calendar',
  headers: {
    'content-type': 'application/json',
    'X-Request-With': 'XMLHttpRequest',
    'Cookie': cookie
  }
}, res => {
  res.setEncoding('utf8')
  res.on('data', (chunk) => {
    rawData += chunk
  })

  res.on('end', () => {
    const calendar = JSON.parse(rawData)

    if (calendar.data) {
      const data = calendar.data
      const realCount = data.month.realCount || 1
      console.log(realCount)
      const day = data.day
      let time = 0

      if (day instanceof Array) {
        day.forEach(dayData => {
          if (dayData.startTime && dayData.endTime && dayData.endTime > dayData.startTime) {
            time += Number(dayData.endTime - dayData.startTime)
          }
        })
      }

      const oneHour = 3600000 // 60 * 60 * 1000;

      console.log(time / (oneHour * Number(realCount)))
    }
  })
})

req.write(JSON.stringify(postData))
req.end()
