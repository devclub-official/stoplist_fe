// Dropdown.tsx
import { useState, useRef, useEffect } from "react";

// 페르소나 타입 정의
interface Persona {
  id: number;
  name: string;
}

interface DropdownProps {
  selectedPersona: Persona | null;
  personas: Persona[];
  isEditing: boolean;
  onSelect: (personaId: number) => void;
}

function Dropdown({
  selectedPersona,
  personas,
  isEditing,
  onSelect,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (isEditing) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (id: number) => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <div
        className={`flex items-center justify-between px-3 py-2 border ${
          isEditing
            ? "border-coral-300 cursor-pointer"
            : "border-transparent cursor-default"
        } rounded-lg ${isOpen ? "bg-gray-50" : ""}`}
        onClick={toggleDropdown}
      >
        <div className="font-medium">{selectedPersona?.name || ""}</div>
        {isEditing && (
          <svg
            className={`w-4 h-4 ml-2 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className="py-1 max-h-60 overflow-auto">
            {personas.map((persona) => (
              <li
                key={persona.id}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                  persona.id === selectedPersona?.id
                    ? "text-coral-600 font-medium"
                    : ""
                }`}
                onClick={() => handleSelect(persona.id)}
              >
                {persona.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
