import { useEffect, useState } from 'react'
import './App.css'
import Layout from './components/layout/layout'

function App() {
  const [data, setData] = useState([])
  useEffect(()=> {
    fetch('https://fakestoreapi.com/products')
  .then((response)=> {
    if(response.status >= 400){
      throw new Error("Server Error")
    }
    return response.json()
  })
  .then((response)=>{
    setData(response)
    console.log(response);
  } )
  },[])

  return (
    <>
      <Layout>
          <h1>helo</h1>
      </Layout>
    </>
  )
}

export default App
