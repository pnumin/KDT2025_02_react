import TailButton from "../component/TailButton" 
import { useState, useRef } from "react";
export default function MyRef() {
  const handleCal = () => {

  } 

  return (
    <div className="w-9/10 bg-lime-50 p-5 flex justify-center">
       <form className="flex justify-center">
          <input type='number' name='n1' 
                className="block w-24 p-2 mx-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"/>

          <select name="op"
                className="p-4 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block">
            <option> + </option>
            <option> - </option>
            <option> x </option>
            <option> / </option>
          </select>
          <input type='number' name='n2' 
                className="block w-24 p-2 mx-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"/>
          <TailButton  caption = " = "
                               color = "lime" 
                               onHandle = {handleCal} />

          <input type='number' name='n3' readOnly
                className="bg-lime-100 block w-24 p-2 mx-4 text-gray-900 border border-gray-300 rounded-lg  text-base focus:ring-blue-500 focus:border-blue-500"/>
       </form>
    </div>
  )
}
