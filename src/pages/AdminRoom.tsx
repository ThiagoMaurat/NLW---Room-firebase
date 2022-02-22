import logoImg from "../assets/images/Logo.svg";
import { Buttom } from "../components/Buttom";
import { RoomCode } from "../components/RoomCode";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/room.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import { ref, remove, update } from "firebase/database";
import { database } from "../services/Firebase";
import { Question } from "../components/Question";
import "../styles/question.scss";
import deleteImg from "../assets/images/delete.svg";
import { UseRoom } from "../hooks/useRoom";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const context = useContext(AuthContext);
  const [newquestion, newsetQuestion] = useState("");
  const { id } = useParams<RoomParams>();
  const roomId = id;
  const { questions, title } = UseRoom(roomId);
  const navigate = useNavigate();

  async function handleDeleteQuestion(questionid: string) {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const Ref = await ref(
        database,
        `rooms/${roomId}/questions/${questionid}`
      );
      remove(Ref);
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    const Ref2 = await ref(database, `rooms/${roomId}/questions/${questionId}`);
    update(Ref2, {
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    const Ref3 = await ref(database, `rooms/${roomId}/questions/${questionId}`);
    update(Ref3, {
      isHighlighted: true,
    });
  }

  async function handleEndRoom() {
    const dataRef = await ref(database, `rooms/${roomId}`);
    update(dataRef, {
      endedAt: new Date(),
    });

    navigate("/");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo do projeto" />
          <div>
            <RoomCode code={id} />
            <Buttom isOutLined onClick={handleEndRoom}>
              Encerrar sala
            </Buttom>
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
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImg} alt="checar pergunta" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answerImg} alt="responder pergunta" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Deletar pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}
