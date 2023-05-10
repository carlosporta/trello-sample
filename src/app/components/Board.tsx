import { AiOutlinePlus } from "react-icons/ai"
import List from "./List"
// import Card from "./Card"
import BoardContext from "../context"
import { useContext, useState } from "react"
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core"
import type { DragStartEvent, DragEndEvent, DragOverEvent } from "@dnd-kit/core"
import type { List as IList, Card as ICard } from "../context"

function isAList(item: IList | ICard | object): item is IList {
  return "cards" in item
}

function isACard(item: IList | ICard | object): item is ICard {
  return "content" in item
}

export default function Board() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )
  const { lists, addList, swapLists, swapCards } = useContext(BoardContext)
  const [activeItem, setActiveItem] = useState<IList | ICard | object>({})

  function handleDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "LIST") {
      const index = event.active.data.current?.index
      const list = lists[index]
      setActiveItem(list)
    }
    if (event.active.data.current?.type === "CARD") {
      const listIndex = event.active.data.current?.listIndex
      const cardIndex = event.active.data.current?.cardIndex
      const card = lists[listIndex].cards[cardIndex]
      setActiveItem(card)
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveItem({})
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event

    if (
      active?.data.current?.type === "LIST" &&
      over?.data.current?.type === "LIST"
    ) {
      const fromIndex = active.data.current?.index
      const toIndex = over?.data.current?.index

      if (fromIndex === toIndex) {
        return
      }
      swapLists(fromIndex, toIndex)
      return
    }

    if (
      active?.data.current?.type === "LIST" &&
      over?.data.current?.type === "CARD"
    ) {
      const fromIndex = active.data.current?.index
      const toIndex = over?.data.current?.listIndex

      if (fromIndex === toIndex) {
        return
      }
      swapLists(fromIndex, toIndex)
      return
    }

    if (
      active?.data.current?.type === "CARD" &&
      over?.data.current?.type === "CARD"
    ) {
      const fromListIndex = active.data.current?.listIndex
      const fromCardIndex = active.data.current?.cardIndex
      const toListIndex = over?.data.current?.listIndex
      const toCardIndex = over?.data.current?.cardIndex

      if (fromListIndex === toListIndex && fromCardIndex === toCardIndex) {
        return
      }
      if (fromListIndex !== toListIndex) {
        const item = lists[fromListIndex].cards[fromCardIndex]
        setActiveItem(item)
      }
      swapCards(fromListIndex, fromCardIndex, toListIndex, toCardIndex)
      return
    }

    // if (
    //   active?.data.current?.type === undefined &&
    //   over?.data.current?.type === "CARD"
    // ) {
    //   const fromList = lists
    //     .filter((list) => list.cards.includes(activeItem as ICard))
    //     .flat()[0]
    //   const fromListIndex = lists.indexOf(fromList)
    //   const fromCardIndex = fromList.cards.indexOf(activeItem as ICard)

    //   const toListIndex = over?.data.current?.listIndex
    //   const toCardIndex = over?.data.current?.cardIndex

    //   if (fromListIndex === toListIndex && fromCardIndex === toCardIndex) {
    //     return
    //   }
    //   swapCards(fromListIndex, fromCardIndex, toListIndex, toCardIndex)
    // }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex h-full">
        {lists.map((list, index) => (
          <List
            key={index}
            id={list.id}
            index={index}
            title={list.title}
            cards={list.cards}
          />
        ))}
        <button
          onClick={() => {
            addList("New list")
          }}
          className="p-4 flex h-full items-center justify-between hover:bg-rose-600 hover:text-white active:text-rose-200 active:bg-rose-800"
        >
          <div className="font-bold text-xl">New list</div>
          <AiOutlinePlus className="text-4xl" />
        </button>
      </div>
      <DragOverlay>
        {isAList(activeItem) && (
          <List
            index={lists.indexOf(activeItem)}
            id={activeItem.title}
            title={activeItem.title}
            cards={activeItem.cards}
          />
        )}
        {isACard(activeItem) && (
          <div className="p-4 bg-white shadow-md rounded-md">
            {activeItem.content}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
