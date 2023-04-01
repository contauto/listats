

export default function TimeFormatter(time) {
    const playedAt = new Date(time)
    const hour=playedAt.getHours()
    const minute=String(playedAt.getMinutes()).padStart(2,"0")
    const clock=hour+"."+minute
    const splitData=time.split("T")
    const reversedDate=splitData[0]
    const date=reversedDate.split("-")[2]+"-"+reversedDate.split("-")[1]+"-"+reversedDate.split("-")[0]
    
  return [date,clock]
}
