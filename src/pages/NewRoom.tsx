import IllustrationImg from "../assets/images/Illustration.svg";
import logoimg from "../assets/images/Logo.svg";
import "../styles/auth.scss";
import { Buttom } from "../components/Buttom";
import {  useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {  useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import { database } from "../services/Firebase";
import {  push, ref } from "firebase/database";


export function NewRoom() {
  const [newRoom, setNewRoom] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleCreateRoom(event: React.FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === "") {
      alert("Por favor, digite um nome para a sala");
      return;
    }
    const Ref = await ref(database, `rooms`);
    const WriteData =  await push(Ref, {
      title: newRoom,
      authorId: user?.id,
    });
    navigate(`/rooms/${WriteData.key}`);
    console.log(WriteData);
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
          <h1>{user.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              onChange={(event) => setNewRoom(event.target.value)}
              placeholder="Nome da sala"
              value={newRoom}
            />
            <Buttom type="submit">Criar sala</Buttom>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
