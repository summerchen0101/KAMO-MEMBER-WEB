import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import classNames from 'classnames'
import { useRouter } from 'next/dist/client/router'
import React, { ReactNode } from 'react'

function MemberMenu({ children }: { children: ReactNode }) {
  const router = useRouter()
  return (
    <main className="main">
      <section className="my">
        <div className="my-box laout ">
          <div className="contents">
            <div className="menu-section">
              <ul className="menu-inner list-group">
                <li
                  className={classNames('menu-list-item', {
                    active: router.pathname.includes('/my/profile'),
                  })}
                  onClick={() => router.push('/my/profile')}
                >
                  <i className="iconfont person" />
                  个人资料
                </li>
                <li
                  className={classNames('menu-list-item', {
                    active: router.pathname.includes('/my/deposit'),
                  })}
                  onClick={() => router.push('/my/deposit')}
                >
                  <i className="iconfont recharge" />
                  立即充值
                </li>
                <li
                  className={classNames('menu-list-item', {
                    active: router.pathname.includes('/my/withdraw'),
                  })}
                  onClick={() => router.push('/my/withdraw')}
                >
                  <i className="iconfont withdrawal" />
                  立即提领
                </li>
                <li
                  className={classNames('menu-list-item', {
                    active: router.pathname.includes('/my/trade'),
                  })}
                  onClick={() => router.push('/my/trade/withdraw-record')}
                >
                  <i className="iconfont icon-detail" />
                  充提纪录
                </li>
                <li
                  className={classNames('menu-list-item', {
                    active: router.pathname.includes('/my/news'),
                  })}
                  onClick={() => router.push('/my/news')}
                >
                  <i className="iconfont notice" />
                  公告
                </li>
                <li
                  className={classNames('menu-list-item', {
                    active: router.pathname.includes('/my/message'),
                  })}
                  onClick={() => router.push('/my/message')}
                >
                  <i className="iconfont mail" />
                  站内信
                </li>
                <li
                  className={classNames('menu-list-item', {
                    active: router.pathname.includes('/my/invite'),
                  })}
                  onClick={() => router.push('/my/invite')}
                >
                  <i className="iconfont friend" />
                  会员推广
                </li>
              </ul>
            </div>
            {children}
          </div>
        </div>
      </section>
    </main>
  )
}

export default MemberMenu
