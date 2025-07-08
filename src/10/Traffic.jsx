import { useState, useEffect } from "react"
export default function Traffic() {
  //전체 데이터
  const [tdata, setTdata] = useState([]) ;

  //대분류 데이터
  const [c1, setC1] = useState([]) ;

  //선택된 대분류
  const [sel1, setSel1] = useState();

  //사고유형 데이터 
  const [c2, setC2] = useState([]) ;

  //선택된 사고유형
  const [sel2, setSel2] = useState();

  //선택된 자료
  const [info, setInfo] = useState();

  //데이터fetch 함수
  const getFetchData = async() => {
    const apikey = import.meta.env.VITE_DATA_API ;
    const baseUrl = 'https://api.odcloud.kr/api/15070282/v1/uddi:8449c5d7-8be5-4712-9093-968fc0b2d9fc?' ;
    const url = `${baseUrl}page=1&perPage=18&serviceKey=${apikey}` ;

    const resp = await fetch(url) ;
    const data = await resp.json() ;

    setTdata(data.data) ;
  }

  //컴포넌트 생성될 때 맨처음 한번 실행 
  useEffect(()=>{
    //데이터 fetch
    getFetchData() ;
  }, []);

  // tdata가 변경이 되었을때 
  useEffect(()=>{
    //useState에 의해 초기화 될때
    if (tdata.length == 0 ) return ;

    //fetch tdata 변경이 되었을때
    let tm = tdata.map(item => tdata["사고유형대분류"]) ;
    //중복제거
    tm = [...new Set(tm)] ;

    //대분류 생성
    setC1(tm) ;
  }, [tdata]) ;

  // 대분류 중에서 특정 항목이 선택되면 
  useEffect(()=>{
    // 대분류가 초기화 되어 선택 항목이 없을때
    if (!sel1) return ;

    // 사고유형 목록 생성
    let tm = tdata.filter(item => item["사고유형대분류"] == sel1 ) ;
    setC2(tm) ;

  }, [sel1]) ;

  //사고유형이 선택되었을때
  useEffect(() => {
    if (!sel1 || !sel2 || !c2) return ;
    
    let tm = tdata.filter(item => item["사고유형대분류"] == sel1 && 
                                  item["사고유형"] == sel2
                          )
    setIInfo(tm) ;
  } , [sel2]);

  return (
    <div>Traffic</div>
  )
}
