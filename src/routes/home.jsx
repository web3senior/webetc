import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import Loading from './components/LoadingSpinner'
import { CheckIcon, ChromeIcon, BraveIcon } from './components/icons'
import toast, { Toaster } from 'react-hot-toast'
import styles from './Home.module.scss'
import Logo from '../../public/upnote.svg'
import { useAuth } from './../contexts/AuthContext'

function Home({ title }) {
  Title(title)
  const [isLoading, setIsLoading] = useState(false)
  const auth = useAuth()
  const navigate = useNavigate()

  const handleConnect = () => {
    auth.connectWallet().then((addr) => {
      if (typeof addr !== 'undefined') {
        toast(`UP Address fetched`, { icon: '🆙', duration: 6000 })
        auth.setWallet(addr)
        auth.fetchProfile(addr).then((profile) => {
          toast(`UP Metadata fetched`, { icon: '🆙', duration: 6000 })
          auth.setProfile(profile)
        })
      }
    })
  }

  return (
    <>
      {isLoading && <Loading />}

      <section className={styles.section}>
        <div className={`__container text-center`} data-width="small">
          {auth.isUPinstalled() === false && <>Please install Universal Profile to use this Dapp!</>}

          <h6 className="mb-10">
            <b>All your eternal notes on blockchain</b>
          </h6>
          <p>The most secure way to keep notes</p>

          {auth.isWalletConnected && auth.wallet ? (
            <>
              <button className="btn" onClick={() => navigate(`/usr/${auth.wallet}`)}>
                <span className="animate__animated animate__heartBeat animate__infinite" style={{ display: 'inline-block' }}>
                  🦄
                </span>
               SPORTS
              </button>
            </>
          ) : (
            <>
              <button className="btn" onClick={() => handleConnect()}>
                <span className="animate__animated animate__swing animate__infinite" style={{ display: 'inline-block' }}>
                  🆙
                </span>
                Connect Wallet
              </button>
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default Home
