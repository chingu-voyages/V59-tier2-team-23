type RoleInfoProps = {
  description: string
  closePopup: () => void
}

export default function RoleInfo({ description, closePopup }: RoleInfoProps) {
  return (
    <div className='fixed z-50 bg-blue-600 text-white min-h-100 min-w-100 rounded-lg '>
      <div className='flex flex-col items-center justify-center'>
        <button
          className=' absolute top-0 right-0 m-4 bg-black p-3 rounded-lg'
          onClick={closePopup}>
          Close
        </button>

        <p className='absolute top-20'>{description}</p>
      </div>
    </div>
  )
}
