import { onValue, ref, off } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import { database } from "../services/Firebase";

type Questions = {
    id: string;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
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
    likes: Record<string,{
        authorId: string;
    }>
  }
>;


export function UseRoom(roomId: string) {
    const context = useContext(AuthContext)
    const [title, settitle] = useState("");
    const [questions, setquestions] = useState([] as Questions[]);
 

    useEffect(() => {
        const roomRef = ref(database, `rooms/${roomId}`);
        onValue(roomRef, (snapshot) => {
          const databaseRoom = snapshot.val();
          const firebaseQuestions:FirebaseQuestions = databaseRoom?.questions ?? {};
          const parsedQuestions = Object.entries(firebaseQuestions);
          const result = parsedQuestions.map(([key, value]) => {
            return {
              id:key,
              content:value.content,
              author:value.author,
              isHighlighted:value.isHighlighted,
              isAnswered:value.isAnswered,
              likeCount: Object.values(value.likes ?? {}).length,
              likeId: Object.entries(value.likes ?? {}).find(([key,like]) => 
                like.authorId === context.user?.id)?.[0]
            };
          });
          
          settitle(databaseRoom.title);
          setquestions(result);
          console.log(parsedQuestions);
          return () => {
            off(roomRef);
          }
          /* id: key,
              author: {
                name: value.author.name,
                avatar: value.author.avatar,
              },
              content: value.content,
              isAnswered: value.isAnswered,
              isHighlighted: value.isHighlighted, */
          
        });
      }, [roomId, context.user?.id]);

      return {questions,title}

}