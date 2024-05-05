import React, { useEffect, useState } from 'react'
import * as apis from '../../db'
import { Question } from '../../interface'
import { Link, useParams } from 'react-router-dom'

export const Detail = () => {
    const { id } = useParams()
    if (!id || isNaN(Number(id))) {
        return <div>参数错误</div>
    }
    const paper_id = Number(id)
    
    const [list, setList] = useState<Question[]>([])
    const reload = () => {
        apis.getQuestions(paper_id).then(setList)
    }
    useEffect(() => {
        reload()
    }, [])

    return <>
        {list.length > 0 ? <>
            <div className="ui-progress">
                <span style={{ width: `${list.filter(t => !!t.answer).length * 100 / list.length}%` }}></span>
            </div>
            <div style={{ padding: '10px', overflow: 'hidden' }}>
                <Link to="/math">⬅️ 返回</Link>
                <span style={{ float: 'right' }}>
                    <b>{(list.filter(t => t.result + '' === t.answer + '').length * 100 / list.length).toFixed(0)}</b> 分
                </span>
            </div>
            <div className="ui-form ui-border-t">
                <form action="">
                    {list.map(item => <div key={item.id} className="ui-form-item ui-border-b">
                        <label style={{ width: '20%' }}>
                            {item.content} =
                        </label>
                        <input type="text" placeholder="?" onBlur={async (e) => {
                            if (item.id) {
                                await apis.updateQuestion(item.id, { ...item, answer: e.target.value })
                                reload()
                            }
                        }}/>
                        {item.answer && <span>{item.answer === item.result.toString() ? '✅' : '❌'}</span>}
                    </div>)}
                </form>
            </div>
        </> : <section className="ui-notice">
            <i></i>
            <p>还没有试题</p>
        </section>}
    </>
}

export default Detail