/**
 * 题目
 */
export interface Question {
    id?: number;
    content: string;
    result: string;
    answer?: string;
    paper_id: number;
    create_time: Date;
    answer_time?: Date;
}
/**
 * 试卷
 */
export interface Paper<Config> {
    id?: number;
    name: string;
    type: 'math';
    config: Config;
    create_time: Date;
    finish_time?: Date;
}

export interface FetchEvent extends Event {
    request: Request
    respondWith: {
        (resp: Promise<Response>): void
    }
    waitUntil: {
        (cacheAll: Promise<any>): void
    }
}