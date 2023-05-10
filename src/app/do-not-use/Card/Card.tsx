export default function Card(props) {
  return (
    <div>
      <div className="rounded bg-white shadow p-4 m-4">{props.content}</div>
    </div>
  )
}
