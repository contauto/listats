

export default function TimeFormatter(time) {

    const splitedData=time.split("T")
    const reversedDate=splitedData[0]
    const date=reversedDate.split("-")[2]+"-"+reversedDate.split("-")[1]+"-"+reversedDate.split("-")[0]
    const clock=splitedData[1].split("Z")[0].split(".")[0]

  return date+" "+clock
}
