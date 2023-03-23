

export default function TimeFormatter(time) {

    const splitData=time.split("T")
    const reversedDate=splitData[0]
    const date=reversedDate.split("-")[2]+"-"+reversedDate.split("-")[1]+"-"+reversedDate.split("-")[0]
    const clock=splitData[1].split("Z")[0].split(".")[0]

  return date+" "+clock
}
