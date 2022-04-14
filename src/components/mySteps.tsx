import { Steps } from "antd";


const { Step } = Steps;


export default function MySteps(props: {step: number}) {

    const d1 = "使用以下鍵盤輸入就診序號，然後按'確認'按鈕。 輸入錯誤的情況可以按'重新輸入'按鈕。"
    const d2 = "從以下選項中選擇這次的看診類別，然後按'確認'按鈕。 如果不想選擇可以按下'取消'按鈕。"
    const d3 = "確認結果，五秒後會自動返回第一頁。 或是按'返回'按鈕馬上返回"

    return  <Steps current={props.step} size="small" > 
    <Step title="輸入就診序號" description="" />
    <Step title="選擇看診類別" description="" />
    <Step title="完成" description="" />
  </Steps>
}