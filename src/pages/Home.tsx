import IllustrationImg from "../assets/images/Illustration.svg";
import { FormEvent, useContext, useState } from "react";
import logoimg from "../assets/images/Logo.svg";
import googleicon from "../assets/images/google-icon.svg";
import "../styles/auth.scss";
import { Buttom } from "../components/Buttom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";
import { database } from "../services/Firebase";
import { get, ref } from "firebase/database";

export function Home() {
  const navigate = useNavigate();
  const { signInWithGoogle, user } = useContext(AuthContext);
  const [roomcode, setroomcode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    navigate("/rooms/new");
  }

  async function handleJoinRom(event: FormEvent) {
    event.preventDefault();
    if (roomcode.trim() === "") {
      alert("Por favor, digite um código para a sala");
      return;
    }
    const roomref = await ref(database, `rooms/${roomcode}`);
    const verifydatabasse = await get(roomref);
    if (verifydatabasse.exists()) {
      navigate(`/rooms/${roomcode}`);
    } else {
      alert("Código inválido");
    }
    if (verifydatabasse.val() === null) {
      alert("Sala encerrada");
    }
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={IllustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoimg} alt="Logo do projeto" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleicon} alt="logo do google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setroomcode(event.target.value)}
            />
            <Buttom type="submit">Entrar</Buttom>
          </form>
        </div>
      </main>
    </div>
  );
}
