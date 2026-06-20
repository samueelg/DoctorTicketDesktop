import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Login from "../pages/auth/Login";
import LigacaoFinalizada from "../pages/LigacaoFinalizada";
import AppLayout from "../pages/layouts/AppLayout";
import Relatorio from "../pages/Relatorio";
import PrivateRoute from "./AppPrivateRoutes";
import CadastroUsuarios from "../pages/CadastroUsuarios";
import GravaAudio from "../pages/GravaAudio";
import { LigacaoProvider } from "../components/context/LigacaoContext";
import { RelatorioProvider } from "../components/context/RelatorioContext";
import { TitleBar } from "../components/layout/TitleBar";

export default function AppRoutes(){
    return(
        <div className="flex flex-col h-screen overflow-hidden bg-white">
        <TitleBar />
        <div className="flex-1 min-h-0">
        <HashRouter>
            <LigacaoProvider>
            <RelatorioProvider>
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
                </Route>
            </Routes>
            </RelatorioProvider>
            </LigacaoProvider>
        </HashRouter>
        </div>
        </div>
    );
}