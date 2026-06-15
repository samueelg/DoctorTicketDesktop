import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Login from "../pages/auth/Login";
import LigacaoFinalizada from "../pages/LigacaoFinalizada";
import AppLayout from "../pages/layouts/AppLayout";
import Relatorio from "../pages/Relatorio";
import PrivateRoute from "./AppPrivateRoutes";
import CadastroUsuarios from "../pages/CadastroUsuarios";
import Configuracoes from "../pages/Configuracoes";
import GravaAudio from "../pages/GravaAudio";
import { LigacaoProvider } from "../components/context/LigacaoContext";

export default function AppRoutes(){
    return(
        <HashRouter>
            <LigacaoProvider>
            <Routes>
                <Route path="/login" element={
                    <Login/>
                }/> 
                <Route element={<AppLayout />}>
                    <Route path="/" element={
                        <PrivateRoute>
                            <Inicio/>
                        </PrivateRoute>
                    }/>
                    <Route path="/gravar" element={
                        <PrivateRoute>
                            <GravaAudio/>
                        </PrivateRoute>
                    }/>
                    <Route path="/ligacaoFinalizada" element={
                        <PrivateRoute>
                            <LigacaoFinalizada/>
                        </PrivateRoute>
                    }/>
                    <Route path="/relatorios" element={
                        <PrivateRoute>
                            <Relatorio/>
                        </PrivateRoute>
                    }/>
                    <Route path="/cadastro" element={
                        <PrivateRoute>
                            <CadastroUsuarios/>
                        </PrivateRoute>
                    }/>
                    <Route path="/configuracoes" element={
                        <PrivateRoute>
                            <Configuracoes/>
                        </PrivateRoute>
                    }/>
                </Route>
            </Routes>
            </LigacaoProvider>
        </HashRouter>
    );
}