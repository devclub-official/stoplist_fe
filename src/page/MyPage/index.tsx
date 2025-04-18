import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import ConfirmationModal from "./ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/api/apiClient";

interface Persona {
  id: number;
  name: string;
  flag: boolean;
}

function MyPage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempPersona, setTempPersona] = useState<Persona | null>(null);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/", { replace: true });
      return;
    }

    axiosInstance
      .get("/api/user/info", {
        params: { userId: userId },
      })
      .then((res) => {
        console.log("사용자 정보:", res.data);
        if (res.data.status === 200 && res.data.data.personas) {
          const fetchedPersonas = res.data.data.personas.map((p: any) => ({
            id: p.personaId,
            name: p.personaName,
            flag: p.flag,
          }));

          setPersonas(fetchedPersonas);
          setNickname(res.data.data.nickname);

          const defaultPersona =
            fetchedPersonas.find((p: Persona) => p.flag) || fetchedPersonas[0];
          setSelectedPersona(defaultPersona);
          setTempPersona(defaultPersona);
        }
      })
      .catch((error) => {
        console.error("페르소나 목록 불러오기 실패:", error);
        alert("사용자 정보를 불러오는데 실패했습니다.");
      });
  }, [userId, navigate]);

  const handleToggleEdit = () => {
    if (isEditing) {
      setTempPersona(selectedPersona);
      setIsModalOpen(true);
    } else {
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
    if (selectedPersona && userId) {
      setIsLoading(true);
      axiosInstance
        .post("/api/persona", {
          userId: userId,
          personaId: selectedPersona.id,
        })
        .then((res) => {
          console.log("페르소나 업데이트 성공:", res.data);
          if (res.data.status === 200) {
            const updatedPersonas = personas.map((p) => ({
              ...p,
              flag: p.id === selectedPersona.id,
            }));
            setPersonas(updatedPersonas);
          } else {
            setSelectedPersona(tempPersona);
          }
        })
        .catch((error) => {
          console.error("페르소나 업데이트 실패:", error);
          alert("페르소나 변경 중 오류가 발생했습니다.");
          setSelectedPersona(tempPersona);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    setIsModalOpen(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setSelectedPersona(tempPersona);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/", { replace: true });
  };

  return (
    <div className="pt-10 px-6 max-w-xl mx-auto">
      <div className="mb-10 text-center">
        <div className="text-2xl font-semibold">
          <strong className="text-coral-600">{nickname}</strong>님 환영합니다!
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
          disabled={isLoading}
        >
          {isLoading ? "처리 중..." : isEditing ? "저장" : "페르소나 변경"}
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
          disabled={isLoading}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default MyPage;
