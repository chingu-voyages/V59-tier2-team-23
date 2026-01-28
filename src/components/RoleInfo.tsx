type RoleInfoProps = {
  description: string
  closePopup: () => void
}

export default function RoleInfo({ description, closePopup }: RoleInfoProps) {
  return (
    <div className='bg-blue-600 text-white p-5'>
      <p>{description}</p>
      <button onClick={closePopup}>Close</button>
    </div>
  )
}
