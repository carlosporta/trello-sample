import React, { useState } from "react"
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineSend,
} from "react-icons/ai"

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  onDelete: () => void
  onAddCard?: () => void
  className?: string
}

export default function TextInput({
  value,
  onChange,
  onDelete,
  onAddCard,
  className = "",
}: TextInputProps) {
  const [editing, setEditing] = useState(false)

  function handleOnEdit() {
    setEditing(!editing)
  }

  function handleOnKeyUp(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      setEditing(false)
    }
  }

  function handleOnFocus(event: React.FormEvent<HTMLTextAreaElement>) {
    event.currentTarget.style.height =
      event.currentTarget.scrollHeight.toString() + "px"
    event.currentTarget.setSelectionRange(0, event.currentTarget.value.length)
  }

  function handleOnChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value)
  }

  return (
    <div
      onDoubleClick={handleOnEdit}
      className={`${className} flex items-center justify-between`}
    >
      {editing ? (
        <>
          <textarea
            className="w-full"
            autoFocus
            value={value}
            onChange={handleOnChange}
            onKeyUp={handleOnKeyUp}
            onBlur={handleOnEdit}
            onFocus={handleOnFocus}
          />
          <div className="m-1 w-16 rounded text-xl bg-zinc-100 flex items-center">
            <AiOutlineSend className="grow text-zinc-500 hover:text-rose-600 cursor-pointer" />
          </div>
        </>
      ) : (
        <div className="group grid grow">
          <div className="grow col-start-1 row-start-1">{value}</div>
          <div className="w-16 ml-auto rounded text-xl bg-zinc-100 col-start-1 flex gap-3 items-center row-start-1 invisible group-hover:visible">
            <div className="flex w-full items-center justify-around">
              {onAddCard != null && (
                <AiOutlinePlus
                  onClick={onAddCard}
                  className="text-zinc-500 hover:text-rose-600 cursor-pointer"
                />
              )}
              <AiOutlineEdit
                onClick={handleOnEdit}
                className="text-zinc-500 hover:text-rose-600 cursor-pointer"
              />
              <AiOutlineDelete
                onClick={onDelete}
                className="text-zinc-500 hover:text-rose-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
