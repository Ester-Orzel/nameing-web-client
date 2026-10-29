import { useEffect, useState } from "react";

// Hook שמדמה הקלדה: מקליד מילה אות אחרי אות, מחכה, מוחק ועובר למילה הבאה.
// מחזיר את הטקסט שמוצג כרגע ואת מספר המילה הנוכחית.
export function useTypewriter(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const word = words[wordIndex];

  useEffect(() => {
    const finishedTyping = !deleting && length === word.length;
    const finishedDeleting = deleting && length === 0;

    // כמה זמן לחכות לפני הצעד הבא
    const delay = finishedTyping ? 1600 : finishedDeleting ? 300 : deleting ? 60 : 140;

    const timer = setTimeout(() => {
      if (finishedTyping) {
        setDeleting(true);
      } else if (finishedDeleting) {
        setDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
      } else {
        setLength(length + (deleting ? -1 : 1));
      }
    }, delay);

    // ניקוי הטיימר כשהקומפוננטה מתעדכנת או יוצאת מהמסך
    return () => clearTimeout(timer);
  }, [length, deleting, word, wordIndex, words.length]);

  return { text: word.slice(0, length), wordIndex };
}
