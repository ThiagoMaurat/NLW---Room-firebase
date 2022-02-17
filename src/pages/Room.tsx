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

type RoomParams = {
  id: string;
};

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  }
>;

type Data1 = {
  avatar: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  name: string;
};

type Data2 = {
  content: string;
};

type Questions = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

type Date2formatado = {
  content: string;
};

export function Room() {
  const context = useContext(AuthContext);
  const [newquestion, newsetQuestion] = useState("");
  const { id } = useParams<RoomParams>();
  const roomId = id;
  const [questions, setquestions] = useState([] as Questions[]);
  const [title, settitle] = useState("");

  useEffect(() => {
    const roomRef = ref(database, `rooms/${roomId}`);
    const getdata = onValue(roomRef, (snapshot) => {
      const databaseRoom = snapshot.val();
      const firebaseQuestions:FirebaseQuestions = databaseRoom?.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions);
      const result = parsedQuestions.map(([key, value]) => {
        return {
          id:key,
          content:value.content,
          author:value.author,
          isHighlighted:value.isHighlighted,
          isAnswered:value.isAnswered
        };
      });
      
      settitle(databaseRoom.title);
      setquestions(result);
      console.log(parsedQuestions);

      /* id: key,
          author: {
            name: value.author.name,
            avatar: value.author.avatar,
          },
          content: value.content,
          isAnswered: value.isAnswered,
          isHighlighted: value.isHighlighted, */
      
    });
  }, [roomId]);

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
          <RoomCode code={id} />
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={(e) => newsetQuestion(e.target.value)}
            value={newquestion}
          ></textarea>
          <div className="form-footer">
            {context.user ? (
              <div className="user-info">
                <img src={context.user.photo} alt={context.user.name} />
                <span>{context.user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>
              </span>
            )}
            <Buttom disabled={!context.user} type="submit">
              Enviar pergunta
            </Buttom>
          </div>
        </form>
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
