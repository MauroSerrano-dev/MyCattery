import { useState, useEffect } from "react";
import Link from 'next/link'

export default function Home() {
  const [isLogged, setIsLogged] = useState()
  
  useEffect(() => {
    setIsLogged(localStorage.length > 0)
  }, []);

  return (
    <div className="mainHome">
    </div>
  );
}
