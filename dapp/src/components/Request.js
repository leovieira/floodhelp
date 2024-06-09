import Web3 from "web3";
import { generateAvatarURL } from "@cfx-kit/wallet-avatar";

import { closeRequest, donate } from "@/services/Web3Service";

export default function Request({ data }) {
    function handleClose() {
        if (!localStorage.getItem("wallet")) {
            alert("Você precisa primeiro conectar sua carteira MetaMask.");
            return;
        }

        if (!confirm("Deseja realmente fechar este pedido?")) return;

        closeRequest(data.id)
            .then(result => {
                alert("Pedido fechado com sucesso. Em alguns minutos ele deixará de ser exibido.");
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
                alert(error.message);
            });
    }

    function handleHelp() {
        if (!localStorage.getItem("wallet")) {
            alert("Você precisa primeiro conectar sua carteira MetaMask.");
            return;
        }

        const amount = prompt("O quanto deseja doar? (BNB)", 0);
        if (amount <= 0) {
            alert("Valor inválido.");
            return;
        }

        donate(data.id, amount)
            .then(result => {
                alert("Doação realizada com sucesso. Obrigado por ajudar!");
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
                alert(error.message);
            });
    }

    return (
        <>
            <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
                <img src={generateAvatarURL(data.author)} width={32} height={32} className="rounded-circle" alt="Avatar" />
                <div className="d-flex gap-2 w-100 justify-content-between">
                    <div className="w-100">
                        <div className="row">
                            <div className="col-10">
                                <h6 className="mb-0">{data.title} &rsaquo;&rsaquo; Contato: {data.contact}</h6>
                            </div>
                            <div className="col-2">
                                <div className="text-end">
                                    {
                                        localStorage.getItem("wallet") === data.author.toLowerCase()
                                            ? <button className="btn btn-danger btn-sm" onClick={handleClose}>&#10005; Fechar</button>
                                            : <button className="btn btn-success btn-sm" onClick={handleHelp}>&#36; Ajudar</button>
                                    }
                                </div>
                            </div>
                        </div>
                        <p className="opacity-75 pe-5 mb-0">{data.description}</p>
                        <div className="row">
                            <div className="col">
                                <span className="me-1 opacity-75">Meta:</span>
                                <span className="opacity-50">
                                    {
                                        data.balance
                                            ? `BNB ${Web3.utils.fromWei(data.balance, "ether")} obtidos de ${Web3.utils.fromWei(data.goal, "ether")}`
                                            : `BNB ${Web3.utils.fromWei(data.goal, "ether")}`
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
