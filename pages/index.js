import { useState, useEffect, useRef } from "react"

import Head from "next/head"
import OldTermInput from "../components/OldTermInput"
import TermInput from "../components/TermInput"
import Error from "../components/Error"
import Message from "../components/Message"

import CommandsContent from "../commands"

const projects = [
  "sorting",
  "gameoflife",
  "2048",
  "wordle",
  "connect4",
  "minesweeper",
  "snake"
]

function openInNewTab(url) {
  window.open(url, '_blank').focus();
}

async function getRepos() {
  const response = await fetch('https://api.github.com/users/phobiadev/repos');
  let repos = await response.json();
  return repos.map(repo => repo.name)
}

export default function Portfolio() {

  

  const historyRef = useRef(null)
  const [history, setHistory] = useState([])
  const [repos, setRepos] = useState(async () => await getRepos())

  useEffect(() => {
    historyRef.current?.scrollIntoView({ behavior: "smooth" })
    updateRepos()
  },[history])

  async function updateRepos() {
    setRepos(await getRepos())
    console.log(await getRepos())
  }
  

  async function handleOutput(newHistory, val) {
    if (Object.keys(CommandsContent).includes(val.trim())) {
      setHistory([...newHistory, ["message",CommandsContent[val.trim()]]])
      return
    }

    switch (val.trim().split(" ")[0]) {
      case "clear":
        setHistory([])
        break;

      case "projects":
        // hasnt been picked up by first if statement so must contain flags
        let first = val.trim().indexOf(" ")
        let rest = val.trim().slice(first+1)
        if (rest === "ids") {
          setHistory([...newHistory, ["message",projects.join("\n")]])
          return;
        }
        if (projects.includes(rest)) {
          openInNewTab(`https://${rest}.phobia.dev`)
          return;
        }
        setHistory([...newHistory,["error",`-jash: ${rest} is not one of my projects\ntype <a class="highlight">projects <a class="flag">ids</a></a> to see all of my project ids`]])
        break;
        

      case "github":
        if (val.trim().split(" ").length > 1) {
          let first = val.trim().indexOf(" ")
          let rest = val.trim().slice(first+1)
          if (rest === "all") {
            setHistory([...newHistory, ["message",repos.join("\n")]])
            return;
          }
          if (repos.includes(rest)) {
            openInNewTab(`https://github.com/phobiadev/${rest}`)
            return
          }
          setHistory([...newHistory,["error",`-jash: ${rest} is not one of my github repos\ntype <a class="highlight">github <a class="flag">all</a></a> to see all of my github repos`]])
         
          return
        }

        openInNewTab("https://github.com/phobiadev")
        break;

      case "blog":
        openInNewTab("https://blog.phobia.dev")
        break;

      case "source":
        openInNewTab("https://github.com/phobiadev/portfolio")
        break;

      case "jash":
        setHistory([...newHistory,["message","bash + joseph = jash, get it"]])
        break;

      case "":
        break;

      default:
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