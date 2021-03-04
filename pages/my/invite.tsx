import Dashboard from '@/components/Dashboard'
import EmptyHolder from '@/components/EmptyHolder'
import FloatNav from '@/components/FloatNav'
import Footer from '@/components/Footer'
import MemberMenu from '@/components/MemberMenu'
import PageTabGroup from '@/components/PageTabGroup'
import { useGlobalProvider } from '@/context/GlobalProvider'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { NewsType } from '@/lib/enums'
import { newsTypeOpts } from '@/lib/options'
import { News } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Box } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import classNames from 'classnames'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const InvitePage: React.FC = () => {
  const [qrcode, setQrcode] = useState('')
  const { user } = useGlobalProvider()
  const router = useRouter()
  const { fetchUserInfo } = useService()
  const promoLink = useRef('')
  const toast = useToast()

  if (process.browser) {
    promoLink.current = `${location.origin}/p/${user?.promo_code}`
  }

  const createQrcode = async () => {
    const dataString = await QRCode.toDataURL(promoLink.current)
    setQrcode(dataString)
  }
  useEffect(() => {
    fetchUserInfo()
  }, [])
  useEffect(() => {
    if (user) createQrcode()
  }, [user])
  return (
    <Dashboard>
      <MemberMenu>
        <Box className="menu-content-section">
          <div className="mian-group d-flex">
            <div className="left-group">
              <div className="title-col mb-4">会员推广</div>
              <div className="qr-code-box">
                <img src={qrcode} />
              </div>
              <label className="form-label2">推广连结</label>
              <div className="form-group">
                <div className="form-copy">{promoLink.current}</div>
                <CopyToClipboard
                  text={promoLink.current}
                  onCopy={() =>
                    toast({ status: 'success', title: '已複製至剪貼簿' })
                  }
                >
                  <i className="copy iconfont btn_copy" />
                </CopyToClipboard>
              </div>
              <label className="form-label2">推广代码</label>
              <div className="form-group">
                <div className="form-copy">{user?.promo_code}</div>
                <CopyToClipboard
                  text={user?.promo_code}
                  onCopy={() =>
                    toast({ status: 'success', title: '已複製至剪貼簿' })
                  }
                >
                  <i className="copy iconfont btn_copy" />
                </CopyToClipboard>
              </div>
            </div>
            <div className="right-group">
              <label className="form-label2">推广收益</label>
              <div className="form-group">
                <select className="form-select">
                  <option>前月</option>
                  <option>本月</option>
                </select>
              </div>
              {/* <div class="status-tab" style="width: 144px;">
                              <div class="status-switch active">前月</div>
                              <div class="status-switch">
                                  本月</div>
                          </div> */}
              <div className="invite-item">
                <div>
                  <p>您邀请注册</p>
                  <span className="text-blue">20</span>
                </div>
                <div>
                  <p>下注成功</p>
                  <span className="text-blue">10</span>
                </div>
              </div>
              <label className="form-label2">团队列表</label>
              <div className="table-wrap">
                <table className="team ">
                  <tbody>
                    <tr>
                      <th>会员帐号</th>
                      <th>名称</th>
                    </tr>
                    <tr>
                      <td>bet888</td>
                      <td>王曉明</td>
                    </tr>
                    <tr>
                      <td>bet888</td>
                      <td>王曉明</td>
                    </tr>
                    <tr>
                      <td>bet888</td>
                      <td>王曉明</td>
                    </tr>
                    <tr>
                      <td>bet888</td>
                      <td>王曉明</td>
                    </tr>
                    <tr>
                      <td>bet888</td>
                      <td>王曉明</td>
                    </tr>
                    <tr>
                      <td>bet888</td>
                      <td>王曉明</td>
                    </tr>
                    <tr>
                      <td>bet888</td>
                      <td>王曉明</td>
                    </tr>
                    <tr>
                      <td>bet888</td>
                      <td>王曉明</td>
                    </tr>
                    <tr>
                      <td>bet888</td>
                      <td>王曉明</td>
                    </tr>
                    <tr>
                      <td>bet888</td>
                      <td>王曉明</td>
                    </tr>
                    <tr>
                      <td>bet888</td>
                      <td>王曉明</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Box>
      </MemberMenu>
      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default InvitePage
