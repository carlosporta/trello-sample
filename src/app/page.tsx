"use client"

import { useState } from "react"
import { loadLists } from "./lists"
import BoardContext from "./context"
import Board from "./components/Board"

const initialLists = loadLists()

export default function Home() {
  const [lists, setLists] = useState(initialLists)

  function renameList(index: number, title: string) {
    const newLists = [...lists]
    newLists[index].title = title
    setLists(newLists)
  }

  function renameCard(listIndex: number, cardIndex: number, content: string) {
    const newLists = [...lists]
    newLists[listIndex].cards[cardIndex].content = content
    setLists(newLists)
  }

  function addCard(listIndex: number, content: string) {
    const newLists = [...lists]
    const maxId = Math.max(
      ...lists.map((list) => list.cards.map((card) => parseInt(card.id))).flat()
    )
    const id = (maxId + 1).toString()
    newLists[listIndex].cards.push({ id, content })
    setLists(newLists)
  }

  function addList(title: string) {
    console.log("addList")
    const maxId = Math.max(...lists.map((list) => parseInt(list.id)))
    const id = (maxId + 1).toString()
    const newLists = [...lists, { id, title, cards: [] }]
    setLists(newLists)
  }

  function deleteList(index: number) {
    const newLists = [...lists]
    newLists.splice(index, 1)
    setLists(newLists)
  }

  function deleteCard(listIndex: number, cardIndex: number) {
    const newLists = [...lists]
    newLists[listIndex].cards.splice(cardIndex, 1)
    setLists(newLists)
  }

  function swapLists(listIndex: number, overListIndex: number) {
    const newLists = [...lists]
    const list = newLists.splice(listIndex, 1)[0]
    newLists.splice(overListIndex, 0, list)
    setLists(newLists)
  }

  function swapCards(
    fromList: number,
    fromCard: number,
    toList: number,
    toCard: number
  ) {
    const newLists = [...lists]
    const card = newLists[fromList].cards.splice(fromCard, 1)[0]
    newLists[toList].cards.splice(toCard, 0, card)
    setLists(newLists)
  }

  return (
    <BoardContext.Provider
      value={{
        lists,
        renameList,
        addList,
        addCard,
        renameCard,
        deleteList,
        deleteCard,
        swapLists,
        swapCards,
      }}
    >
      <Board />
    </BoardContext.Provider>
  )
}
