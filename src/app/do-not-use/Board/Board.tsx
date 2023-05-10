import { AiOutlinePlus } from "react-icons/ai"

import BoardContext from "./context"
import List from "../List"
import { useContext } from "react"

export default function Board() {
  const { lists, addList } = useContext(BoardContext)
  return (
    <div className="bg-slate-100 flex h-full overflow-y-hidden gap-x-3">
      {lists.map((list) => {
        return (
          <List
            key={list.title}
            title={list.title}
            index={lists.indexOf(list)}
            cards={list.cards}
          />
        )
      })}
      <button
        onClick={() => {
          addList("oi")
        }}
        className="p-4 flex items-center justify-between hover:bg-rose-600 hover:text-white active:text-rose-200 active:bg-rose-800"
      >
        <div className="font-bold text-xl">New list</div>
        <AiOutlinePlus className="text-4xl" />
      </button>
    </div>
  )
}
