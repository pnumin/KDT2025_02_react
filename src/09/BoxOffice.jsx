import { useState, useEffect } from "react"

export default function BoxOffice() {
  const [tdata, setTdata] = useState([]) ;
  const [tag, setTag] = useState([]) ;

  const getFetchData = async () => {
    const apikey = import.meta.env.VITE_MV_API;
    const dt = "20250702" ;
    let url = `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apikey}&targetDt=${dt}` ;
    
    const resp = await fetch(url) ;
    const data = await resp.json() ;
    setTdata(data.boxOfficeResult.dailyBoxOfficeList); 
  }

  useEffect(() => {
    getFetchData();
  }, []);

  useEffect(()=>{
    console.log(tdata)
    let tm = tdata.map(item => 
            <tr  key = {item.movieCd}
                  className="bg-white border-b border-gray-200
                             hover:bg-gray-100 hover:text-blue-700 hover:cursor-pointer">
              <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.rank}
              </th>
              <td className="px-3 py-4">
                {item.movieNm}
              </td>
              <td className="px-3 py-4 text-right">
                {parseInt(item.salesAmt).toLocaleString()}
              </td>
              <td className="px-3 py-4 text-right">
                {parseInt(item.audiCnt).toLocaleString()}
              </td>
               <td className="px-3 py-4 text-right">
                {parseInt(item.salesAcc).toLocaleString()}
              </td>
              <td className="px-3 py-4  text-right">
                {parseInt(item.audiAcc).toLocaleString()}
              </td>
              <td className="px-3 py-4 text-center">
                {item.rankOldAndNew  == 'OLD'? "" 
                    : <span className="font-bold text-red-600">New</span>}
              </td>
            </tr> 
    );
    setTag(tm);
  }, [tdata]) ;
  
  return (
    <div className="w-9/10">
      <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase
                            bg-gray-50 border-b-2 border-gray-900">
            <tr>
              <th scope="col" className="px-3 py-3">
                순위
              </th>
              <th scope="col" className="px-3 py-3">
                영화명
              </th>
              <th scope="col" className="px-3 py-3">
                매출액
              </th>
              <th scope="col" className="px-3 py-3">
                관객수
              </th>
              <th scope="col" className="px-3 py-3">
                누적매출액
              </th>
              <th scope="col" className="px-3 py-3">
                누적관객수
              </th>
              <th scope="col" className="px-3 py-3">
                신규진입여부
              </th>
            </tr>
          </thead>
          <tbody>
            {tag}
          </tbody>
        </table>
      </div>
      <div className="w-full h-10 bg-amber-100 mt-5">

      </div>

    </div>
  )
}
