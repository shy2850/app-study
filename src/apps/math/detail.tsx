import React, { useEffect, useRef, useState } from 'react'
import * as apis from '../../db'
import { Question } from '../../interface'
import { Link, useParams } from 'react-router-dom'
import { publicPath } from '../../config'

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

    const width = document.documentElement.clientWidth
    const perfect = list.length > 0 && list.every(t => t.result + '' === t.answer + '')
    return <div style={{
        height: '100vh',
        background: perfect ? '#000' : '#fff',
        color: perfect ? '#fff' : '#000',
    }}>
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
            { perfect
            ? <img style={{ width: '90%', display: 'block', margin: '50px auto' }} alt="烟花" src={`${publicPath}img/fires.gif`}/>
            : <div className="ui-form ui-border-t">
                <form action="">
                    {list.map(item => <div key={item.id} className="ui-form-item ui-border-b">
                        <label style={{ width: 150 }}>
                            {item.content} =
                        </label>
                        <input style={{ width: width - 200, paddingLeft: 2 }} type="text" placeholder="?" onBlur={async (e) => {
                            if (item.id) {
                                await apis.updateQuestion(item.id, { ...item, answer: e.target.value })
                                reload()
                            }
                        }} defaultValue={item.answer}/>
                        {item.answer && <span>{item.answer === item.result.toString() ? '✅' : '❌'}</span>}
                    </div>)}
                </form>
            </div>}
            
        </> : <section className="ui-notice">
            <i></i>
            <p>还没有试题</p>
        </section>}
    </div>
}

export default Detail