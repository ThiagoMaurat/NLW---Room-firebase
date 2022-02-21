import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
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


export function UseRoom(roomId: string) {
    
    const [title, settitle] = useState("");
    const [questions, setquestions] = useState([] as Questions[]);
 

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

      return {questions,title}

}