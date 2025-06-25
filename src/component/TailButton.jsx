
export default function TailButton({caption, color, onHandle}) {
  const bg = {
    "blue" : "bg-blue-800",
    "orange" : "bg-orange-800",
    "lime" : "bg-lime-800"
  }
  return (
    <button className={`p-4 rounded-xl text-white
                       hover:cursor-pointer hover:font-bold
                      ${bg[color]}`}
            onClick={onHandle}>
      {caption}
    </button>
  )
}
