import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {axiosInstance} from "@api/apiClient.ts";

const LoginPage = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // TODO api 연결 필요
        axiosInstance.post('/user/login',{nickname:id, password:password}).then(res => {console.log('res',res)});
        window.localStorage.setItem('userId', id)
        navigate('/home');
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
            <h1 className="mb-12 text-3xl font-bold text-orange-500">StopList</h1>

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
                <button
                    onClick={handleLogin}
                    className="mt-2 rounded-full bg-orange-400 py-3 text-white hover:bg-orange-500"
                >
                    로그인
                </button>
                <button
                    className="text-sm text-orange-400 hover:underline"
                    // onClick={() => alert('회원가입 페이지 이동')}
                    onClick={() => navigate('/signup')}
                >
                    회원가입
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
