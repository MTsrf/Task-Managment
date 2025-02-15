import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  endAt,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  startAt,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { getAuth } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { message } from "antd";

const tasksCollection = collection(db, "tasks");

export const getTask = async ({
  status,
  category,
  search,
  date,
}: {
  status?: string;
  category?: string;
  search?: string;
  date?: string;
}) => {
  console.log({ search });
  let q = query(tasksCollection);
  if (status) q = query(q, where("status", "==", status));
  if (category) q = query(q, where("category", "==", category));
  if (search)
    q = query(q, orderBy("title"), startAt(search), endAt(search + "\uf8ff"));
  if (date) q = query(q, where("date", "==", date));

  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addTask = async (task: any) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  await addDoc(tasksCollection, {
    ...task,
    creatorUID: user.uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateTask = async (id: string, updatedTask: any) => {
  try {
    const taskDoc = doc(tasksCollection, id);
    await updateDoc(taskDoc, {
      ...updatedTask,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      message.error(error.message);
    }
  }
};

export const deleteTask = async (id: string) => {
  try {
    const taskDoc = doc(tasksCollection, id);
    await deleteDoc(taskDoc);
  } catch (error) {
    if (error instanceof FirebaseError) {
      message.error(error.message);
    }
  }
};
