"use client"

import { useEffect, useState } from "react"

 
const Film = (data) => {
    const [film,setFilm] = useState(null)
    useEffect(() => {
        setFilm(data)
    }, [data])
  return (
      <div>{film.title}</div>
  )
}

export default Film