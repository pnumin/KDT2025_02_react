import TailBall from "../component/TailBall" 
import TailButton from "../component/TailButton"
export default function Lotto() {
  const handleClick = () => {
    console.log("lotto")
  }
  return (
    <div>

      <TailBall n="2" />
      <TailButton caption="로또번호생성"
                  color="orange"
                  onHandle={handleClick}/>
    </div>
  )
}
