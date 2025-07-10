import { Link } from "react-router-dom"
export default function RouteHome() {
  return (
    <div className="w-9/10 mt-10 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-center">RouteHome</h1>
      <ul className="w-60">
        <Link to="/p1/사과/🍎">
          <li className="w-full p-4 m-2 border border-amber-700 hover:bg-amber-100">
            사과 🍎
          </li>
        </Link>
        <Link to="/p1/당근/🥕">
          <li className="w-full p-4 m-2 border border-amber-700 hover:bg-amber-100">
            당근 🥕
          </li>
        </Link>
        <Link to="/p1/바나나/🍌">
          <li className="w-full p-4 m-2 border border-amber-700 hover:bg-amber-100">
            바나나 🍌
          </li>
        </Link>
      </ul>
    </div>
  )
}
