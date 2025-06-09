import MyDiv3 from "./MyDiv3"
export default function MyDiv2() {
  return (
    <div className="w-9/10 h-4/5 bg-amber-700
                    flex flex-col items-center
                    p-10 text-2xl
                    text-white font-bold">
      <div className = "w-9/10 flex justify-start
                        mb-5"> 
        MyDiv2
      </div>
      <MyDiv3 />
    </div>
  )
}
