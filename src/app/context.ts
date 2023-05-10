import { createContext } from "react"

export interface Card {
  id: string
  content: string
}

export interface List {
  id: string
  title: string
  cards: Card[]
}

export default createContext({
  lists: [] as List[],
  renameList: (index: number, title: string) => {},
  renameCard: (listIndex: number, cardIndex: number, content: string) => {},
  addList: (title: string) => {},
  addCard: (listIndex: number, content: string) => {},
  deleteList(index: number): void {},
  deleteCard(listIndex: number, cardIndex: number): void {},
  swapLists(listIndex: number, overListIndex: number): void {},
  swapCards(
    fromList: number,
    fromCard: number,
    toList: number,
    toCard: number
  ): void {},
})
