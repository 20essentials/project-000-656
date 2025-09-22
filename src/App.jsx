import './global.css'
import { createElement, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  const babyRef = useRef(null)
  const itemsRef = useRef([])
  const buttonsRef = useRef([])

  useEffect(() => {
    const dom = {
      items: itemsRef.current,
      baby: babyRef.current,
      buttons: buttonsRef.current
    }

    class Gotchi {
      constructor() {
        this.names = ['food','light','play','medical','shower','measure','talk','check']
        this.action = [
          this.food.bind(this), this.light.bind(this), this.play.bind(this),
          this.medical.bind(this), this.shower.bind(this), this.measure.bind(this),
          this.talk.bind(this), this.check.bind(this)
        ]
        this.item = -1
        this.locked = false
        this.weight = 30 + ~~(Math.random()*25)
        this.age = 0
        this.hungry = 3
        setInterval(this.update.bind(this), 10000)
      }
      update() {
        if (1 + ~~(Math.random()*6) === 1) this.hungry++
        this.age += 0.01
      }
      moveItem() {
        dom.items.forEach(i => i.classList.remove('active'))
        dom.items[this.item]?.classList.add('active')
      }
      back() { this.item = this.item>0?this.item-1:0; this.moveItem() }
      next() { this.item = this.item<7?this.item+1:this.item; this.moveItem() }
      run() { if(this.locked) return; this.action[this.item]?.() }
      lock(f) { this.locked=true; setTimeout(()=>{f(); dom.baby.textContent=''; this.unlock()},4000) }
      unlock(){this.locked=false}
      food(){ if(this.hungry>0){this.hungry--; dom.baby.classList.add('eat'); this.lock(()=>dom.baby.classList.remove('eat'))} else this.nope() }
      light(){ dom.baby.classList.add('sunglasses'); this.lock(()=>dom.baby.classList.remove('sunglasses')) }
      play(){ dom.baby.classList.add('play'); this.lock(()=>dom.baby.classList.remove('play')) }
      medical(){ this.nope() }
      shower(){ dom.baby.classList.add('shower'); this.lock(()=>dom.baby.classList.remove('shower')) }
      measure(){ dom.baby.classList.add('off'); dom.baby.textContent=`Weight: ${this.weight}KB`; this.lock(()=>dom.baby.classList.remove('off')) }
      talk(){ dom.baby.classList.add('talk'); this.lock(()=>dom.baby.classList.remove('talk')) }
      check(){ dom.baby.classList.add('off'); dom.baby.innerHTML=`Hungry: ${'*'.repeat(this.hungry)}<br>Age: ${this.age}`; this.lock(()=>dom.baby.classList.remove('off')) }
      nope(){ dom.baby.classList.add('nope'); this.lock(()=>dom.baby.classList.remove('nope')) }
    }

    const gotchi = new Gotchi()
    dom.buttons[0].onclick = ()=>gotchi.back()
    dom.buttons[1].onclick = ()=>gotchi.run()
    dom.buttons[2].onclick = ()=>gotchi.next()
  }, [])

  return (
    <>
      <section className="fixed bottom-0 left-0 w-full overflow-hidden line-height-0 -z-10">
        <svg className="relative block w-[calc(100%-1.3px)] min-h-[153px] rotate-y-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path className="fill-white" d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"/>
        </svg>
      </section>
      <header className="flex justify-between p-6 text-white font-black w-[90%] mx-auto">
        <div className="cursor-pointer text-2xl">TTT</div>
        <nav className="flex gap-4 pr-12">
          {['Home','About','Services','Work','Contact'].map((t,i)=><button key={i} className="text-white font-extrabold uppercase">{t}</button>)}
        </nav>
      </header>
      <main className="flex flex-grow">
        <section className="w-1/2 relative -z-10 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold uppercase text-white">JSGOTCHI</h1>
            <h2 className="text-2xl font-extrabold uppercase text-white">WEBSITE DESIGN</h2>
            <p className="text-white brightness-[150%] contrast-[150%] saturate-[150%]">
              The JsGotchi is a portable electronic device with an LCD screen that
              simulates a virtual pet. Its interface allows users to interact via
              buttons to feed, clean, and entertain the digital creature, ensuring
              its well-being. It features different growth stages and responds to
              the care provided, potentially becoming sick or ceasing to function if
              neglected. Its compact design and simple gameplay make it suitable for
              portable entertainment, encouraging continuous interaction and user
              engagement.
            </p>
          </div>
        </section>
        <section className="w-1/2 flex flex-wrap place-content-center relative">
          <div className="flex flex-col items-center bg-gradient-to-tr from-[#a00] to-[#883434] rounded-[300px/390px] shadow-inner -inset-10 w-[500px] h-[550px] overflow-hidden scale-70">
            <div className="screen w-[300px] h-[245px] mt-10 bg-[#788078] shadow-inner rounded-xl flex flex-col relative">
              <div className="bar flex justify-around w-[245px] mx-auto p-2">
                <i ref={el=>itemsRef.current[0]=el} className="fas fa-utensils text-2xl"></i>
                <i ref={el=>itemsRef.current[1]=el} className="far fa-lightbulb text-2xl"></i>
                <i ref={el=>itemsRef.current[2]=el} className="fas fa-gamepad text-2xl"></i>
                <i ref={el=>itemsRef.current[3]=el} className="fas fa-briefcase-medical text-2xl"></i>
              </div>
              <div className="room flex flex-col">
                <div ref={babyRef} className="baby w-full h-full"></div>
              </div>
              <div className="bar flex justify-around w-[245px] mx-auto p-2 absolute bottom-0">
                <i ref={el=>itemsRef.current[4]=el} className="fas fa-shower text-2xl"></i>
                <i ref={el=>itemsRef.current[5]=el} className="fas fa-weight text-2xl"></i>
                <i ref={el=>itemsRef.current[6]=el} className="far fa-comment-dots text-2xl"></i>
                <i ref={el=>itemsRef.current[7]=el} className="far fa-smile text-2xl"></i>
              </div>
            </div>
            <div className="buttons flex justify-between w-[210px] my-4">
              <div ref={el=>buttonsRef.current[0]=el} className="rounded-full w-12 h-12 bg-yellow-400 shadow-inner"></div>
              <div ref={el=>buttonsRef.current[1]=el} className="rounded-full w-12 h-12 bg-yellow-400 shadow-inner -mt-5"></div>
              <div ref={el=>buttonsRef.current[2]=el} className="rounded-full w-12 h-12 bg-yellow-400 shadow-inner"></div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

const root = createElement('div')
document.body.appendChild(root)
createRoot(root).render(<App />)
