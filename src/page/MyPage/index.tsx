import { useState } from "react";
import Dropdown from "./Dropdown";
import ConfirmationModal from "./ConfirmationModal";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState("장원영");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempPersona, setTempPersona] = useState(""); // 임시 저장용

  const personas = ["장원영", "스티븐 잡스", "워렌 버핏", "김종국", "찰스"];

  const handleToggleEdit = () => {
    if (isEditing) {
      // 저장 버튼을 눌렀을 때
      setTempPersona(selectedPersona); // 현재 선택된 페르소나를 임시 저장
      setIsModalOpen(true); // 모달 오픈
    } else {
      // 페르소나 변경 버튼을 눌렀을 때
      setIsEditing(true);
    }
  };

  const handlePersonaSelect = (persona: string) => {
    setSelectedPersona(persona);
  };

  const handleConfirm = () => {
    // 모달에서 확인을 눌렀을 때의 로직
    // 여기서 실제 API 호출 등을 수행할 수 있습니다
    setIsModalOpen(false);
    setIsEditing(false);
    // 실제 저장 로직 (API 호출 등)이 이 자리에 들어갈 수 있습니다
  };

  const handleCancel = () => {
    // 모달에서 취소를 눌렀을 때의 로직
    setIsModalOpen(false);
    setIsEditing(false); // 에디트 모드도 취소
    setSelectedPersona(tempPersona); // 선택을 이전 값으로 되돌리기
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/", { replace: true }); // 로그인 페이지로 이동
  };

  return (
      <div className="pt-10 px-6 max-w-xl mx-auto">
        <div className="mb-10 text-center">
          <div className="text-2xl font-semibold">
            <strong className="text-coral-600">howu</strong>님 환영합니다!
          </div>
        </div>

        <div className="bg-white border border-coral-300 rounded-2xl p-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold mb-2">나의 페르소나</h2>
            <Dropdown
                selectedPersona={selectedPersona}
                options={personas}
                isEditing={isEditing}
                onSelect={handlePersonaSelect}
            />
          </div>

          <button
              className="bg-primary text-white text-sm mt-9 px-4 py-2 w-[120px] rounded-xl transition-transform active:scale-95"
              onClick={handleToggleEdit}
          >
            {isEditing ? "저장" : "페르소나 변경"}
          </button>
        </div>

        <ConfirmationModal
            isOpen={isModalOpen}
            onClose={handleCancel}
            onConfirm={handleConfirm}
            title="페르소나 변경"
            message={`페르소나를 '${selectedPersona}'(으)로 변경하시겠습니까?`}
        />

        <div className="mt-10 text-center">
          <button
              onClick={handleLogout}
              className="bg-coral-600 text-white text-sm px-6 py-2 rounded-xl shadow-sm transition-transform active:scale-95 hover:bg-coral-700"
          >
            로그아웃
          </button>
        </div>
      </div>
  );
}

export default MyPage;
