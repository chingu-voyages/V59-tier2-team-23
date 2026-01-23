import type { JSX } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const roles = [
  { id: "scrum-master", title: "Scrum Master" },
  { id: "product-owner", title: "Product Owner" },
  { id: "ux-ui-designer", title: "UX/UI Designer" },
  { id: "web-developer", title: "Web Developer" },
  { id: "python-developer", title: "Python Developer" },
];

export default function Roles({
  className = "",
  ...props
}: Props): JSX.Element {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole) {
      navigate(`/quiz/${selectedRole}`);
    }
  };

  return (
    <div className={`${className} flex flex-col items-center justify-center px-4 py-8`} {...props}>
      <div className="max-w-md w-full bg-gray-100 rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Choose a Role (Title)</h1>
          <p className="text-sm text-gray-600">
            (Expansion Paragraph) If you are not sure which role to choose, hover over it for more
            info (but the pop-up card would have a lot to say anyways)
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Select A Role</h2>
          <div className="space-y-2">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${selectedRole === role.id
                  ? "bg-gray-400 border-gray-500 text-white"
                  : "bg-white border-gray-300 hover:border-gray-400"
                  }`}
              >
                {role.title}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedRole}
          className={`w-full py-3 rounded-lg font-semibold transition-all ${selectedRole
            ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
