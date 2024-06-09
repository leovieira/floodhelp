"use client";

import { useState, useEffect } from "react";

import { getOpenRequests } from "@/services/Web3Service";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Request from "@/components/Request";

export default function Home() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        loadRequests(0);
    }, []);

    async function loadRequests(lastId) {
        try {
            const result = await getOpenRequests(lastId);

            if (lastId === 0)
                setRequests(result);
            else
                setRequests([...requests, ...result]);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="row ps-5">
                    <p className="lead m-4">Ajude as vítimas de enchentes e demais desastres naturais do Brasil</p>
                </div>
                <div className="p-4 mx-5">
                    <div className="list-group">
                        {
                            requests && requests.length
                                ? requests.map((request) => <Request key={request.id} data={request} />)
                                : <span>Conecte sua carteira MetaMask no botão "Entrar" para ajudar ou pedir ajuda.</span>
                        }
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
