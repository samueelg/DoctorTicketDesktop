import { useState } from "react";
import Input from "../../components/atoms/InputField";
import Button from "../../components/atoms/Button";
import logo from "../../assets/images/oralsinlogo.jpg"
import { api } from "../../services/api";
import { useNavigate } from 'react-router-dom';
import { useToast } from "../../components/context/ToastContext";
import { motion } from "motion/react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showSenha, setShowSenha] = useState(false);
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    const [sucesso, setSucesso] = useState(false);
    const navigate = useNavigate();
    const { showToast } = useToast();

    const formInvalido = !email.trim() || !senha.trim();

    async function handleLogin(e) {
        e.preventDefault();
        setErro("");

        if (formInvalido || loading || sucesso) return;

        setLoading(true);

        try{
            const res = await api.post('/login', {email,senha});

            if(res.status == 200){
                localStorage.setItem('token', res.data.token);
                setSucesso(true); // dispara o zoom in; navega no fim da animação
            }

        }catch(err){
            const mensagem = err.response?.data?.message || "Falha no login";
            setErro(mensagem);
            showToast('error', 'Erro', mensagem);
            console.log(err);
            setLoading(false);
        }
    }

    return (
        <motion.div
            className="login-page h-full"
            initial={{ scale: 1, opacity: 1 }}
            animate={sucesso ? { scale: 1.15, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            onAnimationComplete={() => {
                if (sucesso) navigate("/");
            }}
        >
            <div className="flex w-full h-full">
                <div className="w-[45%] bg-slate-50 flex justify-center items-center">
                    <div className="grid grid-rows-3">
                        <div className="row-span-2">
                            <img className="rounded-xl size-56" src={logo} alt="logo" />
                        </div>
                        <div className="flex justify-center mt-2">
                            <h1 className="text-lg font-sans font-semibold">Oral Sin Franchising</h1>
                        </div>
                    </div>
                </div>

                <div className="w-[55%]">
                    <div className="container pt-5">
                    <div className="row p-8">
                        <div className="col">
                            <div className="text-3xl">Realizar Login</div>
                        </div>
                        <div className="col">
                            <div className="container">
                                <form action="POST" onSubmit={handleLogin}>
                                <div className="row pt-6">

                                    {/*Input E-mail */}
                                    <div className="col">
                                        <Input
                                        id='email'
                                        label='E-mail'
                                        type='email'
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Digite seu e-mail"
                                        className='max-w-md mt-4'
                                        inputClassName='text-base'
                                        />
                                    </div>

                                    {/*Input Senha */}
                                    <div className="col relative w-full">
                                        <Input
                                        id='senha'
                                        label='Senha'
                                        type='password'
                                        onChange={(e) => setSenha(e.target.value)}
                                        placeholder="Digite sua senha"
                                        className='max-w-md mt-4'
                                        inputClassName='text-base'
                                        />
                                    </div>

                                    {/*Input E-mail */}
                                    <div className="col">
                                        <Button
                                            type="submit"
                                            text={loading ? "Entrando..." : "Entrar"}
                                            className="mt-6 max-w-md"
                                            buttonClassName="w-full"
                                            disabled={formInvalido}
                                            loading={loading}
                                        />
                                    </div>

                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
