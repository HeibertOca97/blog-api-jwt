import {useEffect} from 'react';

export function Home(){

  useEffect(()=>{
    document.querySelector("title").innerHTML = "Home | Blogger Dev";
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="card-header bg-dark text-white">Home</div>
        <div className="card-body">
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, fugit nulla exercitationem eaque non itaque obcaecati ut reprehenderit corrupti delectus tenetur sunt ab expedita ad, est velit asperiores ipsa et!</p>
        </div>
      </div>
    </div>
  )
}