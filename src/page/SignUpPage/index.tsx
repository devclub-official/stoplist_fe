import { useState } from 'react';
import {useNavigate} from "react-router-dom";

const personaList = ['정인물', '나성광', '김철수', '박도연', '이하늘']; // 5글자 제한

const SignUpPage = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSignUp = () => {
        if (!id || !password || !selectedPersona) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        navigate('/home')

        console.log('회원가입 정보', { id, password, persona: selectedPersona });
        // TODO: API 호출 등 처리
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
            <h1 className="mb-10 text-3xl font-bold text-orange-500">SignUp</h1>

            <div className="flex w-full max-w-xs flex-col gap-4">
                <input
                    type="text"
                    placeholder="아이디"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="rounded-lg bg-orange-50 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-lg bg-orange-50 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
                />

                <div>
                    <p className="mb-2 text-sm font-semibold text-gray-600">페르소나</p>
                    <div className="flex flex-wrap gap-2">
                        {personaList.map((name) => (
                            <button
                                key={name}
                                type="button"
                                onClick={() => setSelectedPersona(name)}
                                className={`rounded-full px-4 py-2 text-sm ${
                                    selectedPersona === name
                                        ? 'bg-orange-400 text-white'
                                        : 'bg-orange-50 text-gray-600'
                                }`}
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleSignUp}
                    className="mt-4 rounded-full bg-orange-400 py-3 text-white hover:bg-orange-500"
                >
                    등록
                </button>
            </div>
        </div>
    );
};

export default SignUpPage;
