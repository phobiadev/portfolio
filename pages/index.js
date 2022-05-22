import { useState, useEffect, useRef } from "react"

import Head from "next/head"
import OldTermInput from "../components/OldTermInput"
import TermInput from "../components/TermInput"
import Error from "../components/Error"
import Message from "../components/Message"

import CommandsContent from "../commands"

function openInNewTab(url) {
  window.open(url, '_blank').focus();
}

export default function Portfolio() {

  const historyRef = useRef(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    historyRef.current?.scrollIntoView({ behavior: "smooth" })
  },[history])
  

  function handleOutput(newHistory, val) {
    if (Object.keys(CommandsContent).includes(val.trim())) {
      setHistory([...newHistory, ["message",CommandsContent[val.trim()]]])
      return
    }

    switch (val.trim()) {
      case "clear":
        setHistory([])
        break;

      case "github":
        openInNewTab("https://github.com/phobiadev")
        break;

      case "blog":
        openInNewTab("https://blog.phobia.dev")
        break;

      case "source":
        openInNewTab("https://github.com/phobiadev/portfolio")
        break;

      case "jash":
        setHistory([...newHistory,["message","bash + joseph = jash, get it agagag"]])
        break;

      default:
        if (["unlock","secret","sudo","su","ssh","rickroll","rm","chown","chmod","deluser","adduser","poweroff","reboot",":(){:|:&};:","mv"].includes(val.trim().split(" ")[0])) {
          setHistory([...newHistory,["error","-jash: security measures activating in 1 second"]])
          setTimeout(() => openInNewTab("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),1000)
          return;
        } 
        setHistory([...newHistory, ["error",`
-jash: ${val.split(" ")[0]}: not found 
type <a class="highlight">help</a> to see a list of commands
          `]])
    }
  }

  function handleSubmit(val) {
    let newHistory = history.slice()
    newHistory.push(["input",val])
    console.log(newHistory)
    setHistory(newHistory)
    handleOutput(newHistory, val)
  }


  return (
    <div className="App">
      <Head>
        <title>phobia.dev</title>
      </Head>
      <p className="title">{`
██████╗░██╗░░██╗░█████╗░██████╗░██╗░█████╗░░░░██████╗░███████╗██╗░░░██╗
██╔══██╗██║░░██║██╔══██╗██╔══██╗██║██╔══██╗░░░██╔══██╗██╔════╝██║░░░██║
██████╔╝███████║██║░░██║██████╦╝██║███████║░░░██║░░██║█████╗░░╚██╗░██╔╝
██╔═══╝░██╔══██║██║░░██║██╔══██╗██║██╔══██║░░░██║░░██║██╔══╝░░░╚████╔╝░
██║░░░░░██║░░██║╚█████╔╝██████╦╝██║██║░░██║██╗██████╔╝███████╗░░╚██╔╝░░
╚═╝░░░░░╚═╝░░╚═╝░╚════╝░╚═════╝░╚═╝╚═╝░░╚═╝╚═╝╚═════╝░╚══════╝░░░╚═╝░░░
      `}</p>

      <p>type <a className="highlight">help</a> to get started</p>

      {history.map(item => {
        switch (item[0]) {
          case "input":
            return <OldTermInput content={item[1]}/>
          case "error":
            return <Error content={item[1]}></Error>
          case "message":
            return <Message content={item[1]}></Message>
        }
      })}
      <div ref={historyRef} />

      <TermInput handleSubmit={handleSubmit} />
    </div>
  )
}