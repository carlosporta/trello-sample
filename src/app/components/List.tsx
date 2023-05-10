import { useContext } from "react"
import BoardContext from "../context"
import { useDraggable, useDroppable } from "@dnd-kit/core"
import type { Card as CardInterface } from "../context"
import Card from "./Card"
import TextInput from "./TextInput"

interface ListProps {
  index: number
  id: string
  title: string
  cards: CardInterface[]
}

export default function List({ index, id, title, cards }: ListProps) {
  const { renameList, deleteList, addCard } = useContext(BoardContext)
  // const {
  //   attributes,
  //   listeners,
  //   setNodeRef: setDragNodeRef,
  //   isDragging,
  // } = useDraggable({ id, data: { index, type: "LIST" } })
  // const { setNodeRef: setDropNodeRef } = useDroppable({
  //   id,
  //   data: { index, type: "LIST" },
  // })

  return (
    <div
      ref={(e) => {
        // setDragNodeRef(e)
        // setDropNodeRef(e)
      }}
      // {...listeners}
      // {...attributes}
      className={`m-4 overflow-y-auto grow-0 shrink-0 basis-80 [&:not(:last-child)]:border-r border-zinc-300`}
    >
      <TextInput
        value={title}
        onChange={(newTitle) => {
          renameList(index, newTitle)
        }}
        onDelete={() => {
          deleteList(index)
        }}
        onAddCard={() => {
          addCard(index, "New card")
        }}
        className="text-lg font-bold"
      />
      <div className="space-y-3 mr-4 mt-2">
        {cards.map((card, cardIndex) => (
          <Card
            key={card.id}
            id={`${id.toString()}-${card.id.toString()}`}
            listIndex={index}
            cardIndex={cardIndex}
            content={card.content}
          />
        ))}
      </div>
    </div>
  )
}
