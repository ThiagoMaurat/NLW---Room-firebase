import logoImg from "../assets/images/Logo.svg";
import { Buttom } from "../components/Buttom";
import { RoomCode } from "../components/RoomCode";
import { useParams } from "react-router-dom";
import "../styles/room.scss";
import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import { onValue, push, ref } from "firebase/database";
import { database } from "../services/Firebase";
import { Question } from "../components/Question";
import "../styles/question.scss";
import { UseRoom } from "../hooks/useRoom";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const context = useContext(AuthContext);
  const [newquestion, newsetQuestion] = useState("");
  const { id } = useParams<RoomParams>();
  const roomId = id;
  const {questions,title} = UseRoom(roomId);

 

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newquestion.trim() === "") {
      return;
    }
    if (!context.user) {
      throw new Error("User not found");
    }
    const question = {
      content: newquestion,
      author: {
        name: context.user.name,
        avatar: context.user.photo,
        isHighlighted: false,
        isAnswered: false,
      },
    };
    const reference = await ref(database, `rooms/${roomId}/questions`);
    push(reference, question);
    newsetQuestion("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo do projeto" />
          <div>
          <RoomCode code={id} />
          <Buttom isOutLined>Encerrar sala</Buttom>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className="question-list">
            {questions.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
            />
          ))}  
        </div>
      </main>
    </div>
  );
}
