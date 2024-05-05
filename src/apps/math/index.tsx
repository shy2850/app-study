import React, { useEffect, useState } from 'react'
import * as apis from '../../db'
import { MathPaperConfig } from './interface'
import { Paper } from '../../interface'
import { Link } from 'react-router-dom'

export { Detail as MathDetail } from './detail'

const createQuestion = function create (range: number, items: number) {
    const item = Math.floor(Math.random() * range)
    let content = `${item}`
    let result = item
    for (let i = 0; i < items - 1; i++) {
        const op = Math.random() > 0.5 ? '+' : '-'
        const item1 = Math.floor(Math.random() * range)
        content += ` ${op} ${item1}`
        if (op === '+') {
            result += item1
        } else {
            result -= item1
        }
    }
    if (result < 0 || result > range) {
        return createQuestion(range, items)
    }
    return [content, result]
}

interface QueryCreaterProps {
    onSubmit: () => void
    onCancel: () => void
}
const QueryCreater = ({ onSubmit, onCancel }: QueryCreaterProps) => {
    const [range, setRange] = useState<MathPaperConfig['range']>()
    const [items, setItems] = useState<MathPaperConfig['items']>()
    const [count, setCount] = useState<MathPaperConfig['count']>()
    const [error, setError] = useState<string>()

    const addPaper = async () => {
        if (!range || !count) {
            setError('请填写完整信息')
        } else {
            setError('')
            const create_time = new Date()
            const paper_id = await apis.addPaper({
                type: 'math', config: { range, count, items },
                name: `${range}以内${count}题`,
                create_time,
            })
            for (let i = 0; i < count; i++) {
                const [content, result] = createQuestion(range, items)
                await apis.addQuestion({
                    paper_id,
                    create_time,
                    content,
                    result,
                })
            }
            onSubmit()
        }
    }

    return <section className="ui-panel ui-panel-center ui-border-tb">
        <h2 className="ui-arrowlink">
            <span>新建试题</span>
            <span className="ui-panel-title-tips" onClick={onCancel}>返回</span>
        </h2>
        {error && <div className="ui-tooltips ui-tooltips-warn">
            <div className="ui-tooltips-cnt ui-tooltips-cnt-link ui-border-b">
                <i></i>error
            </div>
        </div>}
        <div className="ui-form ui-border-t">
            <form action="" onSubmit={e => e.preventDefault()}>
                <div className="ui-form-item ui-border-b">
                    <label>
                        数字范围
                    </label>
                    <div className="ui-select">
                        <select onChange={(e) => setRange(e.target.value ? Number(e.target.value) as any : null)}>
                            <option value="">选择题目范围</option>
                            <option value={10}>10以内</option>
                            <option value={20}>20以内</option>
                            <option value={50}>50以内</option>
                            <option value={100}>100以内</option>
                        </select>
                    </div>
                </div>
                <div className="ui-form-item ui-border-b">
                    <label>
                        运算项数
                    </label>
                    <div className="ui-select">
                        <select onChange={(e) => setItems(e.target.value ? Number(e.target.value) as any : null)}>
                            <option value="">选择运算项数</option>
                            <option value={2}>2个</option>
                            <option value={3}>3个</option>
                        </select>
                    </div>
                </div>
                <div className="ui-form-item ui-form-item-link ui-border-b">
                    <label>
                        题目数量
                    </label>
                    <div className="ui-select">
                        <select onChange={(e) => setCount(e.target.value ? Number(e.target.value) as any : null)}>
                            <option value="">选择题目数量</option>
                            <option value={10}>10题</option>
                            <option value={20}>20题</option>
                            <option value={50}>50题</option>
                            <option value={100}>100题</option>
                        </select>
                    </div>
                </div>
                <div className="ui-btn-wrap">
                    <button className="ui-btn-lg ui-btn-primary" type="submit" onClick={addPaper}>
                        确定
                    </button>
                    <button className="ui-btn-lg" type="reset" onClick={onCancel}>
                        取消
                    </button>
                </div>
            </form>
        </div>
    </section>
}

export const MathIndex = () => {
    const [list, setList] = useState<Paper<MathPaperConfig>[]>([])
    const [status, setStatus] = useState<'list'|'add'>('list')
    const [focus, setFocus] = useState<Paper<MathPaperConfig>>()

    const fetchList = async () => {
        const list = await apis.getPapers({ type: 'math' })
        setList(list)
        setFocus(null)
    }
    const deletePaper = async () => {
        await apis.deletePaper(focus?.id)
        await apis.deleteQuestions(focus?.id)
        fetchList()
    }

    useEffect(() => {
        fetchList()
    }, [])

    

    switch (status) {
        case 'list':
            return <>
                <div style={{ padding: '10px', overflow: 'hidden' }}>
                    <button style={{ float: 'right' }} className="ui-btn" onClick={() => setStatus('add')}>新建</button>
                </div>
                {list.length > 0 ? <ul className="ui-list ui-list-single ui-list-link ui-border-tb">
                    {list.map((item) => <li className="ui-border-t" key={item.id} onContextMenu={(e) => {
                        e.preventDefault()
                        setFocus(item)
                    }} >
                        <Link to={`/math/detail/${item.id}`}>
                            <div className="ui-list-info" >
                                <h4 className="ui-nowrap">{item.name}</h4>
                                <div className="ui-txt-info">{item.create_time.toLocaleString()}</div>
                            </div>
                        </Link>
                    </li>)}
                </ul> : <section className="ui-notice">
                    <i></i>
                    <p>还没有试题</p>
                </section>}
                <div className={`ui-actionsheet ${focus ? 'show' : ''}`}>
                    <div className="ui-actionsheet-cnt am-actionsheet-down">
                        <h4>删除试题，同时把所有相关的答题记录删除</h4>
                        <button className="ui-actionsheet-del" onClick={() => {
                            deletePaper()
                        }}>删除</button>
                        <div className="ui-actionsheet-split-line"></div>
                        <button onClick={() => setFocus(null)}>取消</button>
                    </div>
                </div>
            </>
        case 'add':
            return <QueryCreater onCancel={() => setStatus('list')} onSubmit={() => {
                setStatus('list')
                fetchList()
            }}/>
    }
}