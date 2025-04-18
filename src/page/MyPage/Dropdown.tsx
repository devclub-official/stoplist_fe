import { useState, useRef, useEffect } from "react";

interface PersonaDropdownProps {
  selectedPersona: string;
  options: string[];
  isEditing: boolean;
  onSelect: (persona: string) => void;
}

const Dropdown = ({
  selectedPersona,
  options,
  isEditing,
  onSelect,
}: PersonaDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative h-10" ref={dropdownRef}>
      <div className="min-w-[140px] h-10">
        {isEditing ? (
          <div className="absolute inset-0">
            <div
              className="rounded-lg  py-2 flex items-center justify-between cursor-pointer h-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              {selectedPersona}
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
            </div>
            {isOpen && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                {options.map((option) => (
                  <div
                    key={option}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      selectedPersona === option ? "bg-gray-100" : ""
                    }`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center">
            <div className="text-base ">{selectedPersona}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
