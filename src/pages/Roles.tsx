import type { JSX } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import RoleInfo from "../components/RoleInfo"

type Props = {
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

const roles = [
  { id: "scrum-master", title: "Scrum Master", description: "info about the scrum master" },
  { id: "product-owner", title: "Product Owner", description: "info about the product owner" },
  { id: "ux-ui-designer", title: "UX/UI Designer", description: "info about the ui-ux designer" },
  { id: "web-developer", title: "Web Developer", description: "info about the web-developer" },
  {
    id: "python-developer",
    title: "Python Developer",
    description: "info about the python developer",
  },
]

export default function Roles({ className = "", ...props }: Props): JSX.Element {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [showInfoPopup, setShowInfoPopup] = useState<boolean>(false)
  const navigate = useNavigate()

  const selectedRoleData = roles.find((role) => role.id === selectedRole) || null

  const handleDisplayPopup = () => {
    setShowInfoPopup(true)
    console.log(selectedRoleData?.description || "no role selected")
  }

  const handleContinue = () => {
    if (selectedRole) {
      navigate(`/quiz/${selectedRole}`)
    }
  }

  const closePopup = () => {
    setShowInfoPopup(false)
  }

  return (
    <>
      <div
        className={`${className} flex flex-col items-center justify-center px-4 py-8`}
        {...props}>
        {showInfoPopup && selectedRole && (
          <RoleInfo
            description={selectedRoleData?.description || "data not found"}
            closePopup={closePopup}
          />
        )}

        <div className='max-w-md w-full bg-gray-100 rounded-lg shadow-lg p-8'>
          <div className='mb-6'>
            <h1 className='text-2xl font-bold mb-2'>Choose a Role</h1>
            <p className='text-sm text-gray-600'>
              To learn more about any of the roles, please select a role and click "Learn More About
              Role" before proceeding. Otherwise you may simply select and role and proceed.
            </p>
          </div>

          <div className='mb-6'>
            <h2 className='text-lg font-semibold mb-3'>Select A Role</h2>
            <div className='space-y-2'>
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                    selectedRole === role.id
                      ? "bg-gray-400 border-gray-500 text-white"
                      : "bg-white border-gray-300 hover:border-gray-400"
                  }`}>
                  {role.title}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleDisplayPopup}
            disabled={!selectedRole}
            className={`w-full py-3 rounded-lg font-semibold transition-all mb-2 ${
              selectedRole
                ? "border border-blue-500  hover:border-blue-600 hover:text-blue-600 text-blue-500 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}>
            Learn More About Role
          </button>
          <p className='text-center text-blue-600 mb-2'> or </p>
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              selectedRole
                ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}>
            Continue
          </button>
        </div>
      </div>
    </>
  )
}
