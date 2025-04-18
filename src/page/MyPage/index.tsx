import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import ConfirmationModal from "./ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/api/apiClient";

// 페르소나 타입 정의
interface Persona {
  id: number;
  name: string;
}

function MyPage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempPersona, setTempPersona] = useState<Persona | null>(null);
  const [personas, setPersonas] = useState<Persona[]>([]);

  useEffect(() => {
    axiosInstance
      .get("api/personalist")
      .then((res) => {
        console.log("res", res.data);
        if (res.data.status === 200 && res.data.data.personas) {
          setPersonas(res.data.data.personas);
          // 초기값 설정 (첫 번째 페르소나 또는 기본값)
          if (res.data.data.personas.length > 0) {
            setSelectedPersona(res.data.data.personas[0]);
            setTempPersona(res.data.data.personas[0]);
          }
        }
      })
      .catch((error) => {
        console.error("페르소나 목록 불러오기 실패:", error);
      });
  }, []);

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

  const handlePersonaSelect = (personaId: number) => {
    const selected = personas.find((p) => p.id === personaId);
    if (selected) {
      setSelectedPersona(selected);
    }
  };

  const handleConfirm = () => {
    // 모달에서 확인을 눌렀을 때의 로직
    if (selectedPersona) {
      axiosInstance
        .post("api/updatePersona", { personaId: selectedPersona.id })
        .then((res) => {
          console.log("페르소나 업데이트 성공:", res);
        })
        .catch((error) => {
          console.error("페르소나 업데이트 실패:", error);
          setSelectedPersona(tempPersona); // 실패 시 원래 선택으로 되돌리기
        });
    }

    setIsModalOpen(false);
    setIsEditing(false);
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
            personas={personas}
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
        message={`페르소나를 '${
          selectedPersona?.name || ""
        }'(으)로 변경하시겠습니까?`}
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
