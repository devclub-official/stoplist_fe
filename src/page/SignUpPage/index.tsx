import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {axiosInstance} from "@api/apiClient.ts";

const SignUpPage = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [selectedPersonaId, setSelectedPersonaId] = useState<number | null>(null);
    const [personaList, setPersonaList] = useState([]);
    const navigate = useNavigate();

    const handleSignUp = () => {
        if (!id || !password || !selectedPersonaId) {
            alert('모든 항목을 입력해주세요.');
            return;
        }
        axiosInstance.post('api/user/signup',{nickname:id, password:password, personaId:selectedPersonaId}).then(res => {
            if(res.status === 200) {
                window.localStorage.setItem('userId', res.data.userId);
                navigate('/home');
            } else {
                alert(`${res.data.data}`);
            }
        });
    };

    useEffect(() => {
        axiosInstance.get('api/personalist').then(res => {
            if(res.status === 200) {
                console.log('res',res)
                setPersonaList(res.data.data.personas);
            } else {
                alert(`${res.data.data}`);
            }
        });

    },[])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
            <h1 className="mb-10 text-3xl font-bold text-orange-500">SignUp</h1>

            <div className="flex w-full max-w-xs flex-col gap-4">
                <input
                    type="text"
                    placeholder="아이디"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="rounded-lg bg-coral-100 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-lg bg-coral-100 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
                />

                <div>
                    <p className="mb-2 text-sm font-semibold text-gray-600">페르소나</p>
                    <div className="flex flex-wrap gap-2">
                        {personaList.map((persona) => (
                            <button
                                key={persona.id}
                                type="button"
                                onClick={() => setSelectedPersonaId(persona.id)}
                                className={`rounded-full px-4 py-2 text-sm ${
                                    selectedPersonaId === persona.id
                                        ? 'bg-coral-600 text-white'
                                        : 'bg-coral-100 text-gray-600'
                                }`}
                            >
                                {persona.name}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleSignUp}
                    className="mt-4 rounded-full bg-coral-600 py-3 text-white hover:bg-coral-700"
                >
                    등록
                </button>
            </div>
        </div>
    );
};

export default SignUpPage;
