import { useContext } from "react"
import TextInput from "./TextInput"
import BoardContext from "../context"
import { useDraggable, useDroppable } from "@dnd-kit/core"

interface CardProps {
  id: string
  listIndex: number
  cardIndex: number
  content: string
}

export default function Card({ id, content, listIndex, cardIndex }: CardProps) {
  const { renameCard, deleteCard } = useContext(BoardContext)
  const {
    attributes,
    listeners,
    setNodeRef: setDragNodeRef,
    isDragging,
  } = useDraggable({
    id,
    data: { listIndex, cardIndex, type: "CARD" },
  })
  const { setNodeRef: setDropNodeRef } = useDroppable({
    id,
    data: { listIndex, cardIndex, type: "CARD" },
  })

  return (
    <div
      className={isDragging ? "invisible" : ""}
      ref={(e) => {
        setDragNodeRef(e)
        setDropNodeRef(e)
      }}
      {...listeners}
      {...attributes}
    >
      <TextInput
        value={content}
        onChange={(newContent) => {
          renameCard(listIndex, cardIndex, newContent)
        }}
        onDelete={() => {
          deleteCard(listIndex, cardIndex)
        }}
        className="text-sm p-3 shadow bg-white rounded-lg"
      />
    </div>
  )
}
