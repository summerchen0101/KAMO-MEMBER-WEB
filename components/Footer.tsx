import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="footer">
      <div className="copyright">Copyright © 2021 AG Reserved</div>
      <ul className="article-menu">
        <li>
          <Link href="/about">关于AG</Link>
        </li>
        <li>
          <Link href="/policy">条款与规则</Link>
        </li>
        <li>
          <a href="./hp-main.html">幫助中心</a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
