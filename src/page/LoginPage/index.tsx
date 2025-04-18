import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {axiosInstance} from "@api/apiClient.ts";

const LoginPage = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        axiosInstance.post('api/user/login',{nickname:id, password:password}).then(res => {
            if(res.status === 200) {
                window.localStorage.setItem('userId', res.data.userId);
                navigate('/home');
            } else {
                alert(`${res.data.data}`);
            }
        });

    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
            <h1 className="mb-12 text-3xl font-bold text-coral-500">StopList</h1>

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
                <button
                    onClick={handleLogin}
                    className="mt-2 rounded-full bg-coral-600 py-3 text-white hover:bg-coral-700"
                >
                    로그인
                </button>
                <button
                    className="text-sm text-coral-400 hover:underline"
                    onClick={() => navigate('/signup')}
                >
                    회원가입
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
