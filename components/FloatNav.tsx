import { usePopupContext } from '@/context/PopupContext'
import Link from 'next/link'
import classNames from 'classnames'
import React, { useState } from 'react'

function FloatNav() {
  const [visible, setVisible] = usePopupContext('floatNav')
  return (
    <div className={classNames('nav-side', { hide: !visible })}>
      <div className="item">
        <Link href="/my/deposit">
          <a>
            <img src="/img/save.png" />
            <h2>充值</h2>
          </a>
        </Link>
      </div>
      <div className="item">
        <Link href="/my/withdraw">
          <a>
            <img src="/img/get.png" />
            <h2>提领</h2>
          </a>
        </Link>
      </div>
      <div className="item">
        <Link href="/promotion">
          <a>
            <img src="/img/discount.png" />
            <h2>优惠</h2>
          </a>
        </Link>
      </div>
      <div className="item">
        <Link href="/scores">
          <a>
            <img src="/img/score.png" />
            <h2>比分</h2>
          </a>
        </Link>
      </div>
      <div className="item">
        <Link href="/bet-record">
          <a>
            <img src="/img/detail.png" />
            <h2>注單</h2>
          </a>
        </Link>
      </div>
      <div className="item">
        <Link href="/events">
          <a>
            <img src="/img/game.png" />
            <h2>比赛</h2>
          </a>
        </Link>
      </div>
      <div className="item">
        <a onClick={() => setVisible(false)}>
          <i className="iconfont clear" />
        </a>
      </div>
    </div>
  )
}

export default FloatNav
