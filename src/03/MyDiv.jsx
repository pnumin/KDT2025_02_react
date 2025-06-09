import MyDiv2 from "./MyDiv2"
export default function MyDiv() {
  return (
    <div className="w-2/3 h-3/5 bg-amber-900
                    flex flex-col items-center
                    p-10 text-2xl
                    text-white font-bold">
      <div className = "w-9/10 flex justify-start
                        mb-5"> 
        MyDiv
      </div>
      <MyDiv2 />
    </div>
  )
}
