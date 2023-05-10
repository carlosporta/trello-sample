import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai"
import Card from "../Card"

import BoardContext from "../Board/context"
import { useContext, useState } from "react"

function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  })
  const style = {
    color: isOver ? "green" : undefined,
  }

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  )
}

function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  })
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  )
}

export default function List(props) {
  const [editing, setEditing] = useState(false)
  const { addList, renameList } = useContext(BoardContext)

  function handleOnEdit() {
    setEditing(!editing)
  }

  function handleOnChange(e) {
    const newName = e.target.value
    renameList(props.index, newName)
  }

  return (
    <div className="grow-0 shrink-0 basis-80 [&:not(:last-child)]:border-r">
      <div
        onDoubleClick={handleOnEdit}
        className="p-4 flex items-center justify-between"
      >
        <div className="grow font-bold text-xl">
          {editing ? (
            <input
              type="text"
              autoFocus
              value={props.title}
              onChange={handleOnChange}
            />
          ) : (
            <div className="group flex items-center justify-between">
              {props.title}
              <AiOutlineEdit
                onClick={handleOnEdit}
                className="hidden mr-4 text-gray-400 group-hover:block hover:bg-slate-200 hover:text-rose-300 text-xl"
              />
            </div>
          )}
        </div>
        <button>
          <AiOutlinePlus
            className="hover:bg-slate-200 hover:text-rose-300 text-xl"
            onClick={() => alert(props.index)}
          />
        </button>
      </div>
      {props.cards.map((card) => {
        return <Card key={card.id} index={card.index} content={card.content} />
      })}
    </div>
  )
}
