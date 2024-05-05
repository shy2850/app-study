import Dexie from 'dexie';
import { Paper, Question } from './interface'
import { DB_STORE_NAME, DB_VERSION } from './config';

class App extends Dexie {
    papers: Dexie.Table<Paper<any>, number>
    questions: Dexie.Table<Question, number>

    constructor () {
        super(DB_STORE_NAME)
        this.version(DB_VERSION).stores({
            papers: '++id, name, type, config, create_time, finish_time' ,
            questions: '++id, content, result, answer, paper_id, create_time, answer_time'
        });
    }
}

const db = new App()

export const addPaper = function <T> (paper: Paper<T>) {
    return db.papers.add(paper)
}
export const getPaper = function (id: number) {
    return db.papers.get(id)
}
export const getPapers = function ({type}) {
    return db.papers.where('type').equals(type).reverse().toArray()
}
export const deletePaper = function (id: number) {
    return db.papers.delete(id)
}
export const addQuestion = function (question: Question) {
    return db.questions.add(question)
}
export const getQuestions = function (paper_id: number) {
    return db.questions.where('paper_id').equals(paper_id).reverse().toArray()
}
export const deleteQuestion = function (id: number) {
    return db.questions.delete(id)
}
export const deleteQuestions = function (paper_id: number) {
    return db.questions.where('paper_id').equals(paper_id).delete()
}
export const updateQuestion = function (id: number, question: Question) {
    return db.questions.update(id, question)
}
export const getQuestion = function (id: number) {
    return db.questions.get(id)
}